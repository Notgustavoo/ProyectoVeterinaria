<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class FacturaController extends Controller
{

    public function ingresosMes()
    {
        $inicio = Carbon::now()->startOfMonth();
        $fin = Carbon::now()->endOfMonth();

        $ingresos = \App\Models\Factura::whereBetween('fecha', [$inicio, $fin])->sum('total');

        return response()->json(['ingresos' => $ingresos]);
    }


}
