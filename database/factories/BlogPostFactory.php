<?php

namespace Database\Factories;

use App\Models\BlogCategory;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BlogPost>
 */
class BlogPostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(4);
        $isPublished = fake()->boolean(70);
        
        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'content' => fake()->paragraphs(8, true),
            'excerpt' => fake()->paragraph(),
            'featured_image' => fake()->imageUrl(800, 400, 'business'),
            'meta_title' => $title,
            'meta_description' => fake()->sentence(),
            'status' => $isPublished ? 'published' : 'draft',
            'published_at' => $isPublished ? fake()->dateTimeBetween('-6 months', 'now') : null,
            'category_id' => BlogCategory::factory(),
            'created_by' => User::factory(),
            'updated_by' => fake()->boolean(50) ? User::factory() : null,
        ];
    }

    /**
     * Indicate that the blog post is published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
            'published_at' => fake()->dateTimeBetween('-6 months', 'now'),
        ]);
    }

    /**
     * Indicate that the blog post is a draft.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'draft',
            'published_at' => null,
        ]);
    }
}