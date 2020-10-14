package com.loshermanos.service.exception

import org.springframework.http.HttpStatus

class InvalidProductException(message: String) : LosHermanosException(message,HttpStatus.BAD_REQUEST) {

}
