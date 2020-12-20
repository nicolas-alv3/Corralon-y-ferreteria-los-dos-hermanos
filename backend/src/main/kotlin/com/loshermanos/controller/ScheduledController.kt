package com.loshermanos.controller

import com.loshermanos.service.ProductService
import com.loshermanos.service.ScheduledService
import org.apache.commons.logging.LogFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Scope
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import java.text.SimpleDateFormat


@CrossOrigin
@RestController
@Scope(value = "session")
@Component(value = "ScheduledController")
class ScheduledController(val scheduledService: ScheduledService) {

    @GetMapping("/backup")
    fun backup():ResponseEntity<String>{
        return ResponseEntity(scheduledService.makeBackup(),HttpStatus.OK)
    }

    @GetMapping("/restore")
    fun restore():ResponseEntity<String>{
        return ResponseEntity(scheduledService.restoreFromBackup(),HttpStatus.OK)
    }
}
