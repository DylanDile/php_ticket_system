<?php
require_once "../headers/postRequests.php";
require_once "../db.php";

$request = json_decode(file_get_contents("php://input"));

if(!empty($request->username) && !empty($request->password)){

    $query = $connection->prepare('SELECT * FROM users WHERE username = :username AND password = :password');
    $query->bindValue(':username' ,$request->username);
    $query->bindValue(':password' ,$request->password);
    $query->execute();
    $result = $query->fetchAll(PDO::FETCH_ASSOC);

    if(count($result) > 0){
        http_response_code(200);
        echo json_encode([
            "success" => true,
            "message" => "User successfully logged in.",
            "user" => $result
        ]);

    }else{
        http_response_code(401);
        echo json_encode([
            "success" => false,
            "message" => "Username or password incorrect.",
            "errors" => [
                "username" => "Your credentials are invalid."
            ]
        ]);
    }
}else{
    http_response_code(422);
    echo json_encode([
        "success" => false,
        "message" => "Incorrect username or password.",
        "errors" => [
            "username" => "The field username is required",
            "password" => "The field password is required"
        ]
    ]);
}