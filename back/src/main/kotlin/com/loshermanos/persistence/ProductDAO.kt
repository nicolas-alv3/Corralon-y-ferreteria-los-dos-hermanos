package com.loshermanos.persistence

import com.loshermanos.model.Product
import com.loshermanos.model.ProductCategory
import com.loshermanos.persistence.repository.ProductRepository
import org.springframework.stereotype.Component
import java.util.*

@Component
class ProductDAO(val productRepository: ProductRepository) {
    fun save(product: Product): Product {
        return productRepository.save(product)
    }

    fun findById(id: Long): Optional<Product> {
        return productRepository.findById(id)
    }

    fun findByBarCode(barcode: Long): Optional<Product> {
        return productRepository.findByBarcode(barcode)
    }

    fun update(newProduct: Product): Product {
        return productRepository.save(newProduct)
    }

    fun getAll(): List<Product> {
        return productRepository.findAll()
    }

    fun saveAll(products: List<Product>): List<Product> {
        return productRepository.saveAll(products)
    }

    fun getAllOfCategory(category: ProductCategory): List<Product> {
        return productRepository.findAllByCategory(category)
    }

}
