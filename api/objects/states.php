<?php

class Product
{
    // подключение к базе данных и таблице "products"
    private $conn;
    private $table_name = "countries";
    private $table_name2 = "states";

    public $state_id;
    public $state;
    
    // конструктор для соединения с базой данных
    public function __construct($db)
    {
        $this->conn = $db;
    }

function readStates($fk_country_id)
{
    // запрос для чтения одной записи (товара)
    
    $query = "SELECT 
                state, state_id
        FROM
            " . $this->table_name . "
            INNER JOIN " . $this->table_name2 . " ON country_id = fk_country_id WHERE fk_country_id = $fk_country_id ORDER BY state ASC";
            
    // подготовка запроса
    $stmt = $this->conn->prepare($query);

    // привязываем id товара, который будет получен

    // выполняем запрос
    $stmt->execute();

    // получаем извлеченную строку
    return $stmt;

}

}
