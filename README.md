# 🐾 Proyecto Veterinaria

Sistema de control de mascotas para una veterinaria. Desarrollado con **Laravel, MySQL y Docker**, pensado para gestionar:

- Usuarios con roles (admin, veterinario, cliente)
- Mascotas
- Consultas médicas
- Citas veterinarias
- Vacunaciones
- Servicios prestados y facturación
- Reportes exportables (PDF/Excel)

---

## 🚀 Stack utilizado

- **Laravel 10+**
- **MySQL 8**
- **Docker + Docker Compose**
- **phpMyAdmin** (gestión de base de datos)
- **Blade + Tailwind CSS**

---

## ⚙️ Instrucciones de uso

### 1. Clonar repositorio

```bash
git clone https://github.com/notgustavoo/ProyectoVeterinaria.git
cd ProyectoVeterinaria
```

### 2. Iniciar contenedores

```bash
docker compose up -d --build
```

### 3. Instalar Laravel (si no está instalado)

```bash
docker run --rm -v $(pwd)/src:/app composer create-project laravel/laravel .
```

### 4. Configurar `.env`

Copiar `.env.example` como `.env` y actualizar conexión a base de datos:

```
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=veterinaria
DB_USERNAME=laravel
DB_PASSWORD=laravel123
```

### 5. Ejecutar migraciones

```bash
docker exec -it laravel_app php artisan migrate
```

---

## 🌐 Accesos

| Servicio     | URL                       |
|--------------|---------------------------|
| Laravel App  | http://localhost:8000     |
| phpMyAdmin   | http://localhost:8081     |

> Usuario MySQL: `laravel`  
> Contraseña: `laravel123`

---

## 🛡️ Roles del sistema

- `admin` → controla usuarios, reportes, servicios
- `veterinario` → atiende mascotas, registra vacunas, genera facturas
- `cliente` → agenda citas y ve historial de su mascota

---

## 📦 Extras planificados

- Subida de fotos de mascota
- Notificaciones por email
- Exportación de reportes
- Responsive completo con Tailwind

---

## 📸 Capturas

*(Aquí podés poner capturas del panel admin, listado de mascotas, etc)*

---

## 🤝 Licencia

Proyecto universitario desarrollado por **Gustavo Villarroel** — 2025.