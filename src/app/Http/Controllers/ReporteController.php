<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cita;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Models\Factura;
use Illuminate\Http\JsonResponse;



class ReporteController extends Controller
{
    // Reporte de citas con filtros dinámicos
    public function citas(Request $request)
    {
        $query = Cita::with(['mascota', 'veterinario']);

        if ($request->filled('fecha_inicio') && $request->filled('fecha_fin')) {
            $query->whereBetween('fecha', [$request->fecha_inicio, $request->fecha_fin]);
        }

        if ($request->filled('estado')) {
            $query->where('estado', $request->estado);
        }

        if ($request->filled('veterinario_id')) {
            $query->where('id_veterinario', $request->veterinario_id);
        }

        $citas = $query->orderBy('fecha', 'desc')->get();

        return response()->json($citas);
    }

    public function ingresos(Request $request)
    {
        $request->validate([
            'inicio' => 'required|date',
            'fin' => 'required|date|after_or_equal:inicio',
        ]);

        $inicio = $request->inicio;
        $fin = $request->fin;

        $facturas = Factura::with('cliente')
            ->whereBetween('fecha', [$inicio, $fin])
            ->get();

        $total = $facturas->sum('total');

        $data = $facturas->map(function ($f) {
            return [
                'id' => $f->id,
                'cliente' => $f->cliente?->nombre ?? 'Sin cliente',
                'fecha' => $f->fecha,
                'total' => $f->total,
            ];
        });

        return response()->json([
            'facturas' => $data,
            'ingresos' => $total,
        ]);
    }

    public function citasPorEstado(): JsonResponse
    {
        $estadisticas = Cita::select('estado', DB::raw('COUNT(*) as total'))
            ->groupBy('estado')
            ->get();

        return response()->json($estadisticas);
    }    
    public function citasPorVeterinario()
    {
        $citas = \App\Models\Cita::selectRaw('usuarios.nombre, COUNT(*) as total')
            ->join('usuarios', 'citas.id_veterinario', '=', 'usuarios.id')
            ->where('estado', 'realizada')
            ->groupBy('usuarios.nombre')
            ->orderByDesc('total')
            ->get();
    
        return response()->json($citas);
    }
    
}
