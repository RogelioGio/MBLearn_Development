<?php

namespace App\Models;

use App\Observers\UserInfosObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Laravel\Scout\Searchable;
use Znck\Eloquent\Relations\BelongsToThrough;
use Illuminate\Notifications\Notifiable;

#[ObservedBy([UserInfosObserver::class])]
class UserInfos extends Model
{
    use HasFactory, Searchable;
    use Notifiable;

    /**
     * The table associated with the model.
     */
    protected $table = 'userInfo'; // Replace with your actual table name

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'employeeID',
        'first_name',
        'last_name',
        'middle_name',
        'name_suffix',
        'status',
        'profile_image',
        'user_credentials_id',
    ];

    protected $touches = ['userCredentials', 'roles', 'branch', 'department', 'division', 'title', 'section'];

    public function userCredentials(): BelongsTo{
        return $this->belongsTo(UserCredentials::class, 'user_credentials_id', 'id');
    }

    //Functions for relationships
    public function enrollments(): HasMany{
        return $this->hasMany(Enrollment::class, 'user_id', 'id');
    }

    //TODO change name to be more clear, for knowing who made the enrollment
    public function enrollings(): HasMany{
        return $this->hasMany(Enrollment::class, 'enroller_id');
    }


    public function lessons(): BelongsToMany{
        return $this->belongsToMany(Lesson::class, 'learner_progress', 'userInfo_id', 'lesson_id')
            ->withPivot('is_completed')
            ->withTimestamps();
    }

    public function lessonsCompletedCount($courseId): int{
        return $this->lessons()->where('course_id', $courseId)->wherePivot('is_completed', true)->count();
    }

    public function statusEnrollings(){
        return $this->enrollings()->with('course')->get()->map(function ($enrollment){
            $courses = $enrollment->course;
            $courses->enrollment_status = $enrollment->enrollment_status;
            $courses->due_soon = $enrollment->due_soon;
            return $courses;
        });
    }

    public function addedCourses(): HasMany{
        return $this->hasMany(Course::class, 'system_admin_id');
    }

    public function assignedCourses(): BelongsToMany{
        return $this->belongsToMany(Course::class, 'course_userinfo_assignment', 'user_id', 'course_id')
            ->using(CourseUserAssigned::class)->withPivot('id');
    }

    public function roles(): BelongsToMany{
        return $this->belongsToMany(Role::class, 'role_userinfo', 'userinfo_id', 'role_id');
    }

    public function permissions(): BelongsToMany{
        return $this->belongsToMany(Permission::class, 'permission_userinfo', 'userinfo_id', 'permission_id');
    }

    use \Staudenmeir\EloquentHasManyDeep\HasRelationships;
    public function permissionsRole():\Staudenmeir\EloquentHasManyDeep\HasManyDeep{
        return $this->hasManyDeepFromRelations($this->roles(), (new Role())->permissions());
    }

    public function branch(): BelongsTo{
        return $this->belongsTo(Branch::class);
    }

    public function title():BelongsTo{
        return $this->belongsTo(Title::class);
    }

    use \Znck\Eloquent\Traits\BelongsToThrough;
    public function city():BelongsToThrough{
        return $this->belongsToThrough(City::class, Branch::class);
    }

    public function department():BelongsTo{
        return $this->belongsTo(Department::class);
    }

    public function enrolledCourses(): HasManyThrough{
        return $this->hasManyThrough(Course::class, Enrollment::class, 'user_id', 'id', 'id', 'course_id');
    }

    public function division(): BelongsTo{
        return $this->belongsTo(Division::class);
    }

    public function subGroup(): BelongsTo{
        return $this->belongsTo(Subgroup::class, 'group_id', 'id');
    }

    public function section():BelongsTo{
        return $this->belongsTo(Section::class);
    }

    public function profileImages(): HasMany{
        return $this->hasMany(ProfileImage::class, 'user_id', 'id');
    }

    public function createdCourses(): HasMany{
        return $this->hasMany(Course::class, 'author_id', 'id');
    }

    public function toSearchableArray()
    {
        $array = $this->toArray();
        $array['first_name'] = $this->first_name ?? null;
        $array['last_name'] = $this->last_name ?? null;
        $array['middle_name'] = $this->middle_name ?? null;
        $array['title_name'] = $this->title->title_name ?? null;;
        $array['department_name'] = $this->department->department_name ?? null;
        $array['section_name'] = $this->section->section_name ?? null;
        $array['division_name'] = $this->division->division_name ?? null;
        $array['branch_name'] = $this->branch->branch_name ?? null;
        $array['status'] = $this->status ?? null;
        $array['role_name'] = $this->roles->map(function ($data){
            return $data['role_name'];
        })->toArray();

        // Customize the array as needed
        return $array;
    }
}
