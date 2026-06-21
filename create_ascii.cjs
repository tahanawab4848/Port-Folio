const Jimp = require('jimp');
const fs = require('fs');

const imagePath = './public/profile.webp';

Jimp.read(imagePath).then(image => {
  // Crop the image to just the face (approximate) or use as is
  image.resize(50, Jimp.AUTO); // 50 chars wide
  
  // Terminal fonts are usually ~2x as tall as they are wide, so we scale Y by 0.5 to keep aspect ratio
  image.scaleToFit(50, 50 * 0.5); 
  
  const asciiChars = ['@', '%', '#', '*', '+', '=', '-', ':', '.', ' '];
  let ascii = '';
  
  for (let y = 0; y < image.bitmap.height; y++) {
    for (let x = 0; x < image.bitmap.width; x++) {
      const color = Jimp.intToRGBA(image.getPixelColor(x, y));
      // calculate grayscale
      const gray = (color.r + color.g + color.b) / 3;
      const charIndex = Math.floor((gray / 255) * (asciiChars.length - 1));
      ascii += asciiChars[charIndex];
    }
    ascii += '\n';
  }
  
  console.log(ascii);
  fs.writeFileSync('ascii_face.txt', ascii);
}).catch(err => {
  console.error("Error reading image:", err);
});
