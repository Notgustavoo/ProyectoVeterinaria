<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Consulta;
use App\Models\Cita;
use App\Models\Servicio;
use Illuminate\Support\Arr;

class ConsultaSeeder extends Seeder
{
    public function run(): void
    {
        $servicios = Servicio::all()->pluck('id')->toArray();
        $faker = fake();

        foreach (Cita::all() as $cita) {
            $consulta = Consulta::create([
                'id_cita' => $cita->id,
                'id_mascota' => $cita->id_mascota,
                'id_veterinario' => $cita->id_veterinario,
                'sintomas' => $faker->sentence(),
                'diagnostico' => $faker->sentence(),
                'tratamiento' => $faker->sentence(),
                'medicamentos' => $faker->words(3, true),
            ]);

            // Asociar 1 a 3 servicios aleatorios a la consulta
            $serviciosAleatorios = Arr::random($servicios, rand(1, 3));
            $consulta->servicios()->attach($serviciosAleatorios);
        }
    }
}
