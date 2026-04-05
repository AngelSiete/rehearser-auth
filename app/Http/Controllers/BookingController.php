<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Local;
use Carbon\Carbon;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Local $local)
    {
        return Inertia::render('locals/booking', [
            'local' => $local,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Local $local)
    {
        $validated = $request->validate([
            'booking_date' => ['required', 'date', 'after_or_equal:today'],
        ]);

        $date = Carbon::parse($validated['booking_date']);

        // ✅ Check weekday availability
        if (! in_array($date->dayOfWeek, $local->available_weekdays)) {
            return back()->withErrors([
                'booking_date' => 'This space is not available on this day.',
            ]);
        }

        // ✅ Check for existing booking
        $alreadyBooked = $local->bookings()
            ->where('booking_date', $date->toDateString())
            ->exists();

        if ($alreadyBooked) {
            return back()->withErrors([
                'booking_date' => 'This day is already booked.',
            ]);
        }

        // ✅ Create booking
        $local->bookings()->create([
            'user_id' => auth()->id(),
            'booking_date' => $date->toDateString(),
        ]);

        return back()->with('success', 'Booking confirmed!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $booking)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Booking $booking)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Booking $booking)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking)
    {
        //
    }
}
