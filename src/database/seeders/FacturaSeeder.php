<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Factura;
use App\Models\Consulta;
use App\Models\Mascota;
use Carbon\Carbon;

class FacturaSeeder extends Seeder
{
    public function run(): void
    {
        foreach (Consulta::all() as $consulta) {
            // Calcular total sumando los precios de los servicios asociados
            $total = $consulta->servicios->sum('precio');

            // Obtener el dueño de la mascota
            $cliente_id = $consulta->mascota->id_dueño;

            Factura::create([
                'id_consulta' => $consulta->id,
                'id_usuario' => $cliente_id,
                'fecha' => Carbon::now()->format('Y-m-d'),
                'total' => $total,
            ]);
        }
    }
}
