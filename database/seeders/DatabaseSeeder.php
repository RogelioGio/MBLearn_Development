<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Role;
use App\Models\User;
use App\Models\UserCredentials;
use App\Models\UserInfos;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        //     'password' => Hash::make('testing')
        // ]);
        // $roles = ['System Admin', 'Course Admin', 'Learner'];
        // foreach($roles as $role){
        //     Role::create([
        //         'role_name' => $role
        //     ]);
        // }

        $firstcreds = UserCredentials::create([
            'MBemail'=> 'hello@gmail.com',
            'password' => bcrypt('12345678'),
        ]);

        $firstinfos = UserInfos::create([
            'employeeID' => '01',
            'first_name' => 'Jericho',
            'last_name' => 'Ilanga',
            'middle_name'=> 'S.',
            'status'=> 'Active',
            'profile_image'=> 'https://ui-avatars.com/api/?name=System+Admin&color=ffffff&background=03045e&bold=true&size=400',
        ]);

        $firstcreds->userInfos()->save($firstinfos);
        $firstinfos->userCredentials()->associate($firstcreds);
        $firstinfos->save();

        UserInfos::factory(10)->create();
        Course::factory(10)->create();
    }
}
