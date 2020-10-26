package com.loshermanos.service.exception

import org.springframework.http.HttpStatus

class ProductAlreadyExistException(message: String) : LosHermanosException(message,HttpStatus.CONFLICT) {
}
