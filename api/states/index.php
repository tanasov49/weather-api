<?php
// необходимые HTTP-заголовки
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");
// подключение файла для соединения с базой и файл с объектом
include_once "../config/database.php";
include_once "../objects/states.php";
$database = new Database();
$db = $database->getConnection();
$product = new Product($db);
$fk_country_id = isset($_GET["country_id"]) ? $_GET["country_id"] : die();
$stmt = $product->readStates($fk_country_id);
$num = $stmt->rowCount();

if ($num > 0 && $fk_country_id != null) {
    $product_arr = array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $product_item = array(
            "state_id" => (int)$state_id,
            "state" => $state,
            "latitude" => $latitude,
            "longitude" => $longitude,
            "city_boolean" => (bool)$city_boolean
        );
        array_push($product_arr, $product_item);
    }
    // код ответа - 200 OK
    http_response_code(200);
    // вывод в формате json
    echo json_encode($product_arr);
} else {
    // код ответа - 404 Не найдено
    http_response_code(404);
    // сообщим пользователю, что такой товар не существует
    echo json_encode(array("message" => "Data is empty"), JSON_UNESCAPED_UNICODE);
    
}