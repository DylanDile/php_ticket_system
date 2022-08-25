<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once "../db.php";

$query = $connection->prepare('SELECT * FROM tickets');
$query->execute();

$result = $query->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($result);

