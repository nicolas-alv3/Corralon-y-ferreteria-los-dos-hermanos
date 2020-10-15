package com.loshermanos

import com.loshermanos.model.PriceChanger
import com.loshermanos.model.Product
import com.loshermanos.model.ProductCategory
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

class PriceChangerTest {
    lateinit var product1:Product
    lateinit var product2:Product
    lateinit var product3:Product
    lateinit var priceChanger: PriceChanger

    @BeforeEach fun setup(){
        product1 = Product("product1",10.0,0,0,ProductCategory.FERRETERIA);
        product2 = Product("product2",20.0,0,0,ProductCategory.SANITARIOS);
        product3 = Product("product3",30.0,0,0,ProductCategory.FERRETERIA);
        priceChanger = PriceChanger()

    }
    @Test
    fun givenAListOfThreeProductsWhenIIncreaseTheirPricesInTenPorcentThenTheyAreCorrectlyChanged(){
        var list:List<Product> = mutableListOf(product1,product2,product3)

        priceChanger.increaseByPorcentage(10.0,list)

        assertEquals(list.get(0).price,11.0)
        assertEquals(list.get(1).price,22.0)
        assertEquals(list.get(2).price,33.0)
    }

    @Test
    fun givenAListOfThreeProductsWhenIDecreaseTheirPricesInTenPorcentThenTheyAreCorrectlyChanged(){
        var list:List<Product> = mutableListOf(product1,product2,product3)

        priceChanger.decreaseByPorcentage(50.0,list)

        assertEquals(list.get(0).price,5.0)
        assertEquals(list.get(1).price,10.0)
        assertEquals(list.get(2).price,15.0)
    }

    @Test
    fun givenAListOfTwoProductsOfFerreteriaAndOneOfSanitariosWhenIIncreaseTheirPricesInTenPorcentByCategoryThenTheyAreCorrectlyChanged(){
        var list:List<Product> = mutableListOf(product1,product2,product3)

        priceChanger.increaseByPorcentageAndCategory(10.0,ProductCategory.FERRETERIA,list)

        assertEquals(11.0,list.get(0).price)
        assertEquals(20.0,list.get(1).price)
        assertEquals(33.0,list.get(2).price)
    }

    @Test
    fun givenAListWithoutProductsOfElectricidadWhenIIncreaseTheirPricesInTenPorcentByCategoryThenTheyDontChange(){
        var list:List<Product> = mutableListOf(product1,product2,product3)

        priceChanger.increaseByPorcentageAndCategory(10.0,ProductCategory.ELECTRICIDAD,list)

        assertEquals(10.0,list.get(0).price)
        assertEquals(20.0,list.get(1).price)
        assertEquals(30.0,list.get(2).price)
    }

    @Test
    fun givenAListOfTwoProductsOfFerreteriaAndOneOfSanitariosWhenIDecreaseTheirPricesInTenPorcentByCategoryThenTheyAreCorrectlyChanged(){
        var list:List<Product> = mutableListOf(product1,product2,product3)

        priceChanger.decreaseByPorcentageAndCategory(50.0,ProductCategory.FERRETERIA,list)

        assertEquals(5.0,list.get(0).price)
        assertEquals(20.0,list.get(1).price)
        assertEquals(15.0,list.get(2).price)
    }

    @Test
    fun givenAListWithoutProductsOfElectricidadWhenIDecreaseTheirPricesInTenPorcentByCategoryThenTheyDontChange(){
        var list:List<Product> = mutableListOf(product1,product2,product3)

        priceChanger.decreaseByPorcentageAndCategory(10.0,ProductCategory.ELECTRICIDAD,list)

        assertEquals(10.0,list.get(0).price)
        assertEquals(20.0,list.get(1).price)
        assertEquals(30.0,list.get(2).price)
    }

}