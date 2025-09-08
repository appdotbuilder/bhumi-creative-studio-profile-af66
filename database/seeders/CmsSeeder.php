<?php

namespace Database\Seeders;

use App\Models\BlogCategory;
use App\Models\BlogPost;
use App\Models\BlogTag;
use App\Models\Page;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CmsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::firstOrCreate([
            'email' => 'admin@bhumicreative.id'
        ], [
            'name' => 'Admin Bhumi Creative',
            'password' => bcrypt('password'),
            'role' => 'admin',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        // Create editor user
        $editor = User::firstOrCreate([
            'email' => 'editor@bhumicreative.id'
        ], [
            'name' => 'Editor Bhumi Creative',
            'password' => bcrypt('password'),
            'role' => 'editor',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        // Create sample pages
        $pages = [
            [
                'title' => 'Tentang Kami',
                'content' => '<h1>Tentang Bhumi Creative Studio</h1>
                <p>Bhumi Creative Studio adalah perusahaan kreatif digital yang berfokus pada solusi inovatif untuk bisnis modern. Kami menghadirkan layanan desain, branding, dan pengembangan digital yang berkelanjutan dan ramah lingkungan.</p>
                <h2>Visi Kami</h2>
                <p>Menjadi studio kreatif terdepan yang menginspirasi perubahan positif melalui desain dan teknologi berkelanjutan.</p>
                <h2>Misi Kami</h2>
                <ul>
                <li>Menciptakan solusi kreatif yang berdampak positif</li>
                <li>Mengembangkan brand yang kuat dan berkarakter</li>
                <li>Menerapkan prinsip-prinsip berkelanjutan dalam setiap project</li>
                </ul>',
                'excerpt' => 'Bhumi Creative Studio adalah perusahaan kreatif digital yang berfokus pada solusi inovatif untuk bisnis modern.',
                'sort_order' => 1,
            ],
            [
                'title' => 'Layanan',
                'content' => '<h1>Layanan Bhumi Creative Studio</h1>
                <h2>🎨 Desain & Branding</h2>
                <p>Kami menciptakan identitas visual yang kuat dan memorable untuk brand Anda, mulai dari logo design hingga brand guidelines yang komprehensif.</p>
                <h2>💻 Pengembangan Website</h2>
                <p>Website responsif dan modern yang dioptimalkan untuk performa dan pengalaman pengguna terbaik.</p>
                <h2>📱 Digital Marketing</h2>
                <p>Strategi pemasaran digital yang efektif untuk meningkatkan brand awareness dan engagement dengan target audience.</p>
                <h2>📹 Konten Kreatif</h2>
                <p>Konten visual dan multimedia yang engaging untuk berbagai platform digital.</p>',
                'excerpt' => 'Layanan lengkap dari desain & branding hingga digital marketing yang disesuaikan dengan kebutuhan bisnis Anda.',
                'sort_order' => 2,
            ],
            [
                'title' => 'Portfolio',
                'content' => '<h1>Portfolio Kami</h1>
                <p>Berikut adalah beberapa project yang telah kami kerjakan dengan berbagai klien dari berbagai industri.</p>
                <h2>🏢 Corporate Branding</h2>
                <p>Identitas visual untuk perusahaan teknologi startup hingga enterprise.</p>
                <h2>🛍️ E-commerce Solutions</h2>
                <p>Pengembangan toko online yang user-friendly dan conversion-oriented.</p>
                <h2>🎯 Campaign Digital</h2>
                <p>Kampanye digital marketing yang berhasil meningkatkan engagement hingga 300%.</p>',
                'excerpt' => 'Lihat hasil kerja kami dalam berbagai project kreatif dan digital.',
                'sort_order' => 3,
            ],
            [
                'title' => 'Kontak',
                'content' => '<h1>Hubungi Kami</h1>
                <p>Siap untuk memulai project kreatif bersama kami? Mari berdiskusi tentang ide Anda!</p>
                <h2>📍 Alamat</h2>
                <p>Jakarta, Indonesia</p>
                <h2>📧 Email</h2>
                <p>hello@bhumicreative.id</p>
                <h2>📞 Telepon</h2>
                <p>+62 812 3456 7890</p>
                <h2>🕒 Jam Operasional</h2>
                <p>Senin - Jumat: 09:00 - 18:00 WIB<br>
                Sabtu: 09:00 - 15:00 WIB</p>',
                'excerpt' => 'Berbagai cara untuk menghubungi tim Bhumi Creative Studio.',
                'sort_order' => 4,
            ],
        ];

        foreach ($pages as $pageData) {
            Page::firstOrCreate([
                'slug' => Str::slug($pageData['title'])
            ], array_merge($pageData, [
                'slug' => Str::slug($pageData['title']),
                'status' => 'published',
                'meta_title' => $pageData['title'] . ' - Bhumi Creative Studio',
                'meta_description' => $pageData['excerpt'],
                'created_by' => $admin->id,
                'updated_by' => $admin->id,
            ]));
        }

        // Create blog categories
        $categories = [
            [
                'name' => 'Design Tips',
                'description' => 'Tips dan trik seputar desain kreatif',
                'color' => '#10b981',
            ],
            [
                'name' => 'Digital Marketing',
                'description' => 'Strategi dan insights digital marketing',
                'color' => '#3b82f6',
            ],
            [
                'name' => 'Web Development',
                'description' => 'Tutorial dan best practices web development',
                'color' => '#8b5cf6',
            ],
        ];

        foreach ($categories as $catData) {
            BlogCategory::firstOrCreate([
                'slug' => Str::slug($catData['name'])
            ], array_merge($catData, [
                'slug' => Str::slug($catData['name']),
                'sort_order' => 0,
            ]));
        }

        // Create blog tags
        $tags = [
            ['name' => 'Branding', 'color' => '#ef4444'],
            ['name' => 'UI/UX', 'color' => '#f59e0b'],
            ['name' => 'SEO', 'color' => '#06b6d4'],
            ['name' => 'Social Media', 'color' => '#ec4899'],
            ['name' => 'Typography', 'color' => '#84cc16'],
        ];

        foreach ($tags as $tagData) {
            BlogTag::firstOrCreate([
                'slug' => Str::slug($tagData['name'])
            ], array_merge($tagData, [
                'slug' => Str::slug($tagData['name']),
                'description' => 'Tag untuk topik ' . $tagData['name'],
            ]));
        }

        // Create sample blog posts
        $designCategory = BlogCategory::where('slug', 'design-tips')->first();
        $marketingCategory = BlogCategory::where('slug', 'digital-marketing')->first();

        $posts = [
            [
                'title' => 'Tips Memilih Warna yang Tepat untuk Brand Anda',
                'content' => '<p>Warna adalah salah satu elemen paling penting dalam branding. Pemilihan warna yang tepat dapat mempengaruhi persepsi konsumen terhadap brand Anda.</p>
                <h2>Psikologi Warna</h2>
                <p>Setiap warna memiliki makna dan emosi yang berbeda:</p>
                <ul>
                <li><strong>Merah:</strong> Energi, passion, urgency</li>
                <li><strong>Biru:</strong> Trust, profesional, tenang</li>
                <li><strong>Hijau:</strong> Alam, pertumbuhan, harmoni</li>
                <li><strong>Orange:</strong> Kreativitas, antusiasme, ramah</li>
                </ul>',
                'excerpt' => 'Pelajari cara memilih palet warna yang tepat untuk mencerminkan kepribadian brand Anda.',
                'category_id' => $designCategory->id,
                'featured_image' => 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=400',
            ],
            [
                'title' => '5 Strategi Digital Marketing untuk UMKM',
                'content' => '<p>UMKM (Usaha Mikro, Kecil, dan Menengah) perlu memanfaatkan digital marketing untuk berkembang di era digital ini.</p>
                <h2>1. Social Media Marketing</h2>
                <p>Manfaatkan platform social media untuk menjangkau target audience.</p>
                <h2>2. Content Marketing</h2>
                <p>Buat konten yang valuable dan relevan untuk audience Anda.</p>
                <h2>3. SEO Optimization</h2>
                <p>Optimalkan website untuk mesin pencari.</p>',
                'excerpt' => 'Strategi digital marketing yang efektif dan terjangkau untuk UMKM.',
                'category_id' => $marketingCategory->id,
                'featured_image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400',
            ],
            [
                'title' => 'Tren Desain Grafis 2024',
                'content' => '<p>Tahun 2024 membawa berbagai tren desain yang menarik dan inovatif.</p>
                <h2>Minimalist dengan Twist</h2>
                <p>Desain minimalis tetap populer, namun dengan sentuhan kreatif yang unexpected.</p>
                <h2>Bold Typography</h2>
                <p>Typography yang berani dan ekspresif menjadi focal point dalam desain.</p>
                <h2>Sustainable Design</h2>
                <p>Desain yang ramah lingkungan dan sustainable semakin diutamakan.</p>',
                'excerpt' => 'Tren desain grafis terbaru yang wajib diketahui para designer.',
                'category_id' => $designCategory->id,
                'featured_image' => 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=400',
            ],
        ];

        foreach ($posts as $postData) {
            BlogPost::firstOrCreate([
                'slug' => Str::slug($postData['title'])
            ], array_merge($postData, [
                'slug' => Str::slug($postData['title']),
                'status' => 'published',
                'published_at' => fake()->dateTimeBetween('-3 months', 'now'),
                'meta_title' => $postData['title'] . ' - Bhumi Creative Studio Blog',
                'meta_description' => $postData['excerpt'],
                'created_by' => fake()->randomElement([$admin->id, $editor->id]),
                'updated_by' => fake()->randomElement([$admin->id, $editor->id]),
            ]));
        }
    }
}