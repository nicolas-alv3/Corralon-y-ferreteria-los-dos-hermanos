package com.loshermanos.service

import com.loshermanos.model.Product
import com.loshermanos.persistence.ProductDAO
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Scope
import org.springframework.stereotype.Component
import javax.transaction.Transactional


@Scope(value = "session")
@Component(value = "productService")
class ProductService(val productDAO: ProductDAO) {
    @Transactional
    fun save(product: Product): Product {
        return productDAO.save(product)
    }
}
