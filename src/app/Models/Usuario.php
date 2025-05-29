<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    use HasFactory;

    protected $table = 'usuarios';

    protected $fillable = [
        'nombre',
        'correo',
        'contraseña',
        'rol',
        'telefono',
        'direccion',
        'especialidad'
    ];

    protected $hidden = [
        'contraseña',
    ];

    public function mascotas()
    {
        return $this->hasMany(Mascota::class, 'id_dueño');
    }


    public function consultas()
    {
        return $this->hasMany(Consulta::class, 'id_veterinario');
    }
}
