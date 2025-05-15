<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MascotaController extends Controller
{
    public function total()
    {
        $total = \App\Models\Mascota::count();
        return response()->json(['total' => $total]);
    }
    public function ultimas()
{
    $ultimas = \App\Models\Mascota::with('usuario')
        ->latest('created_at')
        ->take(5)
        ->get(['id', 'nombre', 'especie', 'raza', 'id_dueño']);

    return response()->json($ultimas);
}

}
