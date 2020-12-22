package com.loshermanos.persistence

import java.io.IOException




class DatabaseUtils {
    @Throws(IOException::class, InterruptedException::class)
    fun backup(dbUsername: String?, dbPassword: String?, dbName: String?, outputFile: String?): Boolean {
        val command = String.format("mysqldump -u%s -p%s --add-drop-table --databases %s -r %s",
                dbUsername, dbPassword, dbName, outputFile)
        val process = Runtime.getRuntime().exec(command)
        val processComplete = process.waitFor()
        return processComplete == 0
    }

    @Throws(IOException::class, InterruptedException::class)
    open fun restore(dbUsername: String, dbPassword: String, dbName: String, sourceFile: String): Boolean {
        val command = arrayOf(
                "mysql",
                "-u$dbUsername",
                "-p$dbPassword",
                "-e",
                " source $sourceFile",
                dbName
        )
        val runtimeProcess = Runtime.getRuntime().exec(command)
        val processComplete = runtimeProcess.waitFor()
        return processComplete == 0
    }
}