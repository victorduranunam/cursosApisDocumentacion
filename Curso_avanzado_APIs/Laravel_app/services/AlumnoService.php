<?php

namespace App\Services;
use App\Models\Alumno;
class AlumnoService
{
    // 🔹 Crear alumno
    public function crear(array $data): Alumno
    {
        return Alumno::create($data);
    }

    // 🔹 Obtener todos los alumnos
    public function obtenerTodos()
    {
        return Alumno::all();
    }

    // 🔹 Obtener alumno por ID
    public function obtenerPorId(int $id): ?Alumno
    {
        return Alumno::find($id);
    }

    // 🔹 Actualizar alumno
    public function actualizar(int $id, array $data): ?Alumno
    {
        $alumno = Alumno::find($id);

        if (!$alumno) {
            return null;
        }

        $alumno->update($data);
        return $alumno;
    }

    // 🔹 Eliminar alumno
    public function eliminar(int $id): bool
    {
        $alumno = Alumno::find($id);

        if (!$alumno) {
            return false;
        }

        return $alumno->delete();
    }
}