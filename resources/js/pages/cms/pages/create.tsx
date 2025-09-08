import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Head, useForm } from '@inertiajs/react';

export default function CreatePage() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        excerpt: '',
        meta_title: '',
        meta_description: '',
        status: 'draft',
        sort_order: 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('pages.store'));
    };

    return (
        <AppShell>
            <Head title="➕ Create Page" />
            
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">➕ Create New Page</h1>
                    <p className="text-gray-600 mt-1">Create a new static page for your website</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">📝 Page Content</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="Enter page title..."
                                />
                                {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
                            </div>
                            
                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                                    Status *
                                </label>
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                >
                                    <option value="draft">📝 Draft</option>
                                    <option value="published">✅ Published</option>
                                </select>
                                {errors.status && <p className="text-red-600 text-sm mt-1">{errors.status}</p>}
                            </div>
                        </div>
                        
                        <div className="mt-6">
                            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                                Excerpt
                            </label>
                            <textarea
                                id="excerpt"
                                rows={3}
                                value={data.excerpt}
                                onChange={(e) => setData('excerpt', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                placeholder="Brief description of the page..."
                            />
                            {errors.excerpt && <p className="text-red-600 text-sm mt-1">{errors.excerpt}</p>}
                        </div>
                        
                        <div className="mt-6">
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                                Content *
                            </label>
                            <textarea
                                id="content"
                                rows={12}
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                placeholder="Write your page content here..."
                            />
                            {errors.content && <p className="text-red-600 text-sm mt-1">{errors.content}</p>}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">🔍 SEO Settings</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="meta_title" className="block text-sm font-medium text-gray-700 mb-2">
                                    Meta Title
                                </label>
                                <input
                                    type="text"
                                    id="meta_title"
                                    value={data.meta_title}
                                    onChange={(e) => setData('meta_title', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="SEO title for search engines..."
                                />
                                {errors.meta_title && <p className="text-red-600 text-sm mt-1">{errors.meta_title}</p>}
                            </div>
                            
                            <div>
                                <label htmlFor="sort_order" className="block text-sm font-medium text-gray-700 mb-2">
                                    Sort Order *
                                </label>
                                <input
                                    type="number"
                                    id="sort_order"
                                    value={data.sort_order}
                                    onChange={(e) => setData('sort_order', parseInt(e.target.value))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    min="0"
                                />
                                {errors.sort_order && <p className="text-red-600 text-sm mt-1">{errors.sort_order}</p>}
                            </div>
                        </div>
                        
                        <div className="mt-6">
                            <label htmlFor="meta_description" className="block text-sm font-medium text-gray-700 mb-2">
                                Meta Description
                            </label>
                            <textarea
                                id="meta_description"
                                rows={3}
                                value={data.meta_description}
                                onChange={(e) => setData('meta_description', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                placeholder="Description for search engines..."
                            />
                            {errors.meta_description && <p className="text-red-600 text-sm mt-1">{errors.meta_description}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => window.history.back()}
                        >
                            ❌ Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={processing}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            {processing ? '⏳ Creating...' : '💾 Create Page'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppShell>
    );
}