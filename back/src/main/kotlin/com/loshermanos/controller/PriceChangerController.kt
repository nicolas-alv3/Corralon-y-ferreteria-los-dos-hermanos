package com.loshermanos.controller

import com.loshermanos.model.Product
import com.loshermanos.service.PriceChangerService
import org.springframework.context.annotation.Scope
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Component
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@CrossOrigin
@RestController
@Scope(value = "session")
@Component(value = "priceChangerController")
class PriceChangerController(val priceChangerService: PriceChangerService) {

    @PostMapping("/priceChanger/increase/all")
    fun increaseAll(@RequestBody pcDTO: PriceChangerDTO): ResponseEntity<List<Product>> {
        return ResponseEntity(priceChangerService.increaseAll(pcDTO.ids,pcDTO.porcentage), HttpStatus.OK)
    }

    @PostMapping("/priceChanger/decrease/all")
    fun decreaseAll(@RequestBody pcDTO: PriceChangerDTO): ResponseEntity<List<Product>> {
        return ResponseEntity(priceChangerService.decreaseAll(pcDTO.ids,pcDTO.porcentage), HttpStatus.OK)
    }

    @PostMapping("/priceChanger/increase/category")
    fun increaseByCategory(@RequestBody pcDTO: PriceChangerDTO): ResponseEntity<List<Product>> {
        // if ids of pcDTO is empty, returns all products with category 'pcDTO.category' increased
        return ResponseEntity(priceChangerService.increaseByCategory(pcDTO.ids,pcDTO.category,pcDTO.porcentage), HttpStatus.OK)
    }

    @PostMapping("/priceChanger/decrease/category")
    fun decreaseByCategory(@RequestBody pcDTO: PriceChangerDTO): ResponseEntity<List<Product>> {
        // if ids of pcDTO is empty, returns all products with category 'pcDTO.category' decreased
        return ResponseEntity(priceChangerService.decreaseByCategory(pcDTO.ids,pcDTO.category,pcDTO.porcentage), HttpStatus.OK)
    }



}