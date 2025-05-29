<?php

namespace App\Http\Controllers;

use App\Models\Factura;
use App\Models\Consulta;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class FacturaController extends Controller
{
    public function index()
    {
        return Factura::with(['consulta', 'cliente'])->orderBy('fecha', 'desc')->get();
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'id_consulta' => 'required|exists:consultas,id'
        ]);

        $consulta = Consulta::with(['mascota.dueño', 'servicios'])->findOrFail($request->id_consulta);

        $total = $consulta->servicios->sum('precio');

        $factura = new Factura();
        $factura->id_consulta = $consulta->id;
        $factura->id_usuario = $consulta->mascota->dueño->id ?? null; // Usa la relación con el dueño

        if (!$factura->id_usuario) {
            return response()->json(['mensaje' => 'No se pudo obtener el dueño de la mascota'], 422);
        }

        $factura->fecha = now();
        $factura->total = $total;
        $factura->save();

        return response()->json([
            'mensaje' => 'Factura generada exitosamente',
            'factura' => $factura
        ], 201);
    }


    
    public function show($id)
    {
        $factura = Factura::with([
            'cliente',
            'consulta.servicios'
        ])->findOrFail($id);

        return response()->json($factura);
    }

    
    public function destroy($id)
    {
        $factura = Factura::findOrFail($id);
        $factura->delete();
        return response()->json(['mensaje' => 'Factura eliminada']);
    }
    public function ingresosMes()
    {
        $inicio = Carbon::now()->startOfMonth();
        $fin = Carbon::now()->endOfMonth();

        $ingresos = \App\Models\Factura::whereBetween('fecha', [$inicio, $fin])->sum('total');

        return response()->json(['ingresos' => $ingresos]);
    }

   

    public function totalPorCliente($id)
    {
        $total = \App\Models\Factura::where('id_usuario', $id)->count();
        return response()->json(['total' => $total]);
    }

    public function generarDesdeConsulta($idConsulta)
    {
        $consulta = Consulta::with(['veterinario', 'servicios', 'cita.mascota'])
            ->findOrFail($idConsulta);
    

        if ($consulta->factura) {
            return response()->json(['mensaje' => 'Ya existe una factura para esta consulta'], 400);
        }
    

        $total = $consulta->servicios->sum('precio');
    
        $factura = Factura::create([
            'id_consulta' => $consulta->id,
            'id_usuario' => $consulta->cita->mascota->id_dueño,
            'fecha' => now(),
            'total' => $total
        ]);
    
        return response()->json(['mensaje' => 'Factura generada exitosamente', 'factura' => $factura]);
    }

}
