<?php

namespace Database\Factories;

use App\Models\Mascota;
use Illuminate\Database\Eloquent\Factories\Factory;

class MascotaFactory extends Factory
{
    protected $model = Mascota::class;

    public function definition(): array
    {
        return [
            'nombre' => $this->faker->firstName(),
            'especie' => $this->faker->randomElement(['Perro', 'Gato', 'Conejo']),
            'raza' => $this->faker->word(),
            'sexo' => $this->faker->randomElement(['macho', 'hembra']),
            'edad' => $this->faker->numberBetween(1, 15),
            'foto_url' => $this->faker->imageUrl(640, 480, 'animals', true),
            'id_dueño' => null // lo asignaremos manualmente desde el seeder
        ];
    }
}
