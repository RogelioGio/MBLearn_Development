<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('userInfo', function (Blueprint $table) {
            $table->unsignedBigInteger('user_credentials_id')->nullable();
            $table->foreign('user_credentials_id')->references('id')->on('userCredentials')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('userInfo', function (Blueprint $table) {
            $table->dropForeign(['user_credentials_id']);
            $table->dropColumn('user_credentials_id');
        });
    }
};
