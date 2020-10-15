package com.loshermanos.controller

import com.loshermanos.controller.dto.SaleItemDTO
import com.loshermanos.controller.dto.StockDTO
import com.loshermanos.model.Product
import com.loshermanos.service.ProductService
import com.loshermanos.service.exception.InvalidProductException
import com.loshermanos.service.exception.LosHermanosException
import org.springframework.context.annotation.Scope
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Component
import org.springframework.web.bind.annotation.*
import org.springframework.web.context.request.WebRequest
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@CrossOrigin
@RestController
@Scope(value = "session")
@Component(value = "productController")
class ProductController (val productService: ProductService){
    //ControllerAdvice catch the exceptions and throws the corresponding error, saves lot of ifs.
    @ControllerAdvice
    class ControllerAdviceRequestError : ResponseEntityExceptionHandler() {
        @ExceptionHandler(value = [(LosHermanosException::class)])
        fun handleUserAlreadyExists(ex: LosHermanosException,request: WebRequest): ResponseEntity<String> {
            return ResponseEntity(ex.message, ex.status)
        }
    }

    @PostMapping("/product")
    fun postProduct(@RequestBody body: Product): ResponseEntity<Product> {
        checkValidProduct(body)
        return ResponseEntity(productService.save(body),HttpStatus.OK)
    }

    @PutMapping("/product")
    fun putProduct(@RequestBody body: Product): ResponseEntity<Product> {
        checkValidProduct(body)
        return ResponseEntity(productService.update(body),HttpStatus.OK)
    }

    @GetMapping("/product/id/{id}")
    fun getProductById(@PathVariable id: Long): ResponseEntity<Product> {
        return ResponseEntity(productService.findById(id),HttpStatus.OK)
    }

    @GetMapping("/product/barcode/{barcode}")
    fun getProductByBarcode(@PathVariable barcode: Long): ResponseEntity<Product> {
        return ResponseEntity(productService.findByBarCode(barcode),HttpStatus.OK)
    }

    @GetMapping("/product/all")
    fun getAllProducts(): ResponseEntity<List<Product>> {
        return ResponseEntity(productService.getAll(),HttpStatus.OK)
    }

    @PostMapping("/product/sale")
    fun sellProducts(@RequestBody items: List<SaleItemDTO>): ResponseEntity<List<Product>> {
        return ResponseEntity(productService.sell(items),HttpStatus.OK)
    }

    @PostMapping("/product/stock")
    fun alterStock(@RequestBody stockDTO: StockDTO): ResponseEntity<Product> {
        return ResponseEntity(productService.alterStock(stockDTO.id,stockDTO.amount,stockDTO.add),HttpStatus.OK)
    }

    private fun checkValidProduct(product: Product) {
        if (
            !(product.description.length >= 4 && product.description.length < 100 &&
            product.stock > 0&&
            //product.barcode.toString().length == 13 TODO:DISABLED FOR TESTING
            product.price>0)
        )
            throw InvalidProductException("Hay errores en el formulario del producto")
    }

}