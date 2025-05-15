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
    Schema::create('mascotas', function (Blueprint $table) {
        $table->id();
        $table->string('nombre', 100);
        $table->string('especie', 50)->nullable();
        $table->string('raza', 100)->nullable();
        $table->enum('sexo', ['macho', 'hembra']);
        $table->integer('edad')->nullable();
        $table->string('foto_url', 255)->nullable();
        $table->unsignedBigInteger('id_dueño');
        $table->timestamps();

        $table->foreign('id_dueño')->references('id')->on('usuarios')->onDelete('cascade');
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mascotas');
    }
};
