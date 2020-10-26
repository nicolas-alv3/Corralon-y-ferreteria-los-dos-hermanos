package com.loshermanos.model

class PriceChanger {
    fun increaseByPorcentage(porcentage: Double, list: List<Product>) {
        list.map { p -> p.increasePriceByPorcentage(porcentage) }
    }

    fun decreaseByPorcentage(porcentage: Double, list: List<Product>) {
        list.map { p -> p.decreasePriceByPorcentage(porcentage) }
    }

    fun increaseByPorcentageAndCategory(porcentage: Double, category: ProductCategory, list: List<Product>) {
        list.map { p-> increaseIfCategory(p,porcentage,category) }
    }

    private fun increaseIfCategory(product: Product, porcentage: Double, category: ProductCategory): Unit {
        if(product.category.equals(category))
            product.increasePriceByPorcentage(porcentage)
    }

    fun decreaseByPorcentageAndCategory(porcentage: Double, category: ProductCategory, list: List<Product>) {
        list.map { p-> decreaseIfCategory(p,porcentage,category) }
    }

    private fun decreaseIfCategory(product: Product, porcentage: Double, category: ProductCategory): Unit {
        if(product.category.equals(category))
            product.decreasePriceByPorcentage(porcentage)
    }

}
