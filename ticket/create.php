<?php

    require_once "../headers/postRequests.php";

    require_once "../db.php";

    $request = json_decode(file_get_contents("php://input"));

    if(!empty($request->title)  && !empty($request->description)){

        $query = $connection->prepare('INSERT INTO tickets(`title`,  `description`, `user_id`, `status`, `date_submitted`) 
                                             VALUES (:title, :description , :user_id, :status, :date_submitted)');
        $query->bindValue(':title' ,$request->title);
        $query->bindValue(':description' ,$request->description);
        $query->bindValue(':user_id' ,$request->user_id);
        $query->bindValue(':status' ,$request->status);
        $query->bindValue(':date_submitted' ,$request->date_submitted);

        if($query->execute()){
            http_response_code(201);
            echo json_encode(array("message" => "Ticket created successfully."));
        } else{
            http_response_code(503);
            echo json_encode(array("message" => "Unable to create ticket."));
        }
    }else{
        http_response_code(422);
        echo json_encode([
            "message" => "Unable to create ticket.",
            "errors" => [
                "title" => "The title field is required..",
                "description" => "The description field is required.",
            ]
        ]);
    }
