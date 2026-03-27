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
            'available_weekdays' => 'array',
        ]);
        Local::create($validated);

        return redirect()->route('locals.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Local $local)
    {
        return Inertia::render('locals/local',['local'=>$local,
            'canEdit' => auth()->id() === $local->user_id,]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Local $local)
    {
        return Inertia::render('locals/local-form-edit', ['local'=>$local]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Local $local)
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

        $local->update([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'hourly_rate' => $validated['hourlyRate'],

            'city' => $validated['city'] ?? null,
            'direction' => $validated['direction'] ?? null,
            'musician_capacity' => $validated['musicianCapacity'] ?? null,
            'has_equipment' => $validated['hasEquipment'] ?? false,
        ]);

        return redirect()->route('locals.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Local $local)
    {
        //
    }
}
