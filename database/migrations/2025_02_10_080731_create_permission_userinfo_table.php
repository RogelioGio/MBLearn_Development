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
        Schema::create('permission_userinfo', function (Blueprint $table) {
            $table->id();
            $table->foreignId('userinfo_id')->constrained('userInfo', 'id')->cascadeOnDelete();
            $table->foreignId('permission_id')->constrained('permissions', 'id')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permission_userinfo');
    }
};
