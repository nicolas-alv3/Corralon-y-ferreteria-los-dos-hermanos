package com.loshermanos.persistence

import com.loshermanos.model.Product
import com.loshermanos.persistence.repository.ProductRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
class ProductDAO(val productRepository: ProductRepository) {
    fun save(product: Product): Product {
        return productRepository.save(product)
    }

}
