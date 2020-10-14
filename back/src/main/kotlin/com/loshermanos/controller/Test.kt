package com.loshermanos.controller

import org.springframework.context.annotation.Scope
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Component
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*


@CrossOrigin
@RestController
@Scope(value = "session")
@Component(value = "APIController")
class APIController {

    @GetMapping("/")
    fun apiTest(): ResponseEntity<String> {
        return ResponseEntity("API TESTING", HttpStatus.OK)
    }
}