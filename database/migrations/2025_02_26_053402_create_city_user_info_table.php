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
        Schema::create('city_user_info', function (Blueprint $table) {
            $table->id();
            $table->foreignId('city_id')->constrained('cities', 'id')->cascadeOnDelete();
            $table->foreignId('userinfo_id')->constrained('userInfo', 'id')->cascadeOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('city_user_info');
    }
};
