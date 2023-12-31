<?php
// необходимые HTTP-заголовки
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");
// подключение базы данных и файл, содержащий объекты
include_once "../config/database.php";
include_once "../objects/countries.php";
// получаем соединение с базой данных
$database = new Database();
$db = $database->getConnection();
// инициализируем объект
$product = new Product($db);
// запрашиваем данные
$stmt = $product->readCountries();
$num = $stmt->rowCount();

// проверка, найдено ли больше 0 записей
if ($num > 0) {
    // массив товаров
    $products_arr = array();
    // получаем содержимое нашей таблицы
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // извлекаем строку
        extract($row);
        $product_item = array(
            "country" => $country,
            "country_id" => (int)$country_id,
            "latitude" => $latitude,
            "longitude" => $longitude,
            "state_boolean" => (bool)$state_boolean
        );
        array_push($products_arr, $product_item);
    }
    // устанавливаем код ответа - 200 OK
    http_response_code(200);

    // выводим данные о товаре в формате JSON
    echo json_encode($products_arr);
}

// "товары не найдены" будет здесь
else {
    // установим код ответа - 404 Не найдено
    http_response_code(404);

    // сообщаем пользователю, что товары не найдены
    echo json_encode(array("message" => "Данные не найдены"), JSON_UNESCAPED_UNICODE);
}
