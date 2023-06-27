<?php
class Product
{
    // подключение к базе данных и таблице "products"
    private $conn;
    private $table_name = "cities";

    // свойства объекта
    public $city_id;
    public $city;
    public $lat;
    public $lng;
    public $id

    // конструктор для соединения с базой данных
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // здесь будет метод read()
    function readOne()
{
    // выбираем все записи
    $query = "SELECT
        city_id, city, lat, lng
    FROM
        " . $this->table_name . " 
    where fk_country_id = ?   
        ";

    // подготовка запроса
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(1, $this->id);
    $stmt->execute();

    // получаем извлеченную строку
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    // установим значения свойств объекта
    $this->city = $row["city"];
    $this->city_id = $row["city_id"];
    $this->lat = $row["lat"];
    $this->lng = $row["lng"];
    $this->id = $row["id"];
}


}