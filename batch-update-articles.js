#!/usr/bin/env node
/**
 * Batch Update Articles Script
 * Updates all article HTML files with:
 * - SEO structured data (JSON-LD)
 * - Open Graph & Twitter Card meta tags
 * - Canonical URLs
 * - Reading time estimate
 * - Social share buttons
 * - Trending sidebar
 * - Related articles
 * - Newsletter signup
 * - Back to top button
 * - In-article ads
 * - Lazy loading images
 * - Preconnect headers
 */

const fs = require('fs');
const path = require('path');

// Article metadata database
const articleData = {
    'article1': { title: "ENHYPEN Crisis: Heeseung's Departure Sparks 'ENHYPEN Is 7' Movement", category: 'Breaking', date: '2026-03-17', image: 'enhypen.jpg', related: ['article32', 'article1', 'article8'] },
    'article2': { title: "LE SSERAFIM Kazuha's Dating Scandal: Timeline & Agency Response", category: 'Dating', date: '2026-03-17', image: 'kazuha.jpg', related: ['article9', 'article18', 'article28'] },
    'article3': { title: "TWICE Contract Renewal: Complete Breakdown Of Who Stayed", category: 'Breaking', date: '2026-03-17', image: 'twice.jpg', related: ['article36', 'article30', 'article40'] },
    'article4': { title: "BLACKPINK Lisa's Solo Empire: New Label & Global Deals", category: 'Music', date: '2026-03-17', image: 'lisa.jpg', related: ['article27', 'article31', 'article43'] },
    'article5': { title: "BTS V Military Service Update: Latest Photos & Fan Support", category: 'Breaking', date: '2026-03-17', image: 'taehyung.jpg', related: ['article38', 'article15', 'article7'] },
    'article6': { title: "NewJeans vs HYBE: Complete Timeline Of The Conflict", category: 'Controversy', date: '2026-03-17', image: 'newjeans.jpg', related: ['article12', 'article33', 'article25'] },
    'article7': { title: "BTS Concert Faces Bomb Threats — Unprecedented Security", category: 'Breaking', date: '2026-03-17', image: 'bts-concert.jpg', related: ['article38', 'article41', 'article15'] },
    'article8': { title: "LE SSERAFIM Made 'Uncomfortable' At Fan Event", category: 'Controversy', date: '2026-03-17', image: 'lesserafim.jpg', related: ['article25', 'article24', 'article36'] },
    'article9': { title: "Jungkook & Winter's 'Favorite Date Spot' Exposed", category: 'Dating', date: '2026-03-17', image: 'winter-aespa.jpg', related: ['article18', 'article28', 'article34'] },
    'article10': { title: "Stray Kids World Tour 2026: Dates, Cities & Ticket Info", category: 'Music', date: '2026-03-17', image: 'straykids.jpg', related: ['article38', 'article43', 'article44'] },
    'article11': { title: "NCT Taeyong Accused Of Misogyny & Body Shaming", category: 'Controversy', date: '2026-03-17', image: 'taeyong.jpg', related: ['article22', 'article36', 'article25'] },
    'article12': { title: "ILLIT Wonhee Visuals Mocked In Viral Tweet Linked To NewJeans", category: 'Controversy', date: '2026-03-17', image: 'wonhee.jpg', related: ['article6', 'article33', 'article11'] },
    'article13': { title: "SEVENTEEN 'Right Here' Album Review: Track-By-Track Breakdown", category: 'Music', date: '2026-03-17', image: 'seventeen.jpg', related: ['article33', 'article31', 'article38'] },
    'article14': { title: "IVE Wonyoung Health Concerns: What Fans Need To Know", category: 'Breaking', date: '2026-03-17', image: 'wonyoung.jpg', related: ['article23', 'article28', 'article8'] },
    'article15': { title: "BTS 'ARIRANG' Teaser Sparks Strong Reactions", category: 'Breaking', date: '2026-03-17', image: 'bts-arirang.jpg', related: ['article38', 'article7', 'article39'] },
    'article16': { title: "BTS Accused Of Political Favoritism Over Red Lighting", category: 'Controversy', date: '2026-03-17', image: 'bts-political.jpg', related: ['article39', 'article38', 'article15'] },
    'article17': { title: "BLACKPINK Jennie's Hollywood Movie Role Confirmed", category: 'Breaking', date: '2026-03-17', image: 'jennie.jpg', related: ['article27', 'article4', 'article35'] },
    'article18': { title: "aespa Winter's 'Couple Tattoo' Stays Hidden — Fans React", category: 'Dating', date: '2026-03-17', image: 'winter-tattoo.jpg', related: ['article9', 'article28', 'article34'] },
    'article19': { title: "Red Velvet Comeback 2026: Everything We Know", category: 'Music', date: '2026-03-17', image: 'redvelvet.jpg', related: ['article31', 'article38', 'article43'] },
    'article20': { title: "EXO Reunion Concert Announced For Summer 2026", category: 'Music', date: '2026-03-17', image: 'exo.jpg', related: ['article38', 'article43', 'article10'] },
    'article21': { title: "ITZY Contract Negotiations: What's Next For The Group?", category: 'Breaking', date: '2026-03-17', image: 'itzy.jpg', related: ['article40', 'article30', 'article3'] },
    'article22': { title: "Fans Boycott 'Misogynistic' Lead Actor Yoo Yeon Seok", category: 'K-Drama', date: '2026-03-17', image: 'kdrama-boycott.jpg', related: ['article11', 'article35', 'article45'] },
    'article23': { title: "Choi Yena Unrecognizable After Weight Loss Transformation", category: 'Trending', date: '2026-03-17', image: 'yena-weight.jpg', related: ['article14', 'article8', 'article36'] },
    'article24': { title: "RIIZE Fan Robbed & Assaulted At Lollapalooza Chile", category: 'Breaking', date: '2026-03-17', image: 'riize-chile.jpg', related: ['article8', 'article25', 'article7'] },
    'article25': { title: "HYBE Idol Terrorized By Sasaengs After Female Idol Interaction", category: 'Controversy', date: '2026-03-17', image: 'sasaeng.jpg', related: ['article8', 'article24', 'article11'] },
    'article26': { title: "Girls' Generation Reunion Tour: Dates & Special Guests", category: 'Music', date: '2026-03-17', image: 'snsd.jpg', related: ['article34', 'article20', 'article38'] },
    'article27': { title: "BLACKPINK Win Hit With 'Fraud' Accusations", category: 'Controversy', date: '2026-03-17', image: 'blackpink-fraud.jpg', related: ['article33', 'article4', 'article6'] },
    'article28': { title: "IVE Yujin Dating Actor Moon Sangmin?", category: 'Dating', date: '2026-03-17', image: 'yujin-dating.jpg', related: ['article9', 'article18', 'article34'] },
    'article29': { title: "KATSEYE's Yoonchae 'Shading' Daniela Goes Viral", category: 'Controversy', date: '2026-03-17', image: 'katseye.jpg', related: ['article12', 'article6', 'article36'] },
    'article30': { title: "Former Idol Exposes Harsh Reality Of K-Pop Debt", category: 'Industry', date: '2026-03-17', image: 'former-idol.jpg', related: ['article40', 'article3', 'article21'] },
    'article31': { title: "ZEROBASEONE Split: Zhang Hao, Ricky, Gyuvin, Yujin Form ANDOUBLE", category: 'Music', date: '2026-03-18', image: 'zerobaseone.jpg', related: ['article42', 'article40', 'article44'] },
    'article32': { title: "National Pension Service Flooded Over ENHYPEN Heeseung", category: 'Controversy', date: '2026-03-18', image: 'heeseung.jpg', related: ['article1', 'article6', 'article33'] },
    'article33': { title: "SEVENTEEN Hit With Album Sales Fraud Allegations", category: 'Controversy', date: '2026-03-18', image: 'seventeen.jpg', related: ['article27', 'article13', 'article6'] },
    'article34': { title: "Girls' Generation Tiffany Shows Off Wedding Ring", category: 'Dating', date: '2026-03-18', image: 'tiffany.jpg', related: ['article26', 'article9', 'article28'] },
    'article35': { title: "Cha Eunwoo's Netflix Drama Pushes Forward Despite Tax Scandal", category: 'K-Drama', date: '2026-03-18', image: 'eunwoo.jpg', related: ['article22', 'article45', 'article46'] },
    'article36': { title: "TWICE Jeongyeon Sparks Mistreatment Allegations", category: 'Controversy', date: '2026-03-18', image: 'jeongyeon.jpg', related: ['article3', 'article8', 'article30'] },
    'article37': { title: "Actor Lee Dong Hwi Publicly Cuts Ties With WINNER Mino", category: 'Breaking', date: '2026-03-18', image: 'lee-dong-hwi.jpg', related: ['article35', 'article22', 'article11'] },
    'article38': { title: "BTS 'ARIRANG' Album Drops Tomorrow: Everything You Need To Know", category: 'Music', date: '2026-03-19', image: 'bts-arirang-release.jpg', related: ['article15', 'article7', 'article39'] },
    'article39': { title: "Seoul's Red Lights For BTS Spark Political Firestorm", category: 'Controversy', date: '2026-03-19', image: 'bts-red-controversy.jpg', related: ['article38', 'article16', 'article41'] },
    'article40': { title: "THE BOYZ File For Contract Termination: Explosive Allegations", category: 'Breaking', date: '2026-03-19', image: 'theboyz-contract.jpg', related: ['article30', 'article3', 'article21'] },
    'article41': { title: "Seoul Raises Terror Alert Level For BTS Comeback Concert", category: 'Breaking', date: '2026-03-19', image: 'seoul-security.jpg', related: ['article7', 'article38', 'article39'] },
    'article42': { title: "ZEROBASEONE's Zhang Hao, Ricky, Gyuvin & Yujin To Debut As NDOUBLE", category: 'Music', date: '2026-03-19', image: 'ndouble-debut.jpg', related: ['article31', 'article44', 'article43'] },
    'article43': { title: "Netflix Plans Global Concert Tour For 'KPop Demon Hunters'", category: 'Music', date: '2026-03-19', image: 'kpop-demon-hunters.jpg', related: ['article42', 'article38', 'article10'] },
    'article44': { title: "Rookie Boy Group AmbiO Makes Official Debut", category: 'Music', date: '2026-03-19', image: 'ambio-debut.jpg', related: ['article42', 'article31', 'article43'] },
    'article45': { title: "IU And Byeon Woo-seok's 'Perfect Crown' Confirms Premiere", category: 'K-Drama', date: '2026-03-19', image: 'perfect-crown.jpg', related: ['article46', 'article47', 'article35'] },
    'article46': { title: "'Siren's Kiss' Complete Guide: Park Min-young & Wi Ha-joon", category: 'K-Drama', date: '2026-03-19', image: 'sirens-kiss.jpg', related: ['article45', 'article47', 'article22'] },
    'article47': { title: "Seo Kang Joon Confirmed For 'Another Love But You'", category: 'K-Drama', date: '2026-03-19', image: 'another-love.jpg', related: ['article45', 'article46', 'article35'] }
};

// Trending articles for sidebar
const trendingArticles = [
    { id: 'article1', title: "ENHYPEN Crisis: Heeseung's Departure Sparks Movement" },
    { id: 'article9', title: "Jungkook & Winter's 'Favorite Date Spot' Exposed" },
    { id: 'article11', title: "NCT Taeyong Accused Of Misogyny & Body Shaming" },
    { id: 'article27', title: "BLACKPINK Win Hit With 'Fraud' Accusations" },
    { id: 'article40', title: "THE BOYZ File For Contract Termination" }
];

function estimateReadingTime(content) {
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 200);
    return Math.max(3, Math.min(15, minutes));
}

function generateStructuredData(articleId, data, description) {
    return `
    <!-- Article Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": "${data.title.replace(/"/g, '\\"')}",
        "image": ["https://asianbus.com/images/${data.image}"],
        "datePublished": "${data.date}T09:00:00+09:00",
        "dateModified": "${data.date}T09:00:00+09:00",
        "author": {
            "@type": "Person",
            "name": "AsianBus Wire Staff",
            "url": "https://asianbus.com"
        },
        "publisher": {
            "@type": "Organization",
            "name": "AsianBus Wire",
            "logo": {
                "@type": "ImageObject",
                "url": "https://asianbus.com/logo.png"
            }
        },
        "description": "${description.replace(/"/g, '\\"').substring(0, 200)}",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://asianbus.com/${articleId}.html"
        },
        "articleSection": "${data.category}"
    }
    </script>`;
}

function generateMetaTags(articleId, data, description) {
    const encodedTitle = data.title.replace(/"/g, '&quot;');
    const encodedDesc = description.replace(/"/g, '&quot;').substring(0, 160);
    
    return `    <link rel="canonical" href="https://asianbus.com/${articleId}.html">
    
    <!-- Open Graph -->
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="AsianBus Wire">
    <meta property="og:title" content="${encodedTitle}">
    <meta property="og:description" content="${encodedDesc}">
    <meta property="og:image" content="https://asianbus.com/images/${data.image}">
    <meta property="og:url" content="https://asianbus.com/${articleId}.html">
    <meta property="article:published_time" content="${data.date}T09:00:00+09:00">
    <meta property="article:section" content="${data.category}">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@AsianBusWire">
    <meta name="twitter:title" content="${encodedTitle}">
    <meta name="twitter:description" content="${encodedDesc}">
    <meta name="twitter:image" content="https://asianbus.com/images/${data.image}">
    
    <!-- Preconnect for speed -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://pagead2.googlesyndication.com">`;
}

function generateTrendingSidebar() {
    let items = trendingArticles.map((item, i) => 
        `                    <li>
                        <span class="trending-number">${i + 1}</span>
                        <a href="${item.id}.html">${item.title}</a>
                    </li>`
    ).join('\n');
    
    return `        <!-- Sidebar -->
        <aside class="article-sidebar">
            <!-- Trending Now -->
            <div class="trending-sidebar">
                <h3>Trending Now</h3>
                <ol class="trending-list">
${items}
                </ol>
            </div>

            <!-- Sidebar Ad -->
            <div class="ad-container" style="margin-top: 1.5rem;">
                <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9902886208446482" data-ad-slot="auto" data-ad-format="auto"></ins>
                <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
            </div>
        </aside>
    </div>`;
}

function generateRelatedArticles(relatedIds) {
    let items = relatedIds.slice(0, 4).map(id => {
        const data = articleData[id];
        if (!data) return '';
        return `                    <div class="related-item">
                        <img src="images/${data.image}" alt="${data.title.substring(0, 30)}" loading="lazy">
                        <div class="related-item-content">
                            <span class="category">${data.category}</span>
                            <a href="${id}.html">${data.title}</a>
                        </div>
                    </div>`;
    }).filter(Boolean).join('\n');
    
    return `            <!-- Enhanced Related Articles -->
            <section class="related-articles">
                <h3>You May Also Like</h3>
                <div class="related-grid">
${items}
                </div>
            </section>`;
}

function generateShareButtons(articleId, title) {
    const encodedUrl = `https://asianbus.com/${articleId}.html`;
    const encodedTitle = encodeURIComponent(title);
    
    return `                <!-- Social Share Buttons -->
                <div class="share-buttons" style="margin-bottom: 1.5rem;">
                    <span>Share:</span>
                    <a href="https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}" target="_blank" rel="noopener" class="share-btn twitter">𝕏 Tweet</a>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}" target="_blank" rel="noopener" class="share-btn facebook">f Share</a>
                    <a href="https://wa.me/?text=${encodedTitle}%20${encodedUrl}" target="_blank" rel="noopener" class="share-btn whatsapp">💬 WhatsApp</a>
                    <button class="share-btn copy-link" onclick="copyLink()">🔗 Copy</button>
                </div>`;
}

function generateInArticleAd() {
    return `                    <!-- In-article ad after 2nd paragraph -->
                    <div class="ad-in-article">
                        <ins class="adsbygoogle" style="display:block; text-align:center;" data-ad-layout="in-article" data-ad-format="fluid" data-ad-client="ca-pub-9902886208446482" data-ad-slot="auto"></ins>
                        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
                    </div>`;
}

function generateFooterEnhancements() {
    return `    <footer class="site-footer">
        <div class="footer-content">
            <div class="footer-logo">AsianBus Wire</div>
            <p class="footer-tagline">Your #1 Source for K-Pop News</p>
            
            <!-- Newsletter Signup -->
            <div class="newsletter-signup">
                <h4>📧 Get K-Pop News First</h4>
                <p>Breaking news, dating rumors & exclusive updates delivered daily.</p>
                <form class="newsletter-form" action="#" method="post">
                    <input type="email" placeholder="Enter your email" required>
                    <button type="submit">Subscribe</button>
                </form>
            </div>
            
            <!-- Social Links -->
            <div class="footer-social">
                <a href="https://twitter.com/AsianBusWire" target="_blank" rel="noopener" aria-label="Twitter">𝕏</a>
                <a href="https://instagram.com/asianbuswire" target="_blank" rel="noopener" aria-label="Instagram">📷</a>
                <a href="https://tiktok.com/@asianbuswire" target="_blank" rel="noopener" aria-label="TikTok">🎵</a>
                <a href="https://youtube.com/@asianbuswire" target="_blank" rel="noopener" aria-label="YouTube">▶️</a>
            </div>
            
            <div class="footer-links">
                <a href="index.html">Home</a>
                <a href="breaking.html">Breaking</a>
                <a href="dating.html">Dating</a>
                <a href="controversy.html">Controversy</a>
            </div>
            <div class="footer-bottom"><p>© 2026 AsianBus Wire. All rights reserved.</p></div>
        </div>
    </footer>

    <!-- Back to Top Button -->
    <button class="back-to-top" id="back-to-top" aria-label="Back to top">↑</button>

    <script>
    // Copy link functionality
    function copyLink() {
        navigator.clipboard.writeText(window.location.href).then(() => {
            const btn = document.querySelector('.share-btn.copy-link');
            btn.textContent = '✓ Copied!';
            btn.classList.add('copied');
            setTimeout(() => {
                btn.textContent = '🔗 Copy';
                btn.classList.remove('copied');
            }, 2000);
        });
    }

    // Back to Top
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Simple search redirect
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim()) {
                window.location.href = 'https://www.google.com/search?q=site:asianbus.com+' + encodeURIComponent(this.value);
            }
        });
    }
    </script>
</body>
</html>`;
}

function processArticle(filePath, articleId) {
    const data = articleData[articleId];
    if (!data) {
        console.log(`⚠️  No data for ${articleId}, skipping...`);
        return false;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Extract description from meta tag or first paragraph
    let description = '';
    const descMatch = content.match(/<meta name="description" content="([^"]+)"/);
    if (descMatch) {
        description = descMatch[1];
    } else {
        const pMatch = content.match(/<p class="lead">([^<]+)/);
        if (pMatch) description = pMatch[1].substring(0, 160);
    }
    
    // Skip already processed files (check for structured data)
    if (content.includes('@type": "NewsArticle"')) {
        console.log(`✓  ${articleId} already processed, skipping...`);
        return false;
    }
    
    const readingTime = estimateReadingTime(content);
    
    // 1. Add canonical URL and meta tags after description meta
    if (!content.includes('rel="canonical"')) {
        const metaTags = generateMetaTags(articleId, data, description);
        content = content.replace(
            /(<link rel="icon" type="image\/svg\+xml" href="favicon.svg">)/,
            `$1\n${metaTags}`
        );
    }
    
    // 2. Add structured data before </head>
    if (!content.includes('application/ld+json')) {
        const structuredData = generateStructuredData(articleId, data, description);
        content = content.replace('</head>', `${structuredData}\n</head>`);
    }
    
    // 3. Add search bar to header if not present
    if (!content.includes('header-search')) {
        content = content.replace(
            /(<a href="index.html" class="logo">[\s\S]*?<\/a>)\s*(<nav class="header-nav">)/,
            `$1\n            <div class="header-search">\n                <input type="search" placeholder="Search K-Pop news..." id="search-input" autocomplete="off">\n            </div>\n            $2`
        );
    }
    
    // 4. Add reading time to meta
    if (!content.includes('reading-time') && content.includes('class="meta"')) {
        content = content.replace(
            /(<span class="author">[^<]+<\/span>)/,
            `$1\n                        <span class="reading-time">📖 ${readingTime} min read</span>`
        );
    }
    
    // 5. Add lazy loading to images
    content = content.replace(
        /(<img src="images\/[^"]+"\s+alt="[^"]*")(\s*>)/g,
        '$1 loading="lazy"$2'
    );
    // Keep featured image eager
    content = content.replace(
        /(<div class="featured-image">\s*<img[^>]+)loading="lazy"/,
        '$1loading="eager"'
    );
    
    // 6. Add share buttons after featured image
    if (!content.includes('share-buttons')) {
        const shareButtons = generateShareButtons(articleId, data.title);
        content = content.replace(
            /(<\/div>\s*\n\s*<div class="content">)/,
            `</div>\n                \n${shareButtons}\n                \n                <div class="content">`
        );
    }
    
    // 7. Add in-article ad after 2nd paragraph
    if (!content.includes('ad-in-article')) {
        let pCount = 0;
        content = content.replace(/<\/p>/g, (match) => {
            pCount++;
            if (pCount === 2) {
                return match + '\n\n' + generateInArticleAd();
            }
            return match;
        });
    }
    
    // 8. Add article layout wrapper with sidebar
    if (!content.includes('article-layout')) {
        // Wrap main content in article-layout
        content = content.replace(
            /(<nav class="breadcrumb">)/,
            '\n    <div class="article-layout">\n        <div class="article-main">\n    $1'
        );
        
        // Close article-main before footer and add sidebar
        const sidebar = generateTrendingSidebar();
        content = content.replace(
            /(<\/section>\s*)(\n\s*<footer class="site-footer">)/,
            `$1\n        </div>\n\n${sidebar}\n$2`
        );
    }
    
    // 9. Update related articles section
    if (content.includes('<section class="related-articles">') && !content.includes('related-grid')) {
        const relatedSection = generateRelatedArticles(data.related || []);
        content = content.replace(
            /<section class="related-articles">[\s\S]*?<\/section>/,
            relatedSection
        );
    }
    
    // 10. Add ad between article and related
    if (!content.includes('<!-- Ad between article and related -->')) {
        content = content.replace(
            /(            <!-- Enhanced Related Articles -->)/,
            `            <!-- Ad between article and related -->
            <div class="ad-container" style="max-width: var(--content-width); margin: 0 auto;">
                <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9902886208446482" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins>
                <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
            </div>

$1`
        );
    }
    
    // 11. Update footer with newsletter and social
    if (!content.includes('newsletter-signup')) {
        const footerEnhancements = generateFooterEnhancements();
        content = content.replace(
            /<footer class="site-footer">[\s\S]*<\/html>/,
            footerEnhancements
        );
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated ${articleId}`);
    return true;
}

// Main execution
const articlesDir = path.dirname(__filename);
let processed = 0;
let skipped = 0;

for (let i = 1; i <= 47; i++) {
    const articleId = `article${i}`;
    const filePath = path.join(articlesDir, `${articleId}.html`);
    
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  ${articleId}.html not found`);
        continue;
    }
    
    // Skip article38 as it's already the template
    if (articleId === 'article38') {
        console.log(`⏭️  ${articleId} is template, skipping...`);
        skipped++;
        continue;
    }
    
    if (processArticle(filePath, articleId)) {
        processed++;
    } else {
        skipped++;
    }
}

console.log(`\n📊 Summary: ${processed} articles updated, ${skipped} skipped`);
