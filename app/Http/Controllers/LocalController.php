<?php

namespace App\Http\Controllers;

use App\Models\Local;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LocalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
//        $locals = Local::latest()->get();
//
//        return Inertia::render('locals/index', ['locals' => $locals]);
        $query = Local::query();

        // 🔍 Parámetros de búsqueda
        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('city', 'like', "%{$search}%");
            });
        }
        if ($maxPrice = $request->input('maxPrice')) {
            $query->where('hourlyRate', '<=', $maxPrice);
        }
        if ($days = $request->input('days')) {
            $daysArray = is_array($days) ? $days : explode(',', $days);
            $query->where(function ($q) use ($daysArray) {
                foreach ($daysArray as $day) {
                    $q->whereJsonContains('available_weekdays', (int)$day);
                }
            });
        }

        $locals = $query
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('locals/index', [
            'locals' => $locals,
            'filters' => $request->only(['search','maxPrice','days']),
        ]);
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
            'available_weekdays' => ['required', 'array', 'min:1'],
            'available_weekdays.*' => ['integer', 'between:0,6'],
        ]);
        Local::create($validated);

        return redirect()->route('locals.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Local $local)
    {
        return Inertia::render('locals/local', ['local' => $local,
            'canEdit' => auth()->id() === $local->user_id, ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Local $local)
    {
        return Inertia::render('locals/local-form-edit', ['local' => $local]);
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
            'available_weekdays' => 'array',
        ]);

        $local->update([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'hourly_rate' => $validated['hourlyRate'],
            'city' => $validated['city'] ?? null,
            'direction' => $validated['direction'] ?? null,
            'musician_capacity' => $validated['musicianCapacity'] ?? null,
            'has_equipment' => $validated['hasEquipment'] ?? false,
            'available_weekdays' => $validated['available_weekdays'] ?? false,
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
