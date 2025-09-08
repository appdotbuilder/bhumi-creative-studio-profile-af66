import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface Props {
    featuredPosts?: Array<{
        id: number;
        title: string;
        excerpt: string;
        slug: string;
        featured_image?: string;
        category?: {
            name: string;
            color: string;
        };
        creator: {
            name: string;
        };
    }>;
    pages?: Array<{
        title: string;
        slug: string;
    }>;
    [key: string]: unknown;
}

export default function Welcome({ featuredPosts = [], pages = [] }: Props) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Bhumi Creative Studio - Creative Digital Solutions">
                <meta name="description" content="Bhumi Creative Studio menyediakan solusi kreatif digital terdepan untuk bisnis Anda. Spesialis dalam desain, branding, dan pengembangan digital." />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700" rel="stylesheet" />
            </Head>
            
            <div className="min-h-screen bg-white">
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-green-100">
                    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">🌱</span>
                            </div>
                            <span className="font-bold text-xl text-green-800">Bhumi Creative Studio</span>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                            {pages.map((page) => (
                                <Link 
                                    key={page.slug}
                                    href={`/pages/${page.slug}`}
                                    className="text-gray-700 hover:text-green-600 transition-colors"
                                >
                                    {page.title}
                                </Link>
                            ))}
                            
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    🏠 Dashboard
                                </Link>
                            ) : (
                                <div className="flex items-center space-x-3">
                                    <Link
                                        href={route('login')}
                                        className="text-green-600 hover:text-green-700 font-medium"
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Daftar
                                    </Link>
                                </div>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <section className="bg-gradient-to-br from-green-50 to-green-100 py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="mb-6">
                                <span className="text-6xl">🌱</span>
                            </div>
                            <h1 className="text-5xl font-bold text-green-800 mb-6">
                                Bhumi Creative Studio
                            </h1>
                            <p className="text-xl text-green-700 mb-8 max-w-3xl mx-auto">
                                Solusi Kreatif Digital yang Menginspirasi dan Mengembangkan Bisnis Anda
                                dengan Pendekatan Inovatif dan Berkelanjutan 🚀
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors">
                                    💡 Konsultasi Gratis
                                </button>
                                <button className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-50 transition-colors">
                                    📋 Lihat Portfolio
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                🎯 Layanan Kami
                            </h2>
                            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                                Kami menyediakan berbagai layanan kreatif digital untuk membantu bisnis Anda berkembang
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center p-8 rounded-xl bg-green-50 border border-green-100 hover:shadow-lg transition-shadow">
                                <div className="text-4xl mb-4">🎨</div>
                                <h3 className="text-xl font-semibold text-green-800 mb-3">Desain & Branding</h3>
                                <p className="text-green-700">
                                    Menciptakan identitas visual yang kuat dan memorable untuk brand Anda
                                </p>
                            </div>
                            
                            <div className="text-center p-8 rounded-xl bg-green-50 border border-green-100 hover:shadow-lg transition-shadow">
                                <div className="text-4xl mb-4">💻</div>
                                <h3 className="text-xl font-semibold text-green-800 mb-3">Pengembangan Website</h3>
                                <p className="text-green-700">
                                    Website responsif dan modern yang mengoptimalkan pengalaman pengguna
                                </p>
                            </div>
                            
                            <div className="text-center p-8 rounded-xl bg-green-50 border border-green-100 hover:shadow-lg transition-shadow">
                                <div className="text-4xl mb-4">📱</div>
                                <h3 className="text-xl font-semibold text-green-800 mb-3">Digital Marketing</h3>
                                <p className="text-green-700">
                                    Strategi pemasaran digital yang efektif untuk meningkatkan brand awareness
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Blog Posts */}
                {featuredPosts.length > 0 && (
                    <section className="py-16 bg-green-50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    📰 Blog Terbaru
                                </h2>
                                <p className="text-gray-600 text-lg">
                                    Insight dan tips terbaru tentang dunia kreatif digital
                                </p>
                            </div>
                            
                            <div className="grid md:grid-cols-3 gap-8">
                                {featuredPosts.map((post) => (
                                    <article key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                        {post.featured_image && (
                                            <img 
                                                src={post.featured_image} 
                                                alt={post.title}
                                                className="w-full h-48 object-cover"
                                            />
                                        )}
                                        <div className="p-6">
                                            {post.category && (
                                                <span 
                                                    className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white mb-3"
                                                    style={{ backgroundColor: post.category.color }}
                                                >
                                                    {post.category.name}
                                                </span>
                                            )}
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-600 mb-4">
                                                {post.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-500">
                                                    oleh {post.creator.name}
                                                </span>
                                                <Link 
                                                    href={`/blog/${post.slug}`}
                                                    className="text-green-600 hover:text-green-700 font-medium"
                                                >
                                                    Baca Selengkapnya →
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA Section */}
                <section className="py-16 bg-green-600">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold text-white mb-6">
                            🚀 Siap Mengembangkan Bisnis Anda?
                        </h2>
                        <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                            Mari berdiskusi tentang bagaimana kami dapat membantu mewujudkan visi kreatif Anda
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-white text-green-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-50 transition-colors">
                                📞 Hubungi Kami
                            </button>
                            <button className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors">
                                ✉️ Kirim Pesan
                            </button>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-green-800 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-4 gap-8">
                            <div>
                                <div className="flex items-center space-x-2 mb-4">
                                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">🌱</span>
                                    </div>
                                    <span className="font-bold text-xl">Bhumi Creative Studio</span>
                                </div>
                                <p className="text-green-200">
                                    Solusi kreatif digital yang menginspirasi dan berkelanjutan
                                </p>
                            </div>
                            
                            <div>
                                <h3 className="font-semibold mb-4">Layanan</h3>
                                <ul className="space-y-2 text-green-200">
                                    <li>🎨 Desain & Branding</li>
                                    <li>💻 Pengembangan Website</li>
                                    <li>📱 Digital Marketing</li>
                                    <li>📹 Konten Kreatif</li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="font-semibold mb-4">Perusahaan</h3>
                                <ul className="space-y-2 text-green-200">
                                    <li>🏢 Tentang Kami</li>
                                    <li>📋 Portfolio</li>
                                    <li>👥 Tim</li>
                                    <li>📰 Blog</li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="font-semibold mb-4">Kontak</h3>
                                <ul className="space-y-2 text-green-200">
                                    <li>📧 hello@bhumicreative.id</li>
                                    <li>📞 +62 812 3456 7890</li>
                                    <li>📍 Jakarta, Indonesia</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-200">
                            <p>&copy; 2024 Bhumi Creative Studio. Semua hak cipta dilindungi. 🌱</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}