<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;
use App\Models\Cita;
use App\Models\Factura;

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
    public function listarDuenos()
    {
        $duenos = Usuario::where('rol', 'cliente')
            ->select('id', 'nombre', 'correo', 'telefono', 'direccion')
            ->get();

        return response()->json($duenos);
    }
    public function registrarDueno(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'correo' => 'required|email|unique:usuarios,correo',
            'contraseña' => [
                'required',
                'string',
                'min:8',
                'regex:/[A-Z]/',        // al menos una mayúscula
                'regex:/[0-9]/',        // al menos un número
                'regex:/[^A-Za-z0-9]/'  // al menos un símbolo
            ],
            'telefono' => 'nullable|string',
            'direccion' => 'nullable|string',
        ]);
    
        $usuario = new Usuario();
        $usuario->nombre = $request->nombre;
        $usuario->correo = $request->correo;
        $usuario->contraseña = bcrypt($request->contraseña);
        $usuario->rol = 'cliente';
        $usuario->telefono = $request->telefono;
        $usuario->direccion = $request->direccion;
        $usuario->save();
    
        return response()->json(['mensaje' => 'Dueño registrado exitosamente'], 201);
    }
    public function actualizarDueno(Request $request, $id)
    {
        $usuario = Usuario::findOrFail($id);


        $request->validate([
            'nombre' => 'required|string|max:255',
            'correo' => 'required|email|unique:usuarios,correo,' . $id,
            'contraseña' => [
                'nullable',
                'string',
                'min:8',
                'regex:/[A-Z]/',       
                'regex:/[0-9]/',       
                'regex:/[^A-Za-z0-9]/'  
            ],
            'telefono' => 'nullable|string',
            'direccion' => 'nullable|string',
        ], [
            'contraseña.regex' => 'La contraseña debe incluir una mayúscula, un número y un carácter especial.'
        ]);


        $usuario->nombre = $request->nombre;
        $usuario->correo = $request->correo;
        $usuario->telefono = $request->telefono;
        $usuario->direccion = $request->direccion;


        if ($request->filled('contraseña')) {
            $usuario->contraseña = bcrypt($request->contraseña);
        }

        $usuario->save();

        return response()->json(['mensaje' => 'Dueño actualizado correctamente']);
    }
    public function eliminarDueno($id)
    {
        $dueno = Usuario::find($id);
    
        if (!$dueno || $dueno->rol !== 'cliente') {
            return response()->json(['mensaje' => 'Dueño no encontrado'], 404);
        }
    
        $dueno->delete();
    
        return response()->json(['mensaje' => 'Dueño eliminado correctamente']);
    }
    public function listarVeterinarios()
    {
        $veterinarios = Usuario::where('rol', 'veterinario')
            ->select('id', 'nombre')
            ->get();

        return response()->json($veterinarios);
    }
    public function citasCliente($id)
    {
        $citas = Cita::with(['veterinario', 'mascota'])
        ->whereHas('mascota', function ($query) use ($id) {
            $query->where('id_dueño', $id);
        })
        ->orderBy('fecha', 'desc')
        ->get();
        return response()->json($citas);
    }
    public function facturasCliente($id)
    {
        $facturas = Factura::with('consulta.veterinario')
            ->where('id_usuario', $id)
            ->orderBy('fecha', 'desc')
            ->get();
    
        return response()->json($facturas);
    }
    
}
