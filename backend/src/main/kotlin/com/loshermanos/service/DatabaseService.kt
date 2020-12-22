package com.loshermanos.service


import com.loshermanos.persistence.DatabaseUtils
import org.springframework.context.annotation.Scope
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component

@Scope(value = "session")
@Component(value = "databaseService")
class DatabaseService {

    /** TODO
     * Make this work on windows
     * */
    fun makeBackup():Boolean{
        val dbUtils = DatabaseUtils()
        return dbUtils.backup("root","root","LosHermanos","backup.sql")
    }

    fun restoreFromBackup(): Boolean {
        val dbUtils = DatabaseUtils()
        return dbUtils.restore("root","root","LosHermanos","backup.sql")
    }
}
