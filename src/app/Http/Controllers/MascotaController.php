<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mascota;

class MascotaController extends Controller
{

    public function total()
    {
        $total = Mascota::count();
        return response()->json(['total' => $total]);
    }


    public function ultimas()
    {
        $ultimas = Mascota::with('usuario')
            ->latest('created_at')
            ->take(5)
            ->get(['id', 'nombre', 'especie', 'raza', 'id_dueño']);

        return response()->json($ultimas);
    }

    public function index(Request $request)
    {
        if ($request->has('cliente')) {

            $mascotas = Mascota::where('id_dueño', $request->cliente)->with('usuario:id,nombre')->get();
        } else {

            $mascotas = Mascota::with('usuario:id,nombre')->get();
        }

        return response()->json($mascotas);
    }


    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'especie' => 'required|string|max:255',
            'raza' => 'nullable|string|max:255',
            'sexo' => 'nullable|string',
            'edad' => 'nullable|integer',
            'foto_url' => 'nullable|string',
            'id_dueño' => 'required|exists:usuarios,id',
        ]);

        $mascota = Mascota::create($request->all());

        return response()->json(['mensaje' => 'Mascota registrada', 'mascota' => $mascota], 201);
    }

    public function update(Request $request, $id)
    {
        $mascota = Mascota::findOrFail($id);

        $request->validate([
            'nombre' => 'required|string|max:255',
            'especie' => 'required|string|max:255',
            'raza' => 'nullable|string|max:255',
            'sexo' => 'nullable|string',
            'edad' => 'nullable|integer',
            'foto_url' => 'nullable|string',
            'id_dueño' => 'required|exists:usuarios,id',
        ]);

        $mascota->update($request->all());

        return response()->json(['mensaje' => 'Mascota actualizada', 'mascota' => $mascota]);
    }

    
    public function destroy($id)
    {
        $mascota = Mascota::findOrFail($id);
        $mascota->delete();

        return response()->json(['mensaje' => 'Mascota eliminada']);
    }

    public function totalPorCliente($id)
    {
        $total = Mascota::where('id_dueño', $id)->count();
        return response()->json(['total' => $total]);
    }
    public function mascotasPorCliente($id)
    {
        $mascotas = \App\Models\Mascota::where('id_dueño', $id)->get();
        return response()->json($mascotas);
    }
    
}
