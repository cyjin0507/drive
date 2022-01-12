<?php
class DB {
    public static function getDB() {
        $host = "localhost";
        $dbname = "test";
        $charset = "utf8mb4";
        $user = "localhost";
        $pass = "";

        if(is_null(self::$db)) {
            self::$db = new \PDO("mysql:host={$host}; dbname={$dbname}; charset={$charset};", $user, $pass);
        }

        return self::$db;
    }
}