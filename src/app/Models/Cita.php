<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cita extends Model
{
    use HasFactory;

    protected $table = 'citas';

    protected $fillable = [
        'id_mascota',
        'id_veterinario',
        'fecha',
        'hora',
        'motivo',
        'estado',
    ];

    // Relación: esta cita pertenece a una mascota
    public function mascota()
    {
        return $this->belongsTo(Mascota::class, 'id_mascota');
    }

    // Relación: esta cita puede estar asignada a un veterinario
    public function veterinario()
    {
        return $this->belongsTo(Usuario::class, 'id_veterinario');
    }

    // Relación: esta cita puede tener una consulta asociada
    public function consulta()
    {
        return $this->hasOne(Consulta::class, 'id_cita');
    }
}
