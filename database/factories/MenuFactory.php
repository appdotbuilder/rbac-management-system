<?php

namespace Database\Factories;

use App\Models\Menu;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Menu>
 */
class MenuFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Menu>
     */
    protected $model = Menu::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->randomElement([
            'Dashboard',
            'Users', 
            'Reports',
            'Settings',
            'Analytics',
            'Projects',
            'Customers',
            'Orders',
            'Products',
            'Inventory'
        ]);

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'icon' => fake()->randomElement([
                'dashboard',
                'users',
                'chart-bar',
                'cog',
                'chart-line',
                'folder',
                'user-group',
                'shopping-bag',
                'cube',
                'archive'
            ]),
            'route' => Str::lower($name) . '.index',
            'sort_order' => fake()->numberBetween(1, 10),
            'is_active' => true,
        ];
    }

    /**
     * Indicate that the menu is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}