package com.loshermanos.controller

import com.loshermanos.model.Product
import com.loshermanos.service.ProductService
import com.loshermanos.service.SearchService
import org.springframework.context.annotation.Scope
import org.springframework.data.domain.Page
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Component
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController

@CrossOrigin
@RestController
@Scope(value = "session")
@Component(value = "searchController")
class SearchController(val productService: ProductService,val searchService: SearchService) {

    @GetMapping("/search/{data}/{page}")
    fun searchProduct(@PathVariable data:String, @PathVariable page:Integer): ResponseEntity<Page<Product>> {
        return ResponseEntity(searchService.search(data,page),HttpStatus.OK)
    }
}