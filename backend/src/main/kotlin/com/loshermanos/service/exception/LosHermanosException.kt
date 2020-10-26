package com.loshermanos.service.exception

import org.springframework.http.HttpStatus
import java.lang.RuntimeException

open class LosHermanosException(override val message: String, open val status:HttpStatus) : RuntimeException(message){
}
