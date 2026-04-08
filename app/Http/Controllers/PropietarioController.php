<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Local;
use App\Models\Propietario;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
        $ownerId = auth()->id();
        $locals = Local::where('user_id', $ownerId)->latest()->get();
        $bookings = Booking::whereIn('local_id', $locals->pluck('id'))
            ->with('local', 'user') //
            ->orderBy('booking_date', 'asc')
            ->get();

        return Inertia::render('dashboardsByUsers/Owner', [
            'locals' => $locals,
            'bookings' => $bookings,
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
