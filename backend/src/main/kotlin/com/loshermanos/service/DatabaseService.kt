package com.loshermanos.service


import com.loshermanos.persistence.DatabaseUtils
import org.springframework.context.annotation.Scope
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component

@Scope(value = "session")
@Component(value = "databaseService")
class DatabaseService {

    fun makeBackup():Boolean{
        val dbUtils = DatabaseUtils()
        try{
            dbUtils.backup("root","root","LosHermanos","backup.sql")
        }catch (e :Exception){
            return false
        }
        return return true
    }

    fun restoreFromBackup(): Boolean {
        val dbUtils = DatabaseUtils()
        try{
            dbUtils.restore("root","root","LosHermanos","backup.sql")
        }catch (e :Exception){
            return false
        }
        return return true
    }
}
