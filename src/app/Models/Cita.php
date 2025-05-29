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


    public const ESTADOS_VALIDOS = ['pendiente', 'realizada', 'cancelada'];


    public function mascota()
    {
        return $this->belongsTo(Mascota::class, 'id_mascota');
    }


    public function veterinario()
    {
        return $this->belongsTo(Usuario::class, 'id_veterinario');
    }


    public function consulta()
    {
        return $this->hasOne(Consulta::class, 'id_cita');
    }
}
