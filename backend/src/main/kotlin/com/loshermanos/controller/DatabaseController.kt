package com.loshermanos.controller

import com.loshermanos.service.DatabaseService
import org.springframework.context.annotation.Scope
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Component
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController


@CrossOrigin
@RestController
@Scope(value = "session")
@Component(value = "ScheduledController")
class DatabaseController(val scheduledService: DatabaseService) {

    @GetMapping("/backup")
    fun backup(): ResponseEntity<String> {
        if(scheduledService.makeBackup()){
            return ResponseEntity("Backup successful",HttpStatus.OK)
        }
        return ResponseEntity("There was an unexpected error during restore",HttpStatus.CONFLICT)
    }

    @GetMapping("/restore")
    fun restore():ResponseEntity<String>{
        if(scheduledService.restoreFromBackup()){
            return ResponseEntity("Backup restored",HttpStatus.OK)
        }
        return ResponseEntity("There was an unexpected error during restore",HttpStatus.CONFLICT)
    }
}
