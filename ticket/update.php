<?php
require_once "../headers/postRequests.php";
require_once "../db.php";

$request = json_decode(file_get_contents("php://input"));

if(!empty($request->id) && !empty($request->status)){

    $query = $connection->prepare('UPDATE tickets SET status = :status WHERE id = :id');
    $query->bindValue(':status' ,$request->status);
    $query->bindValue(':id' ,$request->id);

    if($query->execute()){
        http_response_code(201);
        echo json_encode(array("message" => "Ticket updated successfully."));
    } else{
        http_response_code(503);
        echo json_encode(array("message" => "Unable to update ticket."));
    }
}else{
    http_response_code(422);
    echo json_encode([
        "message" => "Unable to create ticket.",
        "errors" => [
            "id" => "The id field is required.",
            "status" => "The status field is required."
        ]
    ]);
}
