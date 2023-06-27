<?php

class Product
{
    // подключение к базе данных и таблице "products"
    private $conn;
    private $table_name = "countries";

    // свойства объекта
    public $country_id;
    public $country;
    
    // конструктор для соединения с базой данных
    public function __construct($db)
    {
        $this->conn = $db;
    }
    // здесь будет метод read()
    function readCountries()
{
    // выбираем все записи
    $query = "SELECT
        country, country_id
    FROM
        " . $this->table_name . " ";

    // подготовка запроса
    $stmt = $this->conn->prepare($query);

    // выполняем запрос
    $stmt->execute();
    return $stmt;
}
}
