<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Local extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'city', 'direction', 'musicianCapacity', 'hasEquipment', 'description', 'hourlyRate', 'available_weekdays'];
    protected $casts = [
        'available_weekdays' => 'array',
        'hasEquipment' => 'boolean',
    ];

    protected static function booted()
    {
        static::creating(function ($local) {
            // Automatically set user_id to logged-in user
            if (auth()->check()) {
                $local->user_id = auth()->id();
            }
        });
    }
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
    // Relationship
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
