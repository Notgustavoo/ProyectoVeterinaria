<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('usuarios', function (Blueprint $table) {
        $table->id();
        $table->string('nombre', 100);
        $table->string('correo', 100)->unique();
        $table->string('contraseña');
        $table->enum('rol', ['admin', 'veterinario', 'cliente']);
        $table->string('telefono', 20)->nullable();
        $table->text('direccion')->nullable();
        $table->string('especialidad', 100)->nullable(); // Solo si es veterinario
        $table->timestamps(); // created_at y updated_at
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};
