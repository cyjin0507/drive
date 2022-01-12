<?php
class DB
{
    private static $db = null;

    private static function getDB() {
        $host = "localhost";
        $dbname = "skills05";
        $charset = "utf8mb4";
        $user = "skills05";
        $pass = "1234";

        if(is_null(self::$db)) {
            self::$db = new \PDO("mysql:host={$host}; dbname={$dbname}; charset={$charset}", $user, $pass); 
        }

        return self::$db;
    }

    public static function execute($sql, $datas = []) {
        $query = self::getDB()->prepare($sql);
        return $query->execute($datas);
    }

    public static function fetch($sql, $datas = []) {
        $query = self::getDB()->prepare($sql);
        $query->execute($datas);
        return $query->fetch(\PDO::FETCH_OBJ);
    }

    public static function fetchAll($sql, $datas = []) {
        $query = self::getDB()->prepare($sql);
        $query->execute($datas);
        return $query->fetchAll(\PDO::FETCH_OBJ);
    }

    public static function lastId() {
        return self::getDB()->lastInsertId();
    }

}