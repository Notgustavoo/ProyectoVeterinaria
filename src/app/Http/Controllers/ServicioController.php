<?php

namespace App\Http\Controllers;

use App\Models\Servicio;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class ServicioController extends Controller
{
    public function index()
    {
        return Servicio::all();
    }

    public function store(Request $request)
    {
        $servicio = Servicio::create($request->all());
        return response()->json($servicio, 201);
    }

    public function update(Request $request, $id)
    {
        $servicio = Servicio::findOrFail($id);
        $servicio->update($request->all());
        return response()->json($servicio);
    }

    public function destroy($id)
    {
        $servicio = Servicio::findOrFail($id);
        $servicio->delete();
        return response()->json(['mensaje' => 'Servicio eliminado']);
    }
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
