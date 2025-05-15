<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Mascota;
use App\Models\Usuario;

class MascotaSeeder extends Seeder
{
    public function run(): void
    {
        $clientes = Usuario::where('rol', 'cliente')->get();

        foreach ($clientes as $cliente) {
            Mascota::factory()->count(rand(1, 3))->create([
                'id_dueño' => $cliente->id
            ]);
        }
    }
}
