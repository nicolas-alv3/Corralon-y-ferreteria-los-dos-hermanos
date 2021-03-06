package com.loshermanos.controller

import com.loshermanos.controller.dto.SaleItemDTO
import com.loshermanos.controller.dto.StockDTO
import com.loshermanos.model.Product
import com.loshermanos.model.ProductCategory
import com.loshermanos.service.ProductService
import com.loshermanos.service.exception.InvalidProductException
import com.loshermanos.service.exception.LosHermanosException
import com.loshermanos.service.exception.StockMustBeIntegerException
import org.springframework.context.annotation.Scope
import org.springframework.data.domain.Page
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

    @GetMapping("/product/all/{page}")
    fun getAllByPage(@PathVariable page: Integer): ResponseEntity<Page<Product>> {
        return ResponseEntity(productService.getByPage(page),HttpStatus.OK)
    }

    @GetMapping("/product/byCategory/{category}")
    fun getAllByCategory(@PathVariable category: ProductCategory): ResponseEntity<List<Product>> {
        return ResponseEntity(productService.getByCategory(category),HttpStatus.OK)
    }

    @PostMapping("/product/sale")
    fun sellProducts(@RequestBody items: List<SaleItemDTO>): ResponseEntity<List<Product>> {
        return ResponseEntity(productService.sell(items),HttpStatus.OK)
    }

    @PostMapping("/product/stock")
    fun alterStock(@RequestBody stockDTO: StockDTO): ResponseEntity<Product> {
        return ResponseEntity(productService.alterStock(stockDTO.id,stockDTO.amount,stockDTO.add),HttpStatus.OK)
    }

    @PostMapping("/product/delete/{id}")
    fun deleteProduct(@PathVariable id:Long) : ResponseEntity<Product> {
        return ResponseEntity(productService.delete(id),HttpStatus.OK)
    }

    private fun checkValidProduct(product: Product) {
        if (
            !(product.description.length >= 4 && product.description.length < 100 &&
            product.stock > 0&&
            product.price>0)
        )
            throw InvalidProductException("Hay errores en el formulario del producto")
        if (product.category != ProductCategory.CERAMICA && hasDecimal(product.stock))
            throw StockMustBeIntegerException("El producto " + product.description + " no puede tener stock con decimales")

    }

    private fun hasDecimal(n: Double): Boolean {
        return n - n.toInt() > 0
    }

}