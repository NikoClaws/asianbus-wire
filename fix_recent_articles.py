#!/usr/bin/env python3
import re
import os

def fix_article(article_num):
    filename = f"article{article_num}.html"
    if not os.path.exists(filename):
        print(f"File {filename} not found")
        return
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract key data from current article
    title_match = re.search(r'<title>([^<]+)</title>', content)
    title = title_match.group(1) if title_match else f"Article {article_num}"
    
    desc_match = re.search(r'<meta name="description" content="([^"]+)"', content)
    description = desc_match.group(1) if desc_match else ""
    
    og_image_match = re.search(r'<meta property="og:image" content="([^"]+)"', content)
    og_image = og_image_match.group(1) if og_image_match else "https://asianbus.com/images/default.jpg"
    
    section_match = re.search(r'<meta property="article:section" content="([^"]+)"', content)
    section = section_match.group(1) if section_match else "Music"
    
    pub_time_match = re.search(r'<meta property="article:published_time" content="([^"]+)"', content)
    pub_time = pub_time_match.group(1) if pub_time_match else "2026-04-16T03:15:00+09:00"
    
    author_match = re.search(r'"author":\s*\{"@type": "Person", "name": "([^"]+)"', content)
    author = author_match.group(1) if author_match else "Julian Choi"
    
    h1_match = re.search(r'<h1>([^<]+)</h1>', content)
    h1 = h1_match.group(1) if h1_match else title
    
    category_match = re.search(r'<span class="category">([^<]+)</span>', content)
    category = category_match.group(1) if category_match else section
    
    date_match = re.search(r'<time datetime="[^"]+">([^<]+)</time>', content)
    date = date_match.group(1) if date_match else "April 16, 2026"
    
    # Extract image src
    img_match = re.search(r'<img src="(images/[^"]+\.(?:jpg|png))"', content)
    img_src = img_match.group(1) if img_match else "images/default.jpg"
    
    # Extract article content
    content_start = content.find('<div class="content">')
    content_end = content.find('</div>', content_start)
    if content_start != -1 and content_end != -1:
        article_content = content[content_start:content_end + 6]
    else:
        article_content = '<div class="content"><p>Content coming soon.</p></div>'
    
    # Create fixed article using article44.html as template
    fixed_article = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <meta name="description" content="{description}">
    <link rel="icon" type="image/svg+xml" href="favicon.svg">
    <link rel="canonical" href="https://asianbus.com/article{article_num}.html">
    
    <!-- Open Graph -->
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="AsianBus News">
    <meta property="og:title" content="{h1}">
    <meta property="og:description" content="{description}">
    <meta property="og:image" content="{og_image}">
    <meta property="og:url" content="https://asianbus.com/article{article_num}.html">
    <meta property="article:published_time" content="{pub_time}">
    <meta property="article:section" content="{section}">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@AsianBusWire">
    <meta name="twitter:title" content="{h1}">
    <meta name="twitter:description" content="{description}">
    <meta name="twitter:image" content="{og_image}">
    
    <!-- Preconnect for speed -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://pagead2.googlesyndication.com">
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9902886208446482" crossorigin="anonymous"></script>
    <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "306ce3c01b784017af54d50655769d2b"}'></script>

    <!-- Article Structured Data -->
    <script type="application/ld+json">
    {{
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": "{h1}",
        "image": ["{og_image}"],
        "datePublished": "{pub_time}",
        "dateModified": "{pub_time}",
        "author": {{
            "@type": "Person",
            "name": "{author}",
            "url": "https://asianbus.com"
        }},
        "publisher": {{
            "@type": "Organization",
            "name": "AsianBus News",
            "logo": {{
                "@type": "ImageObject",
                "url": "https://asianbus.com/logo.png"
            }}
        }},
        "description": "{description}",
        "mainEntityOfPage": {{
            "@type": "WebPage",
            "@id": "https://asianbus.com/article{article_num}.html"
        }},
        "articleSection": "{section}"
    }}
    </script>
</head>
<body class="article-page">
    <header class="site-header">
        <div class="header-top">
            <a href="index.html" class="logo">
                <img src="logo.png" alt="AsianBus K-Pop News" class="logo-img">
            </a>
            <div class="header-search">
                <input type="search" placeholder="Search K-Pop news..." id="search-input" autocomplete="off">
            </div>
        </div>
        <nav class="header-nav">
                <a href="index.html">Home</a>
                <a href="breaking.html">Breaking</a>
                <a href="dating.html">Dating</a>
                <a href="controversy.html">Controversy</a>
                <a href="music.html">Music</a>
                <a href="kdrama.html">K-Drama</a>
            </nav>
    </header>

    
    <div class="article-layout">
        <div class="article-main">
    <nav class="breadcrumb">
        <a href="index.html">Home</a> › <a href="{section.lower().replace(' ', '-')}.html">{section}</a> › <span>{h1}</span>
    </nav>

    <article class="article-container">
        <header>
            <span class="category">{category}</span>
            <h1>{h1}</h1>
            <div class="meta">
                <time datetime="{pub_time}">{date}</time>
                <span class="author">By {author}</span>
                        <span class="reading-time">📖 5 min read</span>
            </div>
        </header>
        
        <div class="featured-image">
            <img src="{img_src}" alt="{h1}" loading="eager">
        </div>
        
        {article_content}
        
        <footer class="article-footer">
            <div class="tags">
                <span>Tags:</span>
                <a href="music.html">{category}</a>
                <a href="music.html">K-Pop</a>
                <a href="music.html">News</a>
            </div>

            <div class="share-buttons">
                <span>Share:</span>
                <a href="https://twitter.com/intent/tweet?url=https://asianbus.com/article{article_num}.html" target="_blank" rel="noopener">X</a>
                <a href="https://www.facebook.com/sharer/sharer.php?u=https://asianbus.com/article{article_num}.html" target="_blank" rel="noopener">f</a>
            </div>
        </footer>
    </article>

                <!-- Ad between article and related -->
            <div class="ad-container" style="max-width: var(--content-width); margin: 0 auto;">
                <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9902886208446482" data-ad-slot="auto" data-ad-format="auto" data-full-width-responsive="true"></ins>
                <script>(adsbygoogle = window.adsbygoogle || []).push({{}});</script>
            </div>

            <!-- Enhanced Related Articles -->
            <section class="related-articles">
                <h3>You May Also Like</h3>
                <div class="related-grid">
                    <div class="related-item">
                        <img src="images/default.jpg" alt="Related article 1" loading="lazy">
                        <div class="related-item-content">
                            <span class="category">Music</span>
                            <a href="article{article_num-1}.html">Previous Article</a>
                        </div>
                    </div>
                    <div class="related-item">
                        <img src="images/default.jpg" alt="Related article 2" loading="lazy">
                        <div class="related-item-content">
                            <span class="category">Music</span>
                            <a href="article{article_num-2}.html">Older Article</a>
                        </div>
                    </div>
                    <div class="related-item">
                        <img src="images/default.jpg" alt="Related article 3" loading="lazy">
                        <div class="related-item-content">
                            <span class="category">Music</span>
                            <a href="article{article_num-3}.html">Another Article</a>
                        </div>
                    </div>
                </div>
            </section>

    <section class="comments-section">
        <h3>💬 Comments</h3>
        <div id="disqus_thread"></div>
        <script>
            var disqus_config = function () {{
                this.page.url = 'https://asianbus.com/article{article_num}.html';
                this.page.identifier = 'article{article_num}';
            }};
            (function() {{
                var d = document, s = d.createElement('script');
                s.src = 'https://asianbus.disqus.com/embed.js';
                s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
            }})();
        </script>
    </section>

        </div>

        <!-- Sidebar -->
        <aside class="article-sidebar">
            <!-- Trending Now -->
            <div class="trending-sidebar">
                <h3>Trending Now</h3>
                <ol class="trending-list">
                    <li>
                        <span class="trending-number">1</span>
                        <a href="article{article_num-1}.html">Previous Article</a>
                    </li>
                    <li>
                        <span class="trending-number">2</span>
                        <a href="article{article_num-2}.html">Older Article</a>
                    </li>
                    <li>
                        <span class="trending-number">3</span>
                        <a href="article{article_num-3}.html">Another Article</a>
                    </li>
                    <li>
                        <span class="trending-number">4</span>
                        <a href="article{article_num-4}.html">Older Article 2</a>
                    </li>
                    <li>
                        <span class="trending-number">5</span>
                        <a href="article{article_num-5}.html">Older Article 3</a>
                    </li>
                </ol>
            </div>

            <!-- Sidebar Ad -->
            <div class="ad-container" style="margin-top: 1.5rem;">
                <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9902886208446482" data-ad-slot="auto" data-ad-format="auto"></ins>
                <script>(adsbygoogle = window.adsbygoogle || []).push({{}});</script>
            </div>
        </aside>
    </div>

        <footer class="site-footer">
        <div class="footer-content">
            <div class="footer-section">
                <h4>AsianBus News</h4>
                <p>Your source for the latest K-pop news, updates, and exclusive stories from the world of Korean entertainment.</p>
            </div>
            <div class="footer-section">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="breaking.html">Breaking</a></li>
                    <li><a href="dating.html">Dating</a></li>
                    <li><a href="controversy.html">Controversy</a></li>
                    <li><a href="music.html">Music</a></li>
                    <li><a href="kdrama.html">K-Drama</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Newsletter</h4>
                <p>Subscribe to get daily K-pop news delivered to your inbox.</p>
                <form class="newsletter-form">
                    <input type="email" placeholder="Your email" required>
                    <button type="submit">Subscribe</button>
                </form>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 AsianBus News. All rights reserved.</p>
            <p><a href="privacy.html">Privacy Policy</a> | <a href="terms.html">Terms of Service</a></p>
        </div>
    </footer>

    <!-- Back to top -->
    <button class="back-to-top" aria-label="Back to top">↑</button>

    <script src="scripts/search.js"></script>
    <script src="scripts/back-to-top.js"></script>
</body>
</html>'''
    
    # Write fixed article
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(fixed_article)
    
    print(f"Fixed {filename}")

# Fix articles 123, 124, 125
for article_num in [123, 124, 125]:
    fix_article(article_num)

print("Done fixing recent articles!")