package com.loshermanos.persistence

import com.loshermanos.model.Product
import com.loshermanos.model.ProductCategory
import com.loshermanos.persistence.repository.ProductRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Component
import java.util.*
import javax.transaction.Transactional


@Component
class ProductDAO(val productRepository: ProductRepository) {
    @Transactional
    fun save(product: Product): Product {
        return productRepository.save(product)
    }

    fun findById(id: Long): Optional<Product> {
        return productRepository.findById(id)
    }

    fun findByBarCode(barcode: Long): Optional<Product> {
        return productRepository.findByBarcode(barcode)
    }
    @Transactional
    fun update(newProduct: Product): Product {
        return productRepository.save(newProduct)
    }

    fun getAll(): List<Product> {
        return productRepository.findAll()
    }

    @Transactional
    fun saveAll(products: List<Product>): List<Product> {
        return productRepository.saveAll(products)
    }

    fun getAllOfCategory(category: ProductCategory): List<Product> {
        return productRepository.findAllByCategory(category)
    }

    fun search(data: String, page: Integer): Page<Product> {
        val pagination: Pageable = PageRequest.of(page.toInt(), 10)
        return productRepository.findAllByIdOrBarcodeOrDescription(data,pagination)
    }

    fun getByPage(page: Integer): Page<Product> {
        val pagination: Pageable = PageRequest.of(page.toInt()-1, 10)
        return productRepository.findAll(pagination)
    }

    fun delete(id: Long) {
        return productRepository.deleteById(id)
    }

}
