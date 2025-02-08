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
        Schema::create('userCredentials', function (Blueprint $table) {
            $table->id();
            $table->string('employeeID',11);
            $table->string('name',225);
            $table->string('MBemail',225);
            $table->string('password');
            $table->enum('role', ['System Admin', 'Course Admin', 'Learner']);
            $table->integer('user_info_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('new_table_user_credentials');
    }
};
