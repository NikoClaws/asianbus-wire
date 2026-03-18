#!/bin/bash
# Update article images using Brave Image Search API

API_KEY="BSAFmfrx0uOkfyPkcH2an80gnGK77rh"
IMG_DIR="images"

search_and_download() {
    local query="$1"
    local filename="$2"
    
    echo "Searching: $query -> $filename"
    
    # Search Brave Images API
    local response=$(curl -s "https://api.search.brave.com/res/v1/images/search?q=$(echo "$query" | sed 's/ /+/g')&count=3" \
        -H "Accept: application/json" \
        -H "X-Subscription-Token: $API_KEY")
    
    # Extract image URL from properties.url field
    local img_url=$(echo "$response" | grep -oP '"properties":\{"url":"[^"]+' | grep -oP 'https://[^"]+' | head -1)
    
    if [ -n "$img_url" ]; then
        echo "  URL: $img_url"
        curl -sL -o "$IMG_DIR/$filename" "$img_url" \
            -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" \
            -H "Referer: https://www.google.com/" \
            --max-time 10
        
        # Check file size (should be > 5KB for a real image)
        local size=$(stat -c%s "$IMG_DIR/$filename" 2>/dev/null || echo "0")
        if [ "$size" -gt 5000 ]; then
            echo "  ✓ Downloaded ($size bytes)"
            return 0
        else
            echo "  ✗ Too small ($size bytes)"
            rm -f "$IMG_DIR/$filename"
        fi
    else
        echo "  No image URL found"
    fi
    
    # Fallback
    echo "  → Fallback"
    curl -sL -o "$IMG_DIR/$filename" "https://picsum.photos/seed/${filename%.*}/800/450"
}

cd ~/workspace/kpop-news

# Download all images
search_and_download "ENHYPEN Heeseung kpop" "heeseung.jpg"
search_and_download "BTS Jungkook photo" "jungkook.jpg"
search_and_download "Tiffany Young SNSD singer" "tiffany.jpg"
search_and_download "ILLIT kpop debut" "illit.jpg"
search_and_download "Cha Eunwoo ASTRO" "eunwoo.jpg"
search_and_download "BTS group" "bts-group.jpg"
search_and_download "BTS concert" "bts-concert.jpg"
search_and_download "LE SSERAFIM group" "lesserafim.jpg"
search_and_download "aespa Winter" "winter.jpg"
search_and_download "TREASURE Hyunsuk" "treasure.jpg"
search_and_download "NCT Taeyong" "taeyong.jpg"
search_and_download "ILLIT Wonhee member" "wonhee.jpg"
search_and_download "Chungha singer" "chungha.jpg"
search_and_download "kpop couple dating" "dating-nda.jpg"
search_and_download "BTS ARIRANG" "bts-arirang.jpg"
search_and_download "BTS political" "bts-politics.jpg"
search_and_download "kpop idol stage" "fake-personality.jpg"
search_and_download "aespa Winter tattoo" "winter-tattoo.jpg"
search_and_download "IVE Rei" "rei-merch.jpg"
search_and_download "ZEROBASEONE concert stage" "zb1-concert.jpg"
search_and_download "WINNER Mino" "mino-scandal.jpg"
search_and_download "Yoo Yeon Seok kdrama" "kdrama-boycott.jpg"
search_and_download "Choi Yena IZONE" "yena-weight.jpg"
search_and_download "RIIZE group kpop" "riize-chile.jpg"
search_and_download "kpop fan concert" "sasaeng.jpg"
search_and_download "Lovelyz Mijoo" "mijoo.jpg"
search_and_download "BLACKPINK award" "blackpink-fraud.jpg"
search_and_download "IVE Yujin" "yujin-dating.jpg"
search_and_download "KATSEYE group" "katseye.jpg"
search_and_download "kpop trainee idol" "former-idol.jpg"
search_and_download "ZEROBASEONE group" "zerobaseone.jpg"
search_and_download "SEVENTEEN group" "seventeen.jpg"
search_and_download "TWICE Jeongyeon" "jeongyeon.jpg"
search_and_download "Lee Dong Hwi actor" "lee-dong-hwi.jpg"
search_and_download "BLACKPINK group" "blackpink.jpg"
search_and_download "ENHYPEN group" "enhypen.jpg"

echo ""
echo "Done! Committing..."
git add -A
git commit -m "Update all images using Brave Image Search"
git push

echo "Complete!"
