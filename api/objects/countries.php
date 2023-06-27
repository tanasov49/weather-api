<?php

class Product
{
    // подключение к базе данных и таблице "products"
    private $conn;
    private $table_name = "countries";

    // свойства объекта
    public $fk_country_id;
    public $country_id;
    public $country;
    public $city_id;
    public $city;
    public $lat;
    public $lng;
    
    // конструктор для соединения с базой данных
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // здесь будет метод read()
    function read()
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
function readOne($fk_country_id)
{
    // запрос для чтения одной записи (товара)
    
    $query = "SELECT
            city_id, city, lat, lng
        FROM
            " . $this->table_name . "
            INNER JOIN cities ON country_id = fk_country_id WHERE fk_country_id = ? ORDER BY city ASC ";
            
    // подготовка запроса
    $stmt = $this->conn->prepare($query);
    $fk_country_id = htmlspecialchars(strip_tags($fk_country_id));
    $fk_country_id = "%{$fk_country_id}%";
    // привязываем id товара, который будет получен
    $stmt->bindParam(1, $this->fk_country_id);

    // выполняем запрос
    $stmt->execute();

    // получаем извлеченную строку
    return $stmt;

}

}
