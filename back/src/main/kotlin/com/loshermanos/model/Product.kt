package com.loshermanos.model

import javax.persistence.Entity
import javax.validation.constraints.PositiveOrZero
import javax.validation.constraints.Size

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
        price += price * (porcentage / 100)
    }

    fun decreasePriceByPorcentage(porcentage: Double) {
        price -= price * (porcentage / 100)
    }

    fun addStock(amount: Long) {
        stock+=amount;
    }

    fun substractStock(amount: Long) {
        stock-=amount;
    }

}
