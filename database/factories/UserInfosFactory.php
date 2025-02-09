<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserInfos>
 */
class UserInfosFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $role = $this->faker->randomElement(['Learner', 'System Admin', 'Course Admin']);
        $department = $this->faker->randomElement(['Human Resource', 'Internal Audit', 'IT Department', 'Finance', 'Operations Management']);
        $branch = $this->faker->randomElement(['Quezon Avenue', 'West Triangle', 'West Avenue', 'Novaliches', 'Tandang Sora', 'Kamuning', 'Valencia Hills']);
        return [
            'employeeID'=> '000003',
            'name' => fake()->name(),
            'role' => "Learner",
            'branch' => $branch,
            'title'=> fake()->title(),
            'city'=> fake()->city(),
            'status'=> 'Active',
            'department'=> $department,
            'user_credentials_id'=> '00045',
        ];
    }
}
