package com.loshermanos.service.exception

import org.springframework.http.HttpStatus

class ProductNotFound(message: String) : LosHermanosException(message,HttpStatus.NOT_FOUND) {
}
