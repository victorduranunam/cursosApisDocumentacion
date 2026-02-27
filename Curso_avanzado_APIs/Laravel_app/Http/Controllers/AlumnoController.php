<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AlumnoService;
use OpenApi\Attributes as OA;

#[OA\Tag(
    name: "Alumnos",
    description: "Operaciones relacionadas con la gestión de alumnos"
)]
class AlumnoController extends Controller
{
    protected $alumnoService;

    public function __construct(AlumnoService $alumnoService)
    {
        $this->alumnoService = $alumnoService;
    }

    #[OA\Post(
        path: "/api/alumnos/guardar",
        summary: "Registrar un nuevo alumno",
        tags: ["Alumnos"],
        requestBody: new OA\RequestBody(
            required: true,
            description: "Datos del alumno a registrar",
            content: new OA\JsonContent(
                required: ["nombre", "correo", "direccion", "edad"],
                properties: [
                    new OA\Property(property: "nombre", type: "string", example: "Juan Pérez"),
                    new OA\Property(property: "correo", type: "string", format: "email", example: "juan@email.com"),
                    new OA\Property(property: "direccion", type: "string", example: "Av. Universidad 3000"),
                    new OA\Property(property: "edad", type: "integer", minimum: 1, maximum: 120, example: 22)
                ]
            )
        ),
        responses: [
            new OA\Response(response: 201, description: "Alumno creado correctamente"),
            new OA\Response(response: 400, description: "Datos inválidos")
        ]
    )]

    public function guardar(Request $request)
{
    $validated = $request->validate([
        'nombre'    => 'required|string',
        'correo'    => 'required|email|unique:alumnos',
        'direccion' => 'required|string',
        'edad'      => 'required|integer|min:1|max:120',
    ]);

    // Cambiado de crearAlumno() a crear()
    $alumno = $this->alumnoService->crear($validated);

    return response()->json([
        'mensaje' => 'Alumno creado correctamente',
        'alumno'  => $alumno
    ], 201);
}


    #[OA\Get(
        path: "/api/alumnos/mostrar",
        summary: "Obtener todos los alumnos",
        tags: ["Alumnos"],
        responses: [
            new OA\Response(response: 200, description: "Listado de alumnos")
        ]
    )]
    public function mostrar()
    {
        $alumnos = $this->alumnoService->obtenerTodos();
        return response()->json($alumnos);
    }

    #[OA\Get(
        path: "/api/alumnos/obtenerID/{id}",
        summary: "Obtener un alumno por ID",
        tags: ["Alumnos"],
        parameters: [
            new OA\Parameter(
                name: "id",
                description: "ID del alumno",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer")
            )
        ],
        responses: [
            new OA\Response(response: 200, description: "Alumno encontrado"),
            new OA\Response(response: 404, description: "Alumno no encontrado")
        ]
    )]
    public function obtenerPorId($id)
    {
        $alumno = $this->alumnoService->obtenerPorId($id);

        if (!$alumno) {
            return response()->json(['mensaje' => 'Alumno no encontrado'], 404);
        }

        return response()->json($alumno);
    }

    #[OA\Put(
        path: "/api/alumnos/actualizar/{id}",
        summary: "Actualizar información de un alumno",
        tags: ["Alumnos"],
        parameters: [
            new OA\Parameter(
                name: "id",
                description: "ID del alumno a modificar",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer")
            )
        ],
        requestBody: new OA\RequestBody(
            required: true,
            description: "Datos a actualizar del alumno",
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: "nombre", type: "string", example: "Juan Pérez"),
                    new OA\Property(property: "correo", type: "string", format: "email", example: "juan@email.com"),
                    new OA\Property(property: "direccion", type: "string", example: "Nueva dirección"),
                    new OA\Property(property: "edad", type: "integer", minimum: 1, maximum: 120, example: 25)
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: "Alumno actualizado correctamente"),
            new OA\Response(response: 404, description: "Alumno no encontrado")
        ]
    )]
    
public function actualizar(Request $request, $id)
{
    try {
        $validated = $request->validate([
            'nombre'    => 'sometimes|required|string',
            'correo'    => 'sometimes|required|email|unique:alumnos,correo,' . $id,
            'direccion' => 'sometimes|required|string',
            'edad'      => 'sometimes|required|integer|min:1|max:120',
        ]);

        $alumno = $this->alumnoService->actualizar($id, $validated);

        if (!$alumno) {
            return response()->json(['mensaje' => 'Alumno no encontrado'], 404);
        }

        return response()->json([
            'mensaje' => 'Alumno actualizado',
            'alumno'  => $alumno
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ], 500);
    }
}



    #[OA\Delete(
        path: "/api/alumnos/eliminar/{id}",
        summary: "Eliminar un alumno",
        tags: ["Alumnos"],
        parameters: [
            new OA\Parameter(
                name: "id",
                description: "ID del alumno a eliminar",
                in: "path",
                required: true,
                schema: new OA\Schema(type: "integer")
            )
        ],
        responses: [
            new OA\Response(response: 200, description: "Alumno eliminado correctamente"),
            new OA\Response(response: 404, description: "Alumno no encontrado")
        ]
    )]
   

    public function eliminar($id)
{
    try {
        $eliminado = $this->alumnoService->eliminar($id);

        if (!$eliminado) {
            return response()->json(['mensaje' => 'Alumno no encontrado'], 404);
        }

        return response()->json(['mensaje' => 'Alumno eliminado correctamente']);
    } catch (\Exception $e) {
        return response()->json([
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ], 500);
    }
}


}