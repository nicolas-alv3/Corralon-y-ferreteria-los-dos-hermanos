package com.loshermanos.persistence.repository

import com.loshermanos.model.Product
import org.springframework.data.jpa.repository.JpaRepository

interface ProductRepository : JpaRepository<Product, Long> {

}
