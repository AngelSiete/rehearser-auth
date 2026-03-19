<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('locals', function (Blueprint $table) {
            $table->id()->autoIncrement()->unique();
            $table->timestamps();
            $table->string('name');
            $table->string('city');
            $table->string('direction');
            $table->integer('musicianCapacity');
            $table->boolean('hasEquipment');
            $table->text('description');
            $table->integer('hourlyRate');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('locals');
    }
};
