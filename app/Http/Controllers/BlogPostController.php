<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBlogPostRequest;
use App\Http\Requests\UpdateBlogPostRequest;
use App\Models\BlogCategory;
use App\Models\BlogPost;
use App\Models\BlogTag;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BlogPostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = BlogPost::with(['category', 'creator', 'tags'])
            ->latest()
            ->paginate(10);

        return Inertia::render('cms/blog/posts/index', [
            'posts' => $posts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = BlogCategory::orderBy('name')->get();
        $tags = BlogTag::orderBy('name')->get();

        return Inertia::render('cms/blog/posts/create', [
            'categories' => $categories,
            'tags' => $tags,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBlogPostRequest $request)
    {
        $data = $request->validated();
        $data['slug'] = Str::slug($data['title']);
        $data['created_by'] = auth()->id();

        if ($data['status'] === 'published' && !isset($data['published_at'])) {
            $data['published_at'] = now();
        }

        $post = BlogPost::create($data);

        if (isset($data['tags'])) {
            $post->tags()->sync($data['tags']);
        }

        return redirect()->route('blog-posts.show', $post)
            ->with('success', 'Blog post created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(BlogPost $blogPost)
    {
        $blogPost->load(['category', 'creator', 'updater', 'tags']);

        return Inertia::render('cms/blog/posts/show', [
            'post' => $blogPost,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BlogPost $blogPost)
    {
        $categories = BlogCategory::orderBy('name')->get();
        $tags = BlogTag::orderBy('name')->get();
        $blogPost->load('tags');

        return Inertia::render('cms/blog/posts/edit', [
            'post' => $blogPost,
            'categories' => $categories,
            'tags' => $tags,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBlogPostRequest $request, BlogPost $blogPost)
    {
        $data = $request->validated();
        $data['slug'] = Str::slug($data['title']);
        $data['updated_by'] = auth()->id();

        if ($data['status'] === 'published' && !$blogPost->published_at) {
            $data['published_at'] = now();
        }

        $blogPost->update($data);

        if (isset($data['tags'])) {
            $blogPost->tags()->sync($data['tags']);
        }

        return redirect()->route('blog-posts.show', $blogPost)
            ->with('success', 'Blog post updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BlogPost $blogPost)
    {
        $blogPost->delete();

        return redirect()->route('blog-posts.index')
            ->with('success', 'Blog post deleted successfully.');
    }
}