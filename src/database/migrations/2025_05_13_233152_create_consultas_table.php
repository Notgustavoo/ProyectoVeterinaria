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
    Schema::create('consultas', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('id_cita')->unique(); // 1:1 con cita
        $table->unsignedBigInteger('id_mascota');
        $table->unsignedBigInteger('id_veterinario');
        $table->text('sintomas')->nullable();
        $table->text('diagnostico')->nullable();
        $table->text('tratamiento')->nullable();
        $table->text('medicamentos')->nullable();
        $table->timestamps();

        $table->foreign('id_cita')->references('id')->on('citas')->onDelete('cascade');
        $table->foreign('id_mascota')->references('id')->on('mascotas')->onDelete('cascade');
        $table->foreign('id_veterinario')->references('id')->on('usuarios')->onDelete('cascade');
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultas');
    }
};
