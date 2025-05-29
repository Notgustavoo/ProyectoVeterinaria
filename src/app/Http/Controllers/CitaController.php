<?php

namespace App\Http\Controllers;

use App\Models\Cita;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class CitaController extends Controller
{
    public function index()
    {
        $citas = Cita::with(['mascota', 'veterinario'])->get();
        return response()->json($citas);
    }

    public function store(Request $request)
    {
        $request->validate([
            'fecha' => 'required|date',
            'hora' => 'required|string',
            'id_mascota' => 'required|exists:mascotas,id',
            'id_veterinario' => 'required|exists:usuarios,id',
            'motivo' => 'nullable|string',
            'estado' => 'nullable|in:' . implode(',', Cita::ESTADOS_VALIDOS),
        ]);

        $cita = Cita::create([
            'fecha' => $request->fecha,
            'hora' => $request->hora,
            'id_mascota' => $request->id_mascota,
            'id_veterinario' => $request->id_veterinario,
            'motivo' => $request->motivo,
            'estado' => $request->estado ?? 'pendiente',
        ]);

        return response()->json(['mensaje' => 'Cita registrada', 'cita' => $cita], 201);
    }

    public function update(Request $request, $id)
    {
        $cita = Cita::findOrFail($id);

        $request->validate([
            'fecha' => 'required|date',
            'hora' => 'required|string',
            'motivo' => 'required|string|max:255',
            'estado' => 'required|in:' . implode(',', Cita::ESTADOS_VALIDOS),
            'id_mascota' => 'required|exists:mascotas,id',
            'id_veterinario' => 'required|exists:usuarios,id',
        ]);

        $cita->update($request->all());

        return response()->json(['mensaje' => 'Cita actualizada']);
    }

    public function destroy($id)
    {
        Cita::destroy($id);
        return response()->json(['mensaje' => 'Cita eliminada']);
    }

    public function pendientes()
    {
        $total = Cita::where('estado', 'pendiente')->count();
        return response()->json(['total' => $total]);
    }

    public function delMes()
    {
        $inicio = Carbon::now()->startOfMonth();
        $fin = Carbon::now()->endOfMonth();

        $total = Cita::whereBetween('fecha', [$inicio, $fin])->count();

        return response()->json(['total' => $total]);
    }
    public function filtrarPorFechas(Request $request)
    {
        $request->validate([
            'inicio' => 'required|date',
            'fin' => 'required|date|after_or_equal:inicio',
        ]);
    
        $citas = Cita::with(['mascota', 'veterinario'])
            ->whereBetween('fecha', [$request->inicio, $request->fin])
            ->get();
    
        return response()->json($citas);
    }

    public function activasPorCliente($id)
    {
        $total = \App\Models\Cita::whereHas('mascota', function ($q) use ($id) {
            $q->where('id_dueño', $id);
        })->where('estado', '!=', 'cancelada')->count();

        return response()->json(['total' => $total]);
    }
    public function citasCliente(Request $request)
    {
        $userId = $request->user()->id;
    
        $citas = Cita::with(['mascota', 'veterinario'])
            ->whereHas('mascota', function ($query) use ($userId) {
                $query->where('id_dueño', $userId);
            })
            ->orderBy('fecha', 'desc')
            ->get();
    
        return response()->json($citas);
    }
    
}
