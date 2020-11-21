package com.loshermanos.service.exception

import org.springframework.http.HttpStatus

class InsufficientStockException(message: String) : LosHermanosException(message,HttpStatus.BAD_REQUEST) {

}
