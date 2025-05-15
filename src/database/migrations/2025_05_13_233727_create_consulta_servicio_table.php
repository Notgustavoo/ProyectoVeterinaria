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
    Schema::create('consulta_servicio', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('consulta_id');
        $table->unsignedBigInteger('servicio_id');
        $table->timestamps();

        $table->foreign('consulta_id')->references('id')->on('consultas')->onDelete('cascade');
        $table->foreign('servicio_id')->references('id')->on('servicios')->onDelete('cascade');
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consulta_servicio');
    }
};
