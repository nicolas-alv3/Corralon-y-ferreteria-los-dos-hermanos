package com.loshermanos.persistence.repository

import com.loshermanos.model.Product
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface ProductRepository : JpaRepository<Product, Long> {

    fun findByBarcode(barcode:Long): Optional<Product>
}
