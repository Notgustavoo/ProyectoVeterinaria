<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Cita;
use App\Models\Mascota;
use App\Models\Usuario;
use Carbon\Carbon;

class CitaSeeder extends Seeder
{
    public function run(): void
    {
        $mascotas = Mascota::all();
        $veterinarios = Usuario::where('rol', 'veterinario')->pluck('id')->toArray();

        foreach ($mascotas as $mascota) {
            Cita::create([
                'id_mascota' => $mascota->id,
                'id_veterinario' => $veterinarios[array_rand($veterinarios)],
                'fecha' => Carbon::now()->addDays(rand(1, 15))->format('Y-m-d'),
                'hora' => Carbon::createFromTime(rand(8, 17), rand(0, 1) * 30)->format('H:i:s'),
                'motivo' => fake()->sentence(),
                'estado' => 'pendiente'
            ]);
        }
    }
}
