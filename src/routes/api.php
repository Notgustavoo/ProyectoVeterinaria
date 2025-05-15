<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\MascotaController;
use App\Http\Controllers\CitaController;
use App\Http\Controllers\ServicioController;
use App\Http\Controllers\FacturaController;

Route::post('/registro-cliente', [UsuarioController::class, 'registrarCliente']);
Route::post('/login', [UsuarioController::class, 'login']);
Route::get('/mascotas/total', [MascotaController::class, 'total']);
Route::get('/clientes/activos', [UsuarioController::class, 'clientesActivos']);
Route::get('/citas/pendientes', [CitaController::class, 'pendientes']);
Route::get('/citas/mes', [CitaController::class, 'delMes']);
Route::get('/mascotas/ultimas', [MascotaController::class, 'ultimas']);
Route::get('/servicios/mes', [ServicioController::class, 'delMes']);
Route::get('/facturas/ingresos-mes', [FacturaController::class, 'ingresosMes']);

