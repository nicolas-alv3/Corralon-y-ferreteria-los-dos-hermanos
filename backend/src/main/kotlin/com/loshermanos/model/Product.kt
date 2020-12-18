package com.loshermanos.model

import javax.persistence.Entity
import com.loshermanos.service.exception.InsufficientStockException
import com.loshermanos.service.exception.StockMustBeIntegerException
import kotlin.math.floor
import kotlin.math.round

@Entity
class Product(
        var description:String,
        var price: Double = 0.0,
        var barcode:Long,
        var stock:Double = 0.0,
        var category:ProductCategory
    ): AbstractJpaPersistable<Long>() {
    constructor() : this("default",0.0,-1,0.0,ProductCategory.FERRETERIA) {
    }

    fun increasePriceByPorcentage(porcentage:Double) {
        price = floor(price + price * (porcentage / 100))
    }

    fun decreasePriceByPorcentage(porcentage: Double) {
        price = floor(price - price * (porcentage / 100))
    }

    fun roundForTwoDecimals(amount: Double)  = round(amount * 100.0) / 100.0

    fun addStock(amount: Double) {
        checkDecimal(amount)
        stock = roundForTwoDecimals(stock + amount)
    }

    fun substractStock(amount: Double) {
        checkDecimal(amount)
        if(stock >= amount)
            stock=roundForTwoDecimals(stock - amount)
        else
            throw InsufficientStockException("No tienes suficiente stock")
    }

    private fun checkDecimal(amount: Double) {
        if(this.category != ProductCategory.CERAMICA && amount - amount.toInt() > 0)
            throw StockMustBeIntegerException("El stock del producto " + this.description + " no puede ser alterado con decimales")
    }
}
