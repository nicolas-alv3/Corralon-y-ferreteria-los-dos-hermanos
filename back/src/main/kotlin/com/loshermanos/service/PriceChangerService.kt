package com.loshermanos.service

import com.loshermanos.controller.SaleItemDTO
import com.loshermanos.model.PriceChanger
import com.loshermanos.model.Product
import com.loshermanos.model.ProductCategory
import com.loshermanos.persistence.ProductDAO
import com.loshermanos.service.exception.ProductNotFound
import org.springframework.context.annotation.Scope
import org.springframework.stereotype.Component
import java.util.*

@Scope(value = "session")
@Component(value = "priceChangerService")
class PriceChangerService(val productDAO: ProductDAO) {
    fun increaseAll(ids: List<Long>, porcentage: Double): List<Product> {
        val products:List<Product> = fetchProducts(ids)
        PriceChanger().increaseByPorcentage(porcentage,products)
        return productDAO.saveAll(products)
    }

    private fun fetchProducts(ids: List<Long>): List<Product> {
        return ids.map { id -> getOrThrow(id) }
    }

    private fun getOrThrow(id: Long): Product {
        val maybeProduct : Optional<Product> = productDAO.findById(id)
        if(maybeProduct.isPresent)
            return maybeProduct.get()
        else
            throw ProductNotFound("No se ha encontrado alguno de los productos a aumentar")
    }

    fun decreaseAll(ids: List<Long>, porcentage: Double): List<Product> {
        val products:List<Product> = fetchProducts(ids)
        PriceChanger().decreaseByPorcentage(porcentage,products)
        return productDAO.saveAll(products)
    }

    fun increaseByCategory(ids: List<Long>, category: ProductCategory, porcentage: Double): List<Product> {
        val products:List<Product>
        if(ids.isEmpty())
            products = productDAO.getAllOfCategory(category)
        else
            products = fetchProducts(ids)
        PriceChanger().increaseByPorcentageAndCategory(porcentage,category,products)
        return productDAO.saveAll(products)
    }

    fun decreaseByCategory(ids: List<Long>, category: ProductCategory, porcentage: Double): List<Product> {
        val products:List<Product>
        if(ids.isEmpty())
            products = productDAO.getAllOfCategory(category)
        else
            products = fetchProducts(ids)
        PriceChanger().decreaseByPorcentageAndCategory(porcentage,category,products)
        return productDAO.saveAll(products)
    }

}