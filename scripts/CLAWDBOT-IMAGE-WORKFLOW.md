# Clawdbot AsianBus Image Workflow

## When to Use
When AsianBus needs new images or broken images need fixing.

## Step-by-Step Process

### 1. Identify Missing/Broken Images
```bash
cd ~/workspace/asianbus-temp/images
# Find tiny files (broken)
find . -type f -size -1k
# Check which images are referenced but missing
grep -oh 'images/[^"]*' ../index.html ../*.html | sort -u | while read img; do [ ! -f "../$img" ] && echo "MISSING: $img"; done
```

### 2. Search for Images (Use eli-pc Browser)

**Best Sources:**
- Yonhap: `https://en.yna.co.kr/search/index?query=BTS+2026`
- Soompi: `https://www.soompi.com/search?query=BTS`
- Korea Herald: `https://www.koreaherald.com/search/index.php?q=BTS`

**Browser Commands:**
```
browser open target=node node=eli-pc profile=clawd targetUrl=https://en.yna.co.kr/search/index?query=TWICE+2026
browser screenshot target=node node=eli-pc profile=clawd
```

### 3. Extract Image URLs
Look for high-res images in search results:
- Yonhap: `img*.yna.co.kr/photo/yna/YNA/...` (use PYH size for high-res)
- Soompi: `0.soompi.io/wp-content/uploads/...`

### 4. Download Images to eli-pc
```powershell
# On eli-pc
Invoke-WebRequest -Uri "https://img.yna.co.kr/photo/yna/..." -OutFile "C:\Users\nikoc\Downloads\asianbus\twice.jpg"
```

### 5. Verify Image Content
Use `image` tool to verify the downloaded image shows the correct subject:
```
image image=C:\Users\nikoc\Downloads\asianbus\twice.jpg prompt="Does this image show TWICE members? Describe what you see."
```

### 6. Transfer & Commit
```bash
# From sandbox, pull image from eli-pc or use direct URL
cd ~/workspace/asianbus-temp/images
curl -o twice.jpg "https://img.yna.co.kr/..."

# Commit
cd ~/workspace/asianbus-temp
git add images/
git commit -m "fix: add missing images"
git push
```

## Image Naming Convention
- Groups: `{group}.jpg` (e.g., `twice.jpg`, `bts.jpg`)
- Individual: `{name}.jpg` (e.g., `jennie.jpg`, `lisa.jpg`)  
- Context: `{subject}-{context}.jpg` (e.g., `bts-concert.jpg`, `twice-comeback.jpg`)

## Current Missing Images
1. seventeen-vernon-the8.jpg
2. smtr25-sasaeng.jpg
3. hybe-stock.jpg
4. nct-wish.jpg
5. twice.jpg
6. straykids.jpg
7. redvelvet.jpg
8. itzy.jpg
9. exo.jpg
10. snsd.jpg
11. jennie.jpg
12. lisa.jpg
13. wonyoung.jpg
14. btob.jpg
15. bts-arirang-concert.jpg
16. aespa-2026.jpg (broken)
17. bts-arirang-sales.jpg (broken)
18. cube-trainees.jpg (broken)
19. kim-sejeong.jpg (broken)
20. yuna-solo.jpg (broken)
