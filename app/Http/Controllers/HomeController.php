<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\Page;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the landing page.
     */
    public function index()
    {
        $featuredPosts = BlogPost::published()
            ->with(['category', 'creator'])
            ->latest('published_at')
            ->limit(3)
            ->get();

        $pages = Page::published()
            ->orderBy('sort_order')
            ->get(['title', 'slug']);

        return Inertia::render('welcome', [
            'featuredPosts' => $featuredPosts,
            'pages' => $pages,
        ]);
    }
}