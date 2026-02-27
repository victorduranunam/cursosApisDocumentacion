<?php

namespace App\Swagger;

use OpenApi\Attributes as OA;

#[OA\Info(title: "API Ejemplo en Laravel", version: "1.0.0")]
#[OA\Server(url: "http://127.0.0.1:8080/", description: "Servidor Local")]

class ApiDocumentation { }