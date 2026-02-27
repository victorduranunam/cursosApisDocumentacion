<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Alumno extends Model
{
    protected $table = 'alumnos';
    public $timestamps = false;
    protected $fillable = [
        'nombre',
        'edad',
        'direccion',
        'correo'
    ];
    public function inscripciones(): HasMany
    {
        return $this->hasMany(AlumnoGrupo::class, 'id_alumno');
    }
}