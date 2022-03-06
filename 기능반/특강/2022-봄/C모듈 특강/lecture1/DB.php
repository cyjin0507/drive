<?php
class DB {
    private static $db = null;

    private static function getDB() {
        if(is_null(self::$db)) {
            self::$db = new \PDO("mysql:host=localhost; dbname=2019; charset=utf8mb4;", "root", "");
        }

        return self::$db;
    }

    public static function execute($sql, $data = []) {
        $query = self::getDB()->prepare($sql);
        return $query->execute($data);
    }

    public static function fetch($sql, $data = []) {
        $query = self::getDB()->prepare($sql);
        $query->execute($data);
        return $query->fetch(\PDO::FETCH_OBJ);
    }

    public static function fetchAll($sql, $data = []) {
        $query = self::getDB()->prepare($sql);
        $query->execute($data);
        return $query->fetchAll(\PDO::FETCH_OBJ);
    }

    public static function lastId() {
        return self::getDB()->lastInsertId();
    }

}