# AsianBus Image Workflow

## Overview
Automated workflow for sourcing K-pop news images using eli-pc browser.

## Image Sources (Priority Order)
1. **Yonhap News** - `img*.yna.co.kr` (Korean news agency, high quality)
2. **Getty Images** - `media.gettyimages.com` (press photos)
3. **Soompi** - `0.soompi.io` (K-pop focused)
4. **AllKPop** - `images.allkpop.com`
5. **Korea Herald** - `koreaherald.com`

## Naming Convention
- `{artist/group}-{context}.jpg`
- Examples: `bts-concert.jpg`, `twice-comeback.jpg`, `jennie-solo.jpg`

## Image Requirements
- Minimum 800px width
- JPG format preferred
- Relevant to article content
- No watermarks if possible

## Workflow Steps
1. Search news source for artist/topic
2. Use browser to navigate and find image
3. Verify image shows correct subject
4. Download to local folder
5. Resize if needed (max 1200px width for web)
6. Commit to repo

## Quick Commands
```bash
# Download single image
node scripts/fetch-image.js --name "bts-concert" --search "BTS 2026 concert"

# Batch fix missing images  
node scripts/fix-missing-images.js

# Verify all images exist
node scripts/verify-images.js
```
