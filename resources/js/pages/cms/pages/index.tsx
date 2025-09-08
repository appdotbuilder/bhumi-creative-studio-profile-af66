import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Head, Link, router } from '@inertiajs/react';

interface Page {
    id: number;
    title: string;
    slug: string;
    status: string;
    sort_order: number;
    created_at: string;
    creator: {
        name: string;
    };
}

interface Props {
    pages: {
        data: Page[];
        current_page: number;
        last_page: number;
    };
    [key: string]: unknown;
}

export default function PagesIndex({ pages }: Props) {
    const handleDelete = (page: Page) => {
        if (confirm(`Are you sure you want to delete "${page.title}"?`)) {
            router.delete(route('pages.destroy', page.id));
        }
    };

    return (
        <AppShell>
            <Head title="📄 Page Management" />
            
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">📄 Page Management</h1>
                        <p className="text-gray-600 mt-1">Manage static pages for your website</p>
                    </div>
                    
                    <Link href={route('pages.create')}>
                        <Button className="bg-green-600 hover:bg-green-700">
                            ➕ Create Page
                        </Button>
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-green-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                                    Slug
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                                    Order
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                                    Created By
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {pages.data.map((page) => (
                                <tr key={page.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {page.title}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            /{page.slug}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            page.status === 'published' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {page.status === 'published' ? '✅ Published' : '📝 Draft'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {page.sort_order}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {page.creator.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <Link 
                                                href={route('pages.show', page.id)}
                                                className="text-green-600 hover:text-green-900"
                                            >
                                                👁️ View
                                            </Link>
                                            <Link 
                                                href={route('pages.edit', page.id)}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                ✏️ Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(page)}
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
                    
                    {pages.data.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-4xl mb-4">📄</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No pages yet</h3>
                            <p className="text-gray-500 mb-4">Get started by creating your first page</p>
                            <Link href={route('pages.create')}>
                                <Button className="bg-green-600 hover:bg-green-700">
                                    ➕ Create Page
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {pages.last_page > 1 && (
                    <div className="flex justify-center mt-6">
                        <nav className="flex space-x-2">
                            {Array.from({ length: pages.last_page }, (_, i) => i + 1).map((page) => (
                                <Link
                                    key={page}
                                    href={`?page=${page}`}
                                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                                        page === pages.current_page
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