<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Admin
        Usuario::create([
            'nombre' => 'Admin Principal',
            'correo' => 'admin@vetcontrol.com',
            'contraseña' => Hash::make('admin123'),
            'rol' => 'admin',
        ]);

        // Veterinario
        Usuario::create([
            'nombre' => 'Dra. Laura Vet',
            'correo' => 'laura@vetcontrol.com',
            'contraseña' => Hash::make('vet123'),
            'rol' => 'veterinario',
            'especialidad' => 'Medicina general'
        ]);

        // Clientes
        Usuario::factory()->count(5)->create([
            'rol' => 'cliente',
        ]);
    }
}
