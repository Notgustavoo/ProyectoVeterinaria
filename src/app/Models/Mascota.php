<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mascota extends Model
{
    use HasFactory;

    protected $table = 'mascotas';

    protected $fillable = [
        'nombre',
        'especie',
        'raza',
        'sexo',
        'edad',
        'foto_url',
        'id_dueño'
    ];


    public function dueño()
    {
        return $this->belongsTo(Usuario::class, 'id_dueño');
    }


    public function citas()
    {
        return $this->hasMany(Cita::class, 'id_mascota');
    }


    public function vacunaciones()
    {
        return $this->hasMany(Vacunacion::class, 'id_mascota');
    }

    public function consultas()
    {
        return $this->hasMany(Consulta::class, 'id_mascota');
    }
    public function usuario()
    {
        return $this->belongsTo(\App\Models\Usuario::class, 'id_dueño');
    }

}
