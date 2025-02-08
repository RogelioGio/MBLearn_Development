<?php

namespace Database\Seeders;

use App\Models\User;
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

        // DB::table('userCredentials')->insert([
        //     'employeeID'=> '01',
        //     'name' => 'Jericho',
        //     'MBemail'=> 'hello@gmail.com',
        //     'password' => bcrypt('12345678'),
        //     'role'=> 'System Admin',
        //     'user_info_id' => '01',
        // ]);

        // DB::table('userInfo')->insert([
        //     'employeeID' => '01',
        //     'name'=> 'Jericho',
        //     'department'=> 'IT Department',
        //     'title'=> 'title',
        //     'branch'=> 'Novaliches',
        //     'city'=> 'Quezon City',
        //     'role'=> 'System Admin',
        //     'status'=> 'Active',
        //     'profile_image'=> 'https://ui-avatars.com/api/?name=System+Admin&color=ffffff&background=03045e&bold=true&size=400',
        //     'user_credentials_id' => 01
        // ]);

        UserInfos::factory(10)->create();
    }
}
