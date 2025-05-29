<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Consulta;
use App\Models\Cita;
class ConsultaController extends Controller
{
    public function store(Request $request)
{
    $request->validate([
        'id_cita' => 'required|exists:citas,id',
        'sintomas' => 'nullable|string',
        'diagnostico' => 'nullable|string',
        'tratamiento' => 'nullable|string',
        'medicamentos' => 'nullable|string',
        'servicios' => 'nullable|array',
        'servicios.*' => 'exists:servicios,id',
    ]);


    $cita = Cita::with('mascota')->findOrFail($request->id_cita);

    $consulta = Consulta::create([
        'id_cita' => $cita->id,
        'id_mascota' => $cita->id_mascota,
        'id_veterinario' => $cita->id_veterinario,
        'sintomas' => $request->sintomas,
        'diagnostico' => $request->diagnostico,
        'tratamiento' => $request->tratamiento,
        'medicamentos' => $request->medicamentos,
    ]);


    if ($request->has('servicios')) {
        $consulta->servicios()->sync($request->servicios);
    }

    return response()->json([
        'mensaje' => 'Consulta registrada correctamente',
        'consulta' => $consulta->load('servicios') 
    ], 201);
}

    public function index()
    {
        $consultas = Consulta::with(['mascota', 'veterinario', 'servicios'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($consulta) {
                $consulta->total = $consulta->servicios->sum('precio');
                return $consulta;
            });

        return response()->json($consultas);
    }

}
