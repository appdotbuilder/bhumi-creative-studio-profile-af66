import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Head, Link, router } from '@inertiajs/react';

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    status: string;
    published_at?: string;
    category?: {
        name: string;
        color: string;
    };
    creator: {
        name: string;
    };
    tags: Array<{
        name: string;
        color: string;
    }>;
}

interface Props {
    posts: {
        data: BlogPost[];
        current_page: number;
        last_page: number;
    };
    [key: string]: unknown;
}

export default function BlogPostsIndex({ posts }: Props) {
    const handleDelete = (post: BlogPost) => {
        if (confirm(`Are you sure you want to delete "${post.title}"?`)) {
            router.delete(route('blog-posts.destroy', post.id));
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'Not published';
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <AppShell>
            <Head title="📝 Blog Management" />
            
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">📝 Blog Management</h1>
                        <p className="text-gray-600 mt-1">Manage blog posts, categories, and tags</p>
                    </div>
                    
                    <div className="flex space-x-3">
                        <Link href="/blog-categories">
                            <Button variant="outline">
                                🏷️ Categories
                            </Button>
                        </Link>
                        <Link href="/blog-tags">
                            <Button variant="outline">
                                🏷️ Tags
                            </Button>
                        </Link>
                        <Link href={route('blog-posts.create')}>
                            <Button className="bg-green-600 hover:bg-green-700">
                                ➕ Create Post
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-green-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                                    Tags
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                                    Published
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                                    Author
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {posts.data.map((post) => (
                                <tr key={post.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            {post.title}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            /{post.slug}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {post.category ? (
                                            <span 
                                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
                                                style={{ backgroundColor: post.category.color }}
                                            >
                                                {post.category.name}
                                            </span>
                                        ) : (
                                            <span className="text-gray-400 text-sm">No category</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {post.tags.map((tag, index) => (
                                                <span 
                                                    key={index}
                                                    className="inline-flex items-center px-2 py-1 rounded text-xs font-medium text-white"
                                                    style={{ backgroundColor: tag.color }}
                                                >
                                                    {tag.name}
                                                </span>
                                            ))}
                                            {post.tags.length === 0 && (
                                                <span className="text-gray-400 text-sm">No tags</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            post.status === 'published' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {post.status === 'published' ? '✅ Published' : '📝 Draft'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDate(post.published_at)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {post.creator.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <Link 
                                                href={route('blog-posts.show', post.id)}
                                                className="text-green-600 hover:text-green-900"
                                            >
                                                👁️ View
                                            </Link>
                                            <Link 
                                                href={route('blog-posts.edit', post.id)}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                ✏️ Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(post)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                🗑️ Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {posts.data.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-4xl mb-4">📝</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts yet</h3>
                            <p className="text-gray-500 mb-4">Get started by creating your first blog post</p>
                            <Link href={route('blog-posts.create')}>
                                <Button className="bg-green-600 hover:bg-green-700">
                                    ➕ Create Post
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {posts.last_page > 1 && (
                    <div className="flex justify-center mt-6">
                        <nav className="flex space-x-2">
                            {Array.from({ length: posts.last_page }, (_, i) => i + 1).map((page) => (
                                <Link
                                    key={page}
                                    href={`?page=${page}`}
                                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                                        page === posts.current_page
                                            ? 'bg-green-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-green-50 border border-gray-300'
                                    }`}
                                >
                                    {page}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </AppShell>
    );
}