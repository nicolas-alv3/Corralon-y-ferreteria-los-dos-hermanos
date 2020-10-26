package com.loshermanos.service

import com.loshermanos.model.Product
import com.loshermanos.persistence.ProductDAO
import org.springframework.context.annotation.Scope
import org.springframework.data.domain.Page
import org.springframework.stereotype.Component


@Scope(value = "session")
@Component(value = "searchService")
class SearchService(val productDAO: ProductDAO) {
    fun search(data: String, page: Integer): Page<Product> {
        return productDAO.search(data,page)
    }


}