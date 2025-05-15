<?php

namespace App\Console\Commands;

use App\Models\Enrollment;
use Carbon\Carbon;
use Illuminate\Console\Command;

class checkEnrollmentDeadlines extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:check-enrollment-deadlines';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Checks enrollment deadlines';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $enrollment = Enrollment::all();
        foreach($enrollment as $enroll){
            $end = Carbon::parse($enroll->end_date);
            $in3days = Carbon::now()->addDays(3);
            if($end->lessThanOrEqualTo($in3days)){
                $enroll->update(['due_soon' => true]);
            }
        }
    }
}
