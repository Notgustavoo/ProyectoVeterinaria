<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class ServicioController extends Controller
{
    public function delMes()
    {
        $inicio = Carbon::now()->startOfMonth();
        $fin = Carbon::now()->endOfMonth();

        $total = DB::table('consulta_servicio')
            ->join('consultas', 'consulta_servicio.consulta_id', '=', 'consultas.id')
            ->whereBetween('consultas.created_at', [$inicio, $fin])
            ->count();

        return response()->json(['total' => $total]);
    }
}
