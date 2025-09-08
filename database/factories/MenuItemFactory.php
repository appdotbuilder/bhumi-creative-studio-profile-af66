<?php

namespace Database\Factories;

use App\Models\Menu;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MenuItem>
 */
class MenuItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'menu_id' => Menu::factory(),
            'parent_id' => null,
            'title' => fake()->words(2, true),
            'url' => fake()->url(),
            'target' => fake()->randomElement(['_self', '_blank']),
            'css_class' => fake()->boolean(30) ? fake()->word() : null,
            'sort_order' => fake()->numberBetween(0, 100),
            'is_active' => fake()->boolean(90),
        ];
    }

    /**
     * Indicate that the menu item is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}