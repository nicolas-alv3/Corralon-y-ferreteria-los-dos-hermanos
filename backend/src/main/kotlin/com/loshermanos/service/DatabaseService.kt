package com.loshermanos.service


import com.loshermanos.persistence.DatabaseUtils
import org.springframework.context.annotation.Scope
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component

@Scope(value = "session")
@Component(value = "scheduledService")
class ScheduledService {

    fun makeBackup():String{
        val dbUtils = DatabaseUtils()
        dbUtils.backup("root","root","LosHermanos","backup.sql")
        return "Backup done"
    }

    fun restoreFromBackup(): String {
        val dbUtils = DatabaseUtils()
        dbUtils.restore("root","root","LosHermanos","backup.sql")
        return "Restore done"
    }
}
