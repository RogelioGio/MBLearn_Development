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
        Schema::table('enrollments', function(Blueprint $table){
            $table->enum('enrollment_status', ['enrolled', 'ongoing', 'finished', 'late_finish'])->default('enrolled');
            $table->boolean('due_soon')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('enrollments', function(Blueprint $table){
            $table->dropColumn('enrollment_status');
            $table->boolean('due_soon');
        });
    }
};
