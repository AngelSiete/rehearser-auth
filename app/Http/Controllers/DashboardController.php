<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        if ($user->userType === 'owner') {
            return redirect()->route('owner.dashboard');
        }

        return Inertia::render('dashboardsByUsers/User', [
            'bookings' => $user->bookings()
                ->with('local')
                ->orderBy('booking_date', 'desc')
                ->get()
                ->toArray(),
            'auth' => [
                'user' => [
                    'name' => $user->name,
                    'email' => $user->email,
                ],
            ],
        ]);
    }

    public function userDashboard()
    {
        $user = auth()->user();

        return Inertia::render('dashboardsByUsers/User', [
            'bookings' => $user->bookings()
                ->with('local')
                ->orderBy('booking_date', 'desc')
                ->get()
                ->toArray(),
            'auth' => [
                'user' => [
                    'name' => $user->name,
                    'email' => $user->email,
                ],
            ],
        ]);
    }
}
