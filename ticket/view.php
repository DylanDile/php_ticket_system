<?php
require_once "../headers/getRequests.php";
require_once "../db.php";

$request = json_decode(file_get_contents("php://input"));
echo $request;
if(isset($_GET['id'])){
    print_r($request);
    $id = $_GET['id'];

    $query = $connection->prepare('SELECT * FROM  tickets WHERE id = :id');
    $query->bindValue(':id' ,$id);
    $query->execute();
    $result = $query->fetch(PDO::FETCH_ASSOC);

    if(count($result) > 0){
        http_response_code(200);
        echo json_encode($result);
    } else{
        http_response_code(503);
        echo json_encode([
            "success" => false,
            "message" => "Ticket not found."
        ]);
    }
}else{
    http_response_code(422);
    echo json_encode([
        "message" => "Unable to create ticket.",
        "errors" => [
            "id" => "The id field is required.",
        ]
    ]);
}
