<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('userinfo', function (Blueprint $table) {
              // Add the column as nullable first
        $table->string('employeeID')->nullable();
    });

    // Populate the column with default values (or appropriate values for existing rows)
    DB::table('userinfo')->update(['employeeID' => 'default_value']);

    Schema::table('userinfo', function (Blueprint $table) {
        // Alter the column to make it NOT NULL
        $table->string('employeeID')->nullable(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('userinfo', function (Blueprint $table) {
            $table->dropColumn('new_column_name');
        });
    }
};
