package com.loshermanos.model

import javax.persistence.Entity
import com.loshermanos.service.exception.InsufficientStockException

@Entity
class Product(
        var description:String,
        var price: Double = 0.0,
        var barcode:Long,
        var stock:Long = 0,
        var category:ProductCategory
    ): AbstractJpaPersistable<Long>() {
    constructor() : this("default",0.0,-1,0,ProductCategory.FERRETERIA) {
    }

    fun increasePriceByPorcentage(porcentage:Double) {
        price = Math.floor(price + price * (porcentage / 100))
    }

    fun decreasePriceByPorcentage(porcentage: Double) {
        price = Math.floor(price - price * (porcentage / 100))
    }

    fun addStock(amount: Long) {
        stock+=amount;
    }

    fun substractStock(amount: Long) {
        if(stock >= amount)
            stock-=amount;
        else
            throw InsufficientStockException("No tienes suficiente stock")
    }

}
