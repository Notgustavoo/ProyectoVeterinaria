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
    Schema::create('facturas', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('id_consulta');
        $table->unsignedBigInteger('id_usuario'); // Cliente
        $table->date('fecha');
        $table->decimal('total', 10, 2);
        $table->timestamps();

        $table->foreign('id_consulta')->references('id')->on('consultas')->onDelete('cascade');
        $table->foreign('id_usuario')->references('id')->on('usuarios')->onDelete('cascade');
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('facturas');
    }
};
