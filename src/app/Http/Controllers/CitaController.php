<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
class CitaController extends Controller
{
    public function pendientes()
    {
        $total = \App\Models\Cita::where('estado', 'pendiente')->count();
        return response()->json(['total' => $total]);
    }
    
    public function delMes()
    {
        $inicio = Carbon::now()->startOfMonth();
        $fin = Carbon::now()->endOfMonth();
    
        $total = \App\Models\Cita::whereBetween('fecha', [$inicio, $fin])->count();
    
        return response()->json(['total' => $total]);
    }
}
