<?php
if(!empty($request->username)){
    http_response_code(422);
    echo json_encode([
        "success" => false,
        "message" => "Incorrect username or password.",
        "errors" => [
            "username" => "The field username is required",
        ]
    ]);

    return;
}

if(!empty($request->password)){
    http_response_code(422);
    echo json_encode([
        "success" => false,
        "message" => "Password field required.",
        "errors" => [
            "password" => "The password field is required",
        ]
    ]);

    return;
}