import fs from "fs";
import path from "path";

const baseDir = "./public/database_images";

// Auto-discover all folders inside /database_images
const types = fs.readdirSync(baseDir).filter(f =>
  fs.lstatSync(path.join(baseDir, f)).isDirectory()
);

console.log("📂 Found folders:", types);

let data = [];

types.forEach(type => {
  const dir = path.join(baseDir, type);
  console.log(`🔎 Scanning folder: ${dir}`);

  const files = fs.readdirSync(dir);
  console.log(`   → Found files:`, files);

  files.forEach((file, index) => {
    if (!file.match(/\.(png|jpg|jpeg)$/i)) return; // only images

    data.push({
      id: `${type.toLowerCase()}-${index + 1}`,
      title: file.replace(/\.(png|jpg|jpeg)$/i, "").replace(/_/g, " "),
      description: `Auto-generated description for ${file}`,
      category: type.charAt(0).toUpperCase() + type.slice(1).toLowerCase(),
      tags: [type.toLowerCase()],
      image_url: `/database_images/${type}/${file}`,
      type: type.toLowerCase()
    });
  });
});

console.log(`📊 Total items generated: ${data.length}`);

// Ensure ./src/data folder exists
const outDir = "./src/data";
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
  console.log("📂 Created folder:", outDir);
}

// Write JSON file
const outPath = path.join(outDir, "explore-data.json");
fs.writeFileSync(outPath, JSON.stringify(data, null, 2));

console.log(`✅ explore-data.json generated at ${outPath}`);
