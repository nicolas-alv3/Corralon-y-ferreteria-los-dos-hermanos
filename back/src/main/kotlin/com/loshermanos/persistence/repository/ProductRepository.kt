package com.loshermanos.persistence.repository

import com.loshermanos.model.Product
import com.loshermanos.model.ProductCategory
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import java.util.*

interface ProductRepository : JpaRepository<Product, Long> {

    fun findByBarcode(barcode:Long): Optional<Product>
    fun findAllByCategory(category: ProductCategory): List<Product>
    @Query("select p from Product p where p.description like %:data% or p.id = :data or p.barcode = :data ")
    fun findAllByIdOrBarcodeOrDescription(data: String, pagination: Pageable): Page<Product>
}
