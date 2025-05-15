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
    Schema::create('citas', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('id_mascota');
        $table->unsignedBigInteger('id_veterinario')->nullable(); // se asigna después
        $table->date('fecha');
        $table->time('hora');
        $table->text('motivo')->nullable();
        $table->enum('estado', ['pendiente', 'confirmada', 'rechazada'])->default('pendiente');
        $table->timestamps();

        $table->foreign('id_mascota')->references('id')->on('mascotas')->onDelete('cascade');
        $table->foreign('id_veterinario')->references('id')->on('usuarios')->onDelete('set null');
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('citas');
    }
};
