package com.loshermanos.controller

import com.loshermanos.model.ProductCategory

class PriceChangerDTO(val ids :List<Long>,val category:ProductCategory,val porcentage:Double) {
}
