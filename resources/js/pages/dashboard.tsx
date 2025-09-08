import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;

    const cmsFeatures = [
        {
            title: 'Page Management',
            description: 'Create, edit, and manage static pages',
            icon: '📄',
            route: 'pages.index',
            color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
            iconColor: 'text-blue-600',
        },
        {
            title: 'Blog Management',
            description: 'Manage blog posts, categories, and tags',
            icon: '📝',
            route: 'blog-posts.index',
            color: 'bg-green-50 border-green-200 hover:bg-green-100',
            iconColor: 'text-green-600',
        },
        {
            title: 'Menu Management',
            description: 'Configure website navigation menus',
            icon: '🧭',
            route: 'menus.index',
            color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
            iconColor: 'text-purple-600',
        },
        {
            title: 'User Management',
            description: 'Manage users, roles, and permissions',
            icon: '👥',
            route: 'users.index',
            color: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
            iconColor: 'text-orange-600',
        },
    ];

    const stats = [
        { label: 'Total Pages', value: '12', icon: '📄', change: '+2 this month' },
        { label: 'Blog Posts', value: '25', icon: '📝', change: '+5 this week' },
        { label: 'Published Content', value: '18', icon: '✅', change: '75% published' },
        { label: 'Draft Content', value: '7', icon: '📝', change: '25% draft' },
    ];

    return (
        <AppShell>
            <Head title="🏠 Dashboard - Bhumi Creative Studio CMS" />
            
            <div className="p-6">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        🏠 Welcome back, {auth.user?.name}!
                    </h1>
                    <p className="text-gray-600">
                        Manage your Bhumi Creative Studio website content with ease 🌱
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-lg shadow p-6 border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                                <div className="text-3xl">{stat.icon}</div>
                            </div>
                            <p className="text-sm text-green-600 mt-2">{stat.change}</p>
                        </div>
                    ))}
                </div>

                {/* CMS Features Grid */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">🛠️ Content Management</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {cmsFeatures.map((feature, index) => (
                            <Link
                                key={index}
                                href={route(feature.route)}
                                className={`block p-6 rounded-lg border-2 transition-colors ${feature.color}`}
                            >
                                <div className="text-center">
                                    <div className={`text-4xl mb-4 ${feature.iconColor}`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {feature.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                    <h2 className="text-xl font-semibold text-green-800 mb-4">⚡ Quick Actions</h2>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href={route('pages.create')}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            ➕ New Page
                        </Link>
                        <Link
                            href={route('blog-posts.create')}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            📝 New Blog Post
                        </Link>
                        <Link
                            href={route('welcome')}
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            🌍 View Website
                        </Link>
                        <Link
                            href={route('settings.appearance')}
                            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            ⚙️ Settings
                        </Link>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="mt-8 bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">📊 Recent Activity</h2>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                            <div className="text-green-600">✅</div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                    Page "About Us" was published
                                </p>
                                <p className="text-xs text-gray-500">2 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                            <div className="text-blue-600">📝</div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                    New blog post "Digital Marketing Tips" created
                                </p>
                                <p className="text-xs text-gray-500">5 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                            <div className="text-purple-600">🧭</div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                    Main navigation menu updated
                                </p>
                                <p className="text-xs text-gray-500">1 day ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}