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
    Schema::create('vacunaciones', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('id_mascota');
        $table->unsignedBigInteger('id_vacuna');
        $table->unsignedBigInteger('id_veterinario');
        $table->date('fecha');
        $table->timestamps();

        $table->foreign('id_mascota')->references('id')->on('mascotas')->onDelete('cascade');
        $table->foreign('id_vacuna')->references('id')->on('vacunas')->onDelete('cascade');
        $table->foreign('id_veterinario')->references('id')->on('usuarios')->onDelete('cascade');
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vacunaciones');
    }
};
