<?php

namespace App\Listeners;

use App\Events\LearnerProgressUpdate;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class UpdateEnrollmentStatus
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(LearnerProgressUpdate $event): void
    {
        $course = $event->lesson->course;
        $enrollment = $event->userInfos->enrollments()->where('course_id', $course->id)->first();
        $lesson_count = $course->lessons()->count();
        $completed_count = $event->userInfos->lessons()->where('course_id', $course->id)
            ->wherePivot('is_completed', true)->count();
        if($lesson_count > $completed_count){
            $enrollment->update(['enrollment_status' => 'ongoing']);
        } elseif($lesson_count == $completed_count){
            $enrollment->update(['enrollment_status' => 'finished']);
        }
    }
}