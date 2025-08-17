<?php

namespace Database\Factories;

use App\Models\Role;
use App\Models\Menu;
use App\Models\Submenu;
use App\Models\RoleMenuAccess;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RoleMenuAccess>
 */
class RoleMenuAccessFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\RoleMenuAccess>
     */
    protected $model = RoleMenuAccess::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'role_id' => Role::factory(),
            'menu_id' => Menu::factory(),
            'submenu_id' => null,
            'can_view' => true,
            'can_create' => fake()->boolean(50),
            'can_edit' => fake()->boolean(30),
            'can_delete' => fake()->boolean(20),
        ];
    }

    /**
     * Indicate that this is for a submenu.
     */
    public function forSubmenu(): static
    {
        return $this->state(fn (array $attributes) => [
            'submenu_id' => Submenu::factory(),
            'menu_id' => null,
        ]);
    }

    /**
     * Indicate full permissions.
     */
    public function fullAccess(): static
    {
        return $this->state(fn (array $attributes) => [
            'can_view' => true,
            'can_create' => true,
            'can_edit' => true,
            'can_delete' => true,
        ]);
    }

    /**
     * Indicate read-only permissions.
     */
    public function readOnly(): static
    {
        return $this->state(fn (array $attributes) => [
            'can_view' => true,
            'can_create' => false,
            'can_edit' => false,
            'can_delete' => false,
        ]);
    }
}