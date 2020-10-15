package com.loshermanos.persistence.repository

import com.loshermanos.model.Product
import com.loshermanos.model.ProductCategory
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface ProductRepository : JpaRepository<Product, Long> {

    fun findByBarcode(barcode:Long): Optional<Product>
    fun findAllByCategory(category: ProductCategory): List<Product>
}
