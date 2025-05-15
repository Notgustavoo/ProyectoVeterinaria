<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Servicio;

class ServicioSeeder extends Seeder
{
    public function run(): void
    {
        $servicios = [
            ['nombre' => 'Consulta general', 'precio' => 50.00, 'descripcion' => 'Evaluación veterinaria básica.'],
            ['nombre' => 'Vacunación', 'precio' => 30.00, 'descripcion' => 'Aplicación de vacunas esenciales.'],
            ['nombre' => 'Desparasitación', 'precio' => 25.00, 'descripcion' => 'Tratamiento antiparasitario.'],
            ['nombre' => 'Esterilización', 'precio' => 150.00, 'descripcion' => 'Cirugía para control de natalidad.'],
            ['nombre' => 'Control de peso', 'precio' => 40.00, 'descripcion' => 'Seguimiento nutricional.'],
        ];

        foreach ($servicios as $servicio) {
            Servicio::create($servicio);
        }
    }
}
