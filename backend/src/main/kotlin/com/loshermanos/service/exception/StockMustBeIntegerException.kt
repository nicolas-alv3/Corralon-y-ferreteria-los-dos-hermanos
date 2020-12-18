package com.loshermanos.service.exception

import org.springframework.http.HttpStatus

class StockMustBeIntegerException(message: String) : LosHermanosException(message,HttpStatus.BAD_REQUEST) {

}