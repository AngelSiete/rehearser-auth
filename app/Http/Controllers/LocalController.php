<?php

namespace App\Http\Controllers;

use App\Models\Local;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class LocalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $locals = Local::latest()->get();
        return Inertia::render('locals/index',['locals'=>$locals]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('locals/local-form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'hourlyRate' => 'required|numeric|min:0',
            'city' => 'nullable|string|max:255',
            'direction' => 'nullable|string|max:255',
            'musicianCapacity' => 'nullable|integer|min:0',
            'hasEquipment' => 'nullable|boolean',
        ]);

        Local::create($validated);

        return redirect()->route('locals.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Local $local)
    {
        return Inertia::render('locals/local',['local'=>$local]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Local $local)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Local $local)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Local $local)
    {
        //
    }
}
