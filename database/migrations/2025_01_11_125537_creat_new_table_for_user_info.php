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
        Schema::create('userInfo', function(Blueprint $table){
            $table->id();
            $table->string('employeeID',11);
            $table->string('name',225);
            $table->string('department')->nullable();
            $table->string('title',100)->nullable();
            $table->string('branch')->nullable();
            $table->string('city')->index();
            $table->enum('role',['Learner','System Admin','Course Admin'])->default('Learner');
            $table->enum('status',['Active','Inactive'])->default('Active');
            $table->string('profile_image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('userInfo');
    }

};
