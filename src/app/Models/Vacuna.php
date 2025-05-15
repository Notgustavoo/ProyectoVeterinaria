<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vacuna extends Model
{
    use HasFactory;

    protected $table = 'vacunas';

    protected $fillable = [
        'nombre',
        'descripcion'
    ];

    public function vacunaciones()
    {
        return $this->hasMany(Vacunacion::class, 'id_vacuna');
    }
}
