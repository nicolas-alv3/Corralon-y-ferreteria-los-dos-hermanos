package com.loshermanos.service

import com.loshermanos.controller.dto.SaleItemDTO
import com.loshermanos.model.Product
import com.loshermanos.model.ProductCategory
import com.loshermanos.persistence.ProductDAO
import com.loshermanos.service.exception.ProductAlreadyExistException
import com.loshermanos.service.exception.ProductNotFound
import com.loshermanos.service.exception.StockMustBeIntegerException
import org.springframework.context.annotation.Scope
import org.springframework.data.domain.Page
import org.springframework.stereotype.Component
import java.util.*


@Scope(value = "session")
@Component(value = "productService")
class ProductService(val productDAO: ProductDAO) {

    fun save(product: Product): Product {
        if(product.barcode > 0 && productDAO.findByBarCode(product.barcode).isPresent)
            throw ProductAlreadyExistException("Ya existe un producto con ese codigo de barras")
        if(productDAO.findByDescription(product.description).isPresent)
            throw ProductAlreadyExistException("Ya existe un producto con ese nombre")
        return productDAO.save(product)
    }

    fun findById(id: Long): Product {
        val maybeProduct:Optional<Product> = productDAO.findById(id)
        if(maybeProduct.isPresent)
            return maybeProduct.get()
        else
            throw ProductNotFound("No existe producto con ese id")
    }

    fun findByBarCode(barcode: Long): Product {
        val maybeProduct:Optional<Product> = productDAO.findByBarCode(barcode)
        if(maybeProduct.isPresent)
            return maybeProduct.get()
        else
            throw ProductNotFound("No existe producto con ese codigo de barras")
    }

    fun update(newProduct: Product): Product{
        if (productDAO.findById(newProduct.getId()!!).isPresent)
            return productDAO.update(newProduct)
        if(
                productDAO.findByDescription(newProduct.description).isPresent &&
                productDAO.findByDescription(newProduct.description).get().getId() != newProduct.getId()
        )
            throw ProductAlreadyExistException("Ya existe un producto con ese  nombre")
        else
            throw ProductNotFound("No existe producto con ese codigo de barras")
    }

    fun getAll(): List<Product> {
        return productDAO.getAll()
    }

    fun sell(items: List<SaleItemDTO>) :List<Product>{
        val products : List<Pair<Product, Double>> = fetchProducts(items)
        val newProducts :List<Product> = products.map { pair -> substractAndReturn(pair) }
        return productDAO.saveAll(newProducts)
    }

    private fun substractAndReturn(pair: Pair<Product, Double>): Product {
        var current :Product = pair.first
        current.substractStock(pair.second)
        return current
    }

    private fun fetchProducts(items: List<SaleItemDTO>): List<Pair<Product, Double>> {
        return items.map { i -> getOrThrow(i) }
    }

    private fun getOrThrow(i: SaleItemDTO): Pair<Product, Double> {
        val maybeProduct : Optional<Product> = productDAO.findById(i.id)
        if(maybeProduct.isPresent) {
            return Pair(maybeProduct.get(), i.amount)
        }
        else
            throw ProductNotFound("No se ha encontrado alguno de los productos vendidos")
    }

    fun alterStock(id: Long, amount: Double, add: Boolean): Product {
        val maybeProduct : Optional<Product> = productDAO.findById(id)
        if(maybeProduct.isPresent)
            return alterStockOfProduct(maybeProduct.get(),amount,add)
        else
            throw ProductNotFound("No se ha encontrado el producto a alterar")
    }

    private fun alterStockOfProduct(product: Product, amount: Double, add: Boolean): Product {
        if(add) {
            product.addStock(amount)
        } else
            product.substractStock(amount)
        return productDAO.save(product)
    }

    fun getByPage(page: Integer): Page<Product> {
        return productDAO.getByPage(page)
    }

    fun delete(id: Long): Product {
        val p: Product = findById(id)
        productDAO.delete(id)
        return p
    }

    fun getByCategory(category: ProductCategory): List<Product> {
        return productDAO.getAllOfCategory(category)
    }
}
