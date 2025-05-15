<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{
    // Registrar cliente (desde el formulario público)
    public function registrarCliente(Request $request)
    {
        // Validación de datos
        $request->validate([
            'nombre' => 'required|string|max:255',
            'correo' => 'required|email|unique:usuarios,correo',
            'contraseña' => [
                'required',
                'string',
                'min:8',
                'regex:/[A-Z]/',     // al menos una mayúscula
                'regex:/[0-9]/',     // al menos un número
                'regex:/[\W]/'       // al menos un carácter especial
            ],
        ], [
            'contraseña.regex' => 'La contraseña debe incluir una mayúscula, un número y un carácter especial.'
        ]);

        // Crear nuevo cliente
        $usuario = new Usuario();
        $usuario->nombre = $request->nombre;
        $usuario->correo = $request->correo;
        $usuario->contraseña = bcrypt($request->contraseña);
        $usuario->rol = 'cliente'; // asignación por defecto

        $usuario->save();

        return response()->json(['mensaje' => 'Cliente registrado exitosamente'], 201);
    }

    // Login
    public function login(Request $request)
    {
        $request->validate([
            'correo' => 'required|email',
            'contraseña' => 'required'
        ]);

        $usuario = Usuario::where('correo', $request->correo)->first();

        if (!$usuario || !Hash::check($request->contraseña, $usuario->contraseña)) {
            return response()->json(['mensaje' => 'Credenciales incorrectas'], 401);
        }

        return response()->json([
            'mensaje' => 'Login exitoso',
            'usuario' => [
                'id' => $usuario->id,
                'nombre' => $usuario->nombre,
                'rol' => $usuario->rol
            ]
        ]);
    }

    // Métrica: clientes con mascotas
    public function clientesActivos()
    {
        $total = Usuario::where('rol', 'cliente')
            ->whereHas('mascotas')
            ->count();

        return response()->json(['total' => $total]);
    }
}
