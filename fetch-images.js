const https = require('https');
const fs = require('fs');
const path = require('path');

const searches = {
  'zerobaseone.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/ZEROBASEONE_in_July_2023.jpg/440px-ZEROBASEONE_in_July_2023.jpg',
  'heeseung.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/230924_%EC%9D%B8%EC%B2%9C%ED%95%AD%EA%B5%AD%EC%A0%9C%EA%B3%B5%ED%95%AD_%EC%B6%9C%EA%B5%AD_%EC%97%94%ED%95%98%EC%9D%B4%ED%94%88_%ED%9D%AC%EC%8A%B9.jpg/440px-230924_%EC%9D%B8%EC%B2%9C%ED%95%AD%EA%B5%AD%EC%A0%9C%EA%B3%B5%ED%95%AD_%EC%B6%9C%EA%B5%AD_%EC%97%94%ED%95%98%EC%9D%B4%ED%94%88_%ED%9D%AC%EC%8A%B9.jpg',
  'seventeen.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Seventeen_%28South_Korean_band%29_at_Incheon_Airport_on_March_18%2C_2023_%2802%29.jpg/440px-Seventeen_%28South_Korean_band%29_at_Incheon_Airport_on_March_18%2C_2023_%2802%29.jpg',
  'tiffany.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Tiffany_Young_at_KCON_2018_NY.jpg/440px-Tiffany_Young_at_KCON_2018_NY.jpg',
  'eunwoo.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Cha_Eunwoo_at_the_Dior_Men%27s_Fall_2024_show_02.jpg/440px-Cha_Eunwoo_at_the_Dior_Men%27s_Fall_2024_show_02.jpg',
  'jeongyeon.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Jeongyeon_at_Starfield_Hanam_fan_meeting_on_July_9%2C_2017.jpg/440px-Jeongyeon_at_Starfield_Hanam_fan_meeting_on_July_9%2C_2017.jpg',
  'lee-dong-hwi.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Lee_Dong-hwi.jpg/440px-Lee_Dong-hwi.jpg'
};

const imgDir = './kpop-news/images/';

async function downloadImage(filename, url) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(imgDir, filename));
    https.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AsianBusWire/1.0)' }
    }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        https.get(response.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
          res.pipe(file);
          file.on('finish', () => { file.close(); resolve(filename); });
        });
      } else {
        response.pipe(file);
        file.on('finish', () => { file.close(); resolve(filename); });
      }
    }).on('error', reject);
  });
}

(async () => {
  for (const [filename, url] of Object.entries(searches)) {
    try {
      await downloadImage(filename, url);
      console.log(`✓ ${filename}`);
    } catch (e) {
      console.log(`✗ ${filename}: ${e.message}`);
    }
  }
})();
