<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * App\Models\BlogPost
 *
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string $content
 * @property string|null $excerpt
 * @property string|null $featured_image
 * @property string|null $meta_title
 * @property string|null $meta_description
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $published_at
 * @property int|null $category_id
 * @property int $created_by
 * @property int|null $updated_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\BlogCategory|null $category
 * @property-read \App\Models\User $creator
 * @property-read \App\Models\User|null $updater
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\BlogTag> $tags
 * @property-read int|null $tags_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPost newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPost newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPost query()
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPost whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPost whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPost whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPost whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPost whereExcerpt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPost whereFeaturedImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPost whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPost whereMetaDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPost whereMetaTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPost wherePublishedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPost whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPost whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPost whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPost whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPost whereUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogPost published()
 * @method static \Database\Factories\BlogPostFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class BlogPost extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'slug',
        'content',
        'excerpt',
        'featured_image',
        'meta_title',
        'meta_description',
        'status',
        'published_at',
        'category_id',
        'created_by',
        'updated_by',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'published_at' => 'datetime',
        'category_id' => 'integer',
        'created_by' => 'integer',
        'updated_by' => 'integer',
    ];

    /**
     * Get the category that owns the blog post.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(BlogCategory::class);
    }

    /**
     * Get the user who created the blog post.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the user who last updated the blog post.
     */
    public function updater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    /**
     * The tags that belong to the blog post.
     */
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(BlogTag::class, 'blog_post_tags');
    }

    /**
     * Scope a query to only include published blog posts.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePublished($query)
    {
        return $query->where('status', 'published')->whereNotNull('published_at');
    }
}