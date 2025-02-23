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

        DB::table('userCredentials')->insert([
            'MBemail'=> 'hello@gmail.com',
            'password' => bcrypt('12345678'),
        ]);

        DB::table('userInfo')->insert([
            'employeeID' => '01',
            'first_name' => 'Jericho',
            'last_name' => 'Ilanga',
            'middle_initial'=> 'S.',
            'department'=> 'IT Department',
            'title'=> 'title',
            'branch'=> 'Novaliches',
            'city'=> 'Quezon City',
            'status'=> 'Active',
            'profile_image'=> 'https://ui-avatars.com/api/?name=System+Admin&color=ffffff&background=03045e&bold=true&size=400',
        ]);

        UserInfos::factory(10)->create();
    }
}
