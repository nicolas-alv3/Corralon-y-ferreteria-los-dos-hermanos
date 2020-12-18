package com.loshermanos

import com.loshermanos.model.Product
import com.loshermanos.model.ProductCategory
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

class ProductTest {
    lateinit var aProduct: Product

    @BeforeEach fun setup(){
        aProduct = Product("p",10.0,0,0.0,ProductCategory.FERRETERIA);
    }

    @Test fun whenICreateANewProductItHasThePriceISet(){
        val product = Product("p",10.0,0,0.0,ProductCategory.FERRETERIA)

        assertEquals(product.price,10.0)
    }

    @Test fun whenIIncreasePriceOfTenInTenPorcentOfAProductItPriceIsEleven() {
        aProduct.increasePriceByPorcentage(10.0)

        assertEquals(aProduct.price,11.0)
    }

    @Test fun whenIdecreasePriceOfTenInTenPorcentOfAProductItPriceIsNine() {
        aProduct.decreasePriceByPorcentage(10.0)

        assertEquals(aProduct.price,9.0)
    }

    @Test fun givenAZeroStockProductWhenIAdd20ofStockThenItHas20ofStock(){
        aProduct.addStock(20.0)

        assertEquals(20.0,aProduct.stock)
    }

    @Test fun givenA20StockProductWhenISubstract10ofStockThenItHas10ofStock(){
        val newProduct:Product = Product("prod",50.0,0,20.0,ProductCategory.FERRETERIA)

        newProduct.substractStock(10.0)

        assertEquals(10.0,newProduct.stock)
    }
}