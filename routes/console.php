<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Schedule::command('app:check-enrollment-deadlines')
    ->timezone('Asia/Hong_Kong')
    ->everyMinute();

Schedule::call(function(){
    Log::info('Scheduled task executed successfully!');
})->everyMinute();
