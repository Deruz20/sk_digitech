const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/app/components');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(dir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Standardize py-
  content = content.replace(/py-\d+\s+md:py-\d+/g, "py-32 md:py-40");
  
  // Some sections just have py-24
  content = content.replace(/className="([^"]*)py-24([^"]*)"/g, 'className="$1py-32 md:py-40$2"');

  // Standardize max-w-
  content = content.replace(/max-w-\[1280px\]/g, "max-w-[1400px]");
  content = content.replace(/max-w-\[1200px\]/g, "max-w-[1400px]");
  content = content.replace(/max-w-\[1000px\]/g, "max-w-[1000px]"); // Leave smaller ones maybe? Actually the user said 'container widths'. We'll change 1280 and 1200 to 1400.

  // Standardize fonts
  content = content.replace(/'Space Grotesk'/g, "'Inter'");
  content = content.replace(/Space_Grotesk/g, "Inter");

  // Fix some clamp font sizes for h2 to be slightly more restrained if they are 80px+
  content = content.replace(/clamp\(48px,\s*6vw,\s*80px\)/g, "clamp(40px, 5vw, 72px)");
  content = content.replace(/clamp\(40px,\s*6vw,\s*80px\)/g, "clamp(40px, 5vw, 72px)");

  // Tighten tracking on headings where Inter is used instead of Space Grotesk
  content = content.replace(/letterSpacing:\s*"-0.04em"/g, 'letterSpacing: "-0.03em"');
  
  // Background standardization. Most should be #FFFFFF or #F9FAFB if light. 
  // We'll leave backgrounds alone to not break contrast unless specified.

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
