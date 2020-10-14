package com.loshermanos.controller

import com.loshermanos.model.Product
import com.loshermanos.service.ProductService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Scope
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Component
import org.springframework.web.bind.annotation.*

@CrossOrigin
@RestController
@Scope(value = "session")
@Component(value = "productController")
class ProductController (val productService: ProductService){

    @PostMapping("/product")
    fun postProduct(@RequestBody body: Product): Product {
        return productService.save(body)
    }
}