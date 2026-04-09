#!/usr/bin/env python3
import re
import urllib.request

# Fetch and reformat articles 48-115
for num in range(48, 116):
    print(f"Processing article{num}...")
    url = f"https://raw.githubusercontent.com/NikoClaws/asianbus-wire/master/article{num}.html"
    try:
        with urllib.request.urlopen(url, timeout=10) as resp:
            content = resp.read().decode('utf-8')
        
        # Extract key data
        title_m = re.search(r'<title>([^<]+)</title>', content)
        title = title_m.group(1) if title_m else f"Article {num}"
        
        desc_m = re.search(r'<meta name="description" content="([^"]+)"', content)
        desc = desc_m.group(1) if desc_m else ""
        
        og_m = re.search(r'<meta property="og:title" content="([^"]+)"', content)
        og_title = og_m.group(1) if og_m else title
        
        img_m = re.search(r'<meta property="og:image" content="([^"]+)"', content)
        og_img = img_m.group(1) if img_m else "https://asianbus.com/images/default.jpg"
        
        section_m = re.search(r'<meta property="article:section" content="([^"]+)"', content)
        section = section_m.group(1) if section_m else "Music"
        
        pub_m = re.search(r'<meta property="article:published_time" content="([^"]+)"', content)
        pub_time = pub_m.group(1) if pub_m else "2026-03-20T09:00:00+09:00"
        
        author_m = re.search(r'"author":\s*\{"@type": "Person", "name": "([^"]+)"', content)
        if not author_m:
            author_m = re.search(r'<span class="author">By ([^<]+)</span>', content)
        author = author_m.group(1).strip() if author_m else "Staff Writer"
        
        h1_m = re.search(r'<h1>([^<]+)</h1>', content)
        h1 = h1_m.group(1) if h1_m else title
        
        cat_m = re.search(r'<span class="category">([^<]+)</span>', content)
        category = cat_m.group(1) if cat_m else section
        
        date_m = re.search(r'<span class="date">([^<]+)</span>', content)
        if not date_m:
            date_m = re.search(r'<time datetime="[^"]+">([^<]+)</time>', content)
        date = date_m.group(1) if date_m else "March 2026"
        
        rt_m = re.search(r'(\d+)\s*min read', content)
        read_time = rt_m.group(1) if rt_m else "5"
        
        # Extract img src
        img_src_m = re.search(r'<img src="(images/[^"]+\.jpg)"', content)
        if not img_src_m:
            img_src_m = re.search(r'<figure class="article-hero">\s*<img src="([^"]+)"', content)
        img = img_src_m.group(1) if img_src_m else og_img.replace("https://asianbus.com/", "")
        
        img_alt_m = re.search(r'<img src="' + re.escape(img) + r'" alt="([^"]+)"', content)
        img_alt = img_alt_m.group(1) if img_alt_m else h1
        
        cap_m = re.search(r'<figcaption>([^<]+)</figcaption>', content)
        img_caption = cap_m.group(1) if cap_m else h1
        
        # Extract body
        body_m = re.search(r'<div class="article-body">(.*?)</div>\s*(?:<footer|<div class="share)', content, re.DOTALL)
        if not body_m:
            body_m = re.search(r'<div class="article-body">(.*)', content, re.DOTALL)
        body = body_m.group(1).strip() if body_m else "<p>Content coming soon.</p>"
        
        # Extract tags
        tags_m = re.search(r'<div class="tags">(.*?)</div>', content, re.DOTALL)
        if tags_m:
            tag_links = re.findall(r'<a href="[^"]+">([^<]+)</a>', tags_m.group(1))
            tags = '\n                    '.join([f'<a href="music.html">{t}</a>' for t in tag_links[:5]])
        else:
            tags = f'<a href="music.html">{category}</a>'
        
        with open(f'article{num}.html', 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  Saved article{num}.html (author={author})")
    except Exception as e:
        print(f"  Error article{num}: {e}")

print("Done!")
