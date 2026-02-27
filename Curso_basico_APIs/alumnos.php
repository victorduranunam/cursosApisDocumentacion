<?php
header('Content-Type: application/json');

// Datos de ejemplo (podrian generarse dinámicamente desde una base de datos)
$alumnos = [
    ["id" => 1, "nombre" => "Juan", "edad" => 20],
    ["id" => 2, "nombre" => "María", "edad" => 22],
];

echo json_encode($alumnos);
?>
