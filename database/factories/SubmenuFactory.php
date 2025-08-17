<?php

namespace Database\Factories;

use App\Models\Menu;
use App\Models\Submenu;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Submenu>
 */
class SubmenuFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Submenu>
     */
    protected $model = Submenu::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->randomElement([
            'View All',
            'Create New', 
            'Import',
            'Export',
            'Reports',
            'Settings',
            'History',
            'Archive'
        ]);

        return [
            'menu_id' => Menu::factory(),
            'name' => $name,
            'slug' => Str::slug($name),
            'icon' => fake()->randomElement([
                'eye',
                'plus',
                'upload',
                'download',
                'document-text',
                'cog',
                'clock',
                'archive'
            ]),
            'route' => fake()->words(2, true) . '.index',
            'sort_order' => fake()->numberBetween(1, 10),
            'is_active' => true,
        ];
    }

    /**
     * Indicate that the submenu is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}