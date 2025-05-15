<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vacunacion extends Model
{
    use HasFactory;

    protected $table = 'vacunaciones';

    protected $fillable = [
        'id_mascota',
        'id_vacuna',
        'id_veterinario',
        'fecha'
    ];

    public function mascota()
    {
        return $this->belongsTo(Mascota::class, 'id_mascota');
    }

    public function vacuna()
    {
        return $this->belongsTo(Vacuna::class, 'id_vacuna');
    }

    public function veterinario()
    {
        return $this->belongsTo(Usuario::class, 'id_veterinario');
    }
}
