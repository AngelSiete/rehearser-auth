<?php

namespace App\Http\Controllers;

use App\Models\Propietario;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Local;

class PropietarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function dashboard()
    {
        $locals = Local::where('user_id', auth()->id())
            ->latest()->get();

        return Inertia::render('dashboardsByUsers/Owner', [
            'locals' => $locals,
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Propietario $propietario)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Propietario $propietario)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Propietario $propietario)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Propietario $propietario)
    {
        //
    }
}
