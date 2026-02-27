<?php
header('Content-Type: application/json');

$alumnos = [
    ["id" => 1, "nombre" => "Juan", "edad" => 20, "correo" => "juan@example.com"],
    ["id" => 2, "nombre" => "María", "edad" => 22, "correo" => "maria@example.com"],
];

// IMPORTANTE: Envolver el array en una clave llamada "alumnos"
echo json_encode(["alumnos" => $alumnos]); 
?>