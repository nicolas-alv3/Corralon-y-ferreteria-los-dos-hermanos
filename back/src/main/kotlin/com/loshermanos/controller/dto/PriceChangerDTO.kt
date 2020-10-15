package com.loshermanos.controller.dto

import com.loshermanos.model.ProductCategory

class PriceChangerDTO(val ids :List<Long>,val category:ProductCategory,val porcentage:Double) {
}
