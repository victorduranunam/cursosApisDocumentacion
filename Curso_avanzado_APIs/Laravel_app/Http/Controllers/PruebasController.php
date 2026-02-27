<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

class PruebasController extends Controller
{
    #[OA\Get(
        path: '/api/saludar/{nombre}',
        summary: 'Saluda a un usuario',
        tags: ['Pruebas']
    )]
    #[OA\Parameter(
        name: 'nombre',
        in: 'path',
        required: true,
        schema: new OA\Schema(type: 'string')
    )]
    #[OA\Response(response: 200, description: 'Respuesta exitosa')]
    public function saludar($nombre)
    {
        return response()->json([
            'mensaje' => "Hola, $nombre. ¡Bienvenido a Laravel!"
        ]);
    }


#[OA\Get(
        path: '/api/datosAlumno',
        summary: 'Obtener datos del alumno',
        description: 'Retorna los datos del alumno enviados por query strings',
        tags: ['Pruebas']
    )]
    #[OA\Parameter(
        name: 'nombre',
        in: 'query',
        description: 'Nombre del alumno',
        required: true,
        schema: new OA\Schema(type: 'string', default: 'Sin nombre')
    )]
    #[OA\Parameter(
        name: 'edad',
        in: 'query',
        description: 'Edad del alumno',
        required: false,
        schema: new OA\Schema(type: 'integer', default: 18)
    )]
    #[OA\Parameter(
        name: 'ciudad',
        in: 'query',
        description: 'Ciudad de residencia',
        required: false,
        schema: new OA\Schema(type: 'string', default: 'Desconocida')
    )]
    #[OA\Response(
        response: 200,
        description: 'Datos del alumno procesados correctamente'
    )]
   

    public function datosAlumno(Request $request)
    {
        // En Laravel, puedes pasar un segundo argumento a query() como valor por defecto
        $nombre = $request->query('nombre', 'Sin nombre');
        $edad = $request->query('edad', 18);
        $ciudad = $request->query('ciudad', 'Desconocida');

        return response()->json([
            'nombre' => $nombre,
            'edad' => $edad,
            'ciudad' => $ciudad
        ]);
    }



    #[OA\Post(
        path: '/api/enviarDatos',
        summary: 'Registrar datos de alumno vía Body',
        tags: ['Pruebas']
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ['nombre', 'edad', 'ciudad'],
            properties: [
                new OA\Property(property: 'nombre', type: 'string', example: 'Juan Perez'),
                new OA\Property(property: 'edad', type: 'integer', example: 21),
                new OA\Property(property: 'ciudad', type: 'string', example: 'Madrid')
            ]
        )
    )]
    #[OA\Response(response: 200, description: 'Datos recibidos correctamente')]
    #[OA\Response(response: 422, description: 'Error de validación')]
    

    
    public function enviarDatos(Request $request)
    {
        // Validar los datos recibidos en el body
        $validated = $request->validate([
            'nombre' => 'required|string',
            'edad'   => 'required|integer',
            'ciudad' => 'required|string',
        ]);

        return response()->json([
            'nombre' => $validated['nombre'],
            'edad'   => $validated['edad'],
            'ciudad' => $validated['ciudad']
        ]);
    }


    #[OA\Post(
        path: '/api/verificarClave',
        summary: 'Verifica la clave manualmente en el controlador',
        tags: ['Pruebas']
    )]
    #[OA\Parameter(
        name: 'x-api-key',
        in: 'header',
        description: 'Introduce tu clave secreta aquí',
        required: true,
        schema: new OA\Schema(type: 'string', default: 'millave1234')
    )]
    #[OA\Response(response: 200, description: 'Acceso concedido')]
    #[OA\Response(response: 401, description: 'Clave incorrecta')]
    public function verificarClave(Request $request)
    {
        // 1. Obtenemos la clave directamente del header
        $apiKey = $request->header('x-api-key');

        // 2. Verificamos la validez
        if (!$apiKey || $apiKey !== 'millave1234') {
            return response()->json([
                'status' => 'error',
                'message' => 'No autorizado. La clave enviada no es válida.'
            ], 401);
        }

        // 3. Si es válida, continuamos con la lógica
        return response()->json([
            'status' => 'success',
            'message' => '¡Clave validada correctamente en el controlador!'
        ]);
    }
    
}