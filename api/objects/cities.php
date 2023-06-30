<?php

class Product
{
    // подключение к базе данных и таблице "products"
    private $conn;
    private $table_name = "countries";
    private $table_name2 = "states";
    private $table_name3 = 'cities';

    public $city_id;
    public $city;
    public $latitude;
    public $longitude;
    
    // конструктор для соединения с базой данных
    public function __construct($db)
    {
        $this->conn = $db;
    }

function readCities($fk_state_id)
{
    // запрос для чтения одной записи (товара)
    
    $query = "SELECT 
                city, city_id, " . $this->table_name3 . ".latitude, " . $this->table_name3 . ".longitude
        FROM
            " . $this->table_name2 . "
            INNER JOIN " . $this->table_name3 . " ON state_id = fk_state_id WHERE fk_state_id = $fk_state_id ORDER BY city ASC";
            
    // подготовка запроса
    $stmt = $this->conn->prepare($query);

    // привязываем id товара, который будет получен

    // выполняем запрос
    $stmt->execute();

    // получаем извлеченную строку
    return $stmt;

}

}
