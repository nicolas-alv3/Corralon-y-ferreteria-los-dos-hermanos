package com.loshermanos

import com.loshermanos.persistence.DatabaseUtils
import com.loshermanos.service.ScheduledService
import org.apache.commons.logging.LogFactory
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Scope
import org.springframework.scheduling.annotation.EnableAsync
import org.springframework.scheduling.annotation.EnableScheduling
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor
import org.springframework.stereotype.Component
import java.lang.Exception
import java.text.SimpleDateFormat
import java.util.*
import java.util.concurrent.Executor


@SpringBootApplication
@EnableScheduling
class LoshermanosApplication

fun main(args: Array<String>) {
	SpringApplication.run(LoshermanosApplication::class.java,*args)
}

@Component
class ScheduledTasks() {

	val log = LogFactory.getLog(ScheduledTasks::class.java)!!

	@Scheduled(cron = "0 0 8-18 * * *") // Run the task every hour o clock, from 8 to 18.
	fun makeBackup() {
		val dbUtils = DatabaseUtils()
		try {
			dbUtils.backup("root","root","LosHermanos","backup.sql")
		}catch (e:Exception){log.info("Unexpected error during backup")}
		log.info("Backup done")
	}
}


