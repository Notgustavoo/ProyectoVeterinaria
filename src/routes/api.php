<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\MascotaController;
use App\Http\Controllers\CitaController;
use App\Http\Controllers\ServicioController;
use App\Http\Controllers\FacturaController;
use App\Http\Controllers\ReporteController;
use App\Http\Controllers\ConsultaController;


Route::post('/registro-cliente', [UsuarioController::class, 'registrarCliente']);
Route::post('/login', [UsuarioController::class, 'login']);
Route::get('/mascotas/total', [MascotaController::class, 'total']);
Route::get('/clientes/activos', [UsuarioController::class, 'clientesActivos']);
Route::get('/citas/pendientes', [CitaController::class, 'pendientes']);
Route::get('/citas/mes', [CitaController::class, 'delMes']);
Route::get('/mascotas/ultimas', [MascotaController::class, 'ultimas']);
Route::get('/servicios/mes', [ServicioController::class, 'delMes']);
Route::get('/facturas/ingresos-mes', [FacturaController::class, 'ingresosMes']);
Route::get('/facturas', [FacturaController::class, 'index']);
Route::get('/reportes/citas', [ReporteController::class, 'citas']);

Route::get('/duenos', [UsuarioController::class, 'listarDuenos']);
Route::post('/duenos', [UsuarioController::class, 'registrarDueno']);
Route::put('/duenos/{id}', [UsuarioController::class, 'actualizarDueno']);
Route::delete('/duenos/{id}', [UsuarioController::class, 'eliminarDueno']);
Route::get('/mascotas', [MascotaController::class, 'index']);
Route::post('/mascotas', [MascotaController::class, 'store']);
Route::put('/mascotas/{id}', [MascotaController::class, 'update']);
Route::delete('/mascotas/{id}', [MascotaController::class, 'destroy']);
Route::get('/citas', [CitaController::class, 'index']);
Route::post('/citas', [CitaController::class, 'store']);
Route::put('/citas/{id}', [CitaController::class, 'update']);
Route::delete('/citas/{id}', [CitaController::class, 'destroy']);
Route::get('/veterinarios', [UsuarioController::class, 'listarVeterinarios']);
Route::apiResource('servicios', ServicioController::class);
Route::get('/facturas/{id}', [FacturaController::class, 'show']);
Route::post('/citas/filtrar', [CitaController::class, 'filtrarPorFechas']);
Route::post('/reportes/ingresos', [ReporteController::class, 'ingresos']);
Route::get('/reportes/ingresos', [ReporteController::class, 'ingresos']);
Route::get('/reportes/citas-por-estado', [ReporteController::class, 'citasPorEstado']);
Route::get('/reportes/citas-veterinario', [ReporteController::class, 'citasPorVeterinario']);
Route::get('/cliente/{id}/mascotas/total', [MascotaController::class, 'totalPorCliente']);
Route::get('/cliente/{id}/citas/activas', [CitaController::class, 'activasPorCliente']);
Route::get('/cliente/{id}/facturas/total', [FacturaController::class, 'totalPorCliente']);
Route::get('/cliente/{id}/mascotas', [MascotaController::class, 'mascotasPorCliente']);
Route::middleware('auth:sanctum')->get('/cliente/citas', [CitaController::class, 'citasCliente']);
Route::get('/cliente/{id}/citas', [UsuarioController::class, 'citasCliente']);
Route::get('/cliente/{id}/facturas', [UsuarioController::class, 'facturasCliente']);
Route::post('/facturas/consulta/{id}', [FacturaController::class, 'generarDesdeConsulta']);
Route::get('/consultas', [ConsultaController::class, 'index']);
Route::post('/consultas', [ConsultaController::class, 'store']);
Route::post('/facturas', [FacturaController::class, 'store']);
Route::post('/api/login', [UsuarioController::class, 'login']);


