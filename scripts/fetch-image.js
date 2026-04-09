#!/usr/bin/env node
/**
 * AsianBus Image Fetcher
 * Fetches K-pop images from news sources
 * 
 * Usage: node fetch-image.js --name "bts-concert" --search "BTS 2026 concert"
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Image sources with search URL patterns
const SOURCES = [
  {
    name: 'Yonhap',
    searchUrl: (q) => `https://en.yna.co.kr/search/index?query=${encodeURIComponent(q)}&ctype=A`,
    imgPattern: /img\d*\.yna\.co\.kr\/photo\/yna\/.*?\.jpg/gi
  },
  {
    name: 'Soompi', 
    searchUrl: (q) => `https://www.soompi.com/search?query=${encodeURIComponent(q)}`,
    imgPattern: /0\.soompi\.io\/wp-content\/uploads\/.*?\.jpg/gi
  },
  {
    name: 'AllKPop',
    searchUrl: (q) => `https://www.allkpop.com/search?q=${encodeURIComponent(q)}`,
    imgPattern: /images\.allkpop\.com\/upload\/.*?\.jpg/gi
  }
];

// Missing images from AsianBus
const MISSING_IMAGES = [
  { name: 'seventeen-vernon-the8', search: 'SEVENTEEN Vernon The8 unit 2026' },
  { name: 'smtr25-sasaeng', search: 'SM Entertainment SMTR25 trainees 2026' },
  { name: 'hybe-stock', search: 'HYBE stock market 2026' },
  { name: 'nct-wish', search: 'NCT WISH group 2026' },
  { name: 'twice', search: 'TWICE group 2026' },
  { name: 'straykids', search: 'Stray Kids group 2026' },
  { name: 'redvelvet', search: 'Red Velvet group 2026' },
  { name: 'itzy', search: 'ITZY group 2026' },
  { name: 'exo', search: 'EXO group 2026' },
  { name: 'snsd', search: 'Girls Generation SNSD 2026' },
  { name: 'jennie', search: 'BLACKPINK Jennie 2026' },
  { name: 'lisa', search: 'BLACKPINK Lisa 2026' },
  { name: 'wonyoung', search: 'IVE Wonyoung 2026' },
  { name: 'btob', search: 'BTOB group 2026' },
  { name: 'bts-arirang-concert', search: 'BTS ARIRANG concert Seoul 2026' },
  { name: 'aespa-2026', search: 'aespa group 2026' },
  { name: 'bts-arirang-sales', search: 'BTS ARIRANG album sales' },
  { name: 'cube-trainees', search: 'Cube Entertainment trainees 2026' },
  { name: 'kim-sejeong', search: 'Kim Sejeong actress 2026' },
  { name: 'yuna-solo', search: 'ITZY Yuna solo 2026' }
];

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(destPath);
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadImage(response.headers.location, destPath).then(resolve).catch(reject);
        return;
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        const stats = fs.statSync(destPath);
        if (stats.size < 5000) {
          fs.unlinkSync(destPath);
          reject(new Error('Image too small, likely an error page'));
        } else {
          resolve(destPath);
        }
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

// Export for use by Clawdbot
module.exports = { MISSING_IMAGES, SOURCES, downloadImage };

// CLI usage
if (require.main === module) {
  console.log('AsianBus Image Fetcher');
  console.log('Missing images:', MISSING_IMAGES.length);
  console.log('\nTo fetch images, use Clawdbot browser automation.');
  console.log('Example: Search Yonhap for "BTS concert 2026", download best result.');
}
