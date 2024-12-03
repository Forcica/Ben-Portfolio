import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

// Chemin vers les dossiers
const texturesPath = path.join(__dirname, '../public/assets/models/textures');
const mobilePath = path.join(__dirname, '../public/assets/models/textures/mobile');
const optimizedPath = path.join(__dirname, '../public/assets/models/textures/optimized');

async function optimizeTextures(directory: string) {
  try {
    // Créer les dossiers de destination s'ils n'existent pas
    await fs.mkdir(mobilePath, { recursive: true });
    await fs.mkdir(optimizedPath, { recursive: true });

    const files = await fs.readdir(directory);
    
    for (const file of files) {
      if (/\.(jpg|jpeg|png)$/i.test(file)) {
        const inputPath = path.join(directory, file);
        
        // Version mobile
        await sharp(inputPath)
          .resize(512)
          .jpeg({ quality: 60 })
          .toFile(path.join(mobilePath, file));

        // Version optimized
        await sharp(inputPath)
          .resize(1024)
          .jpeg({ quality: 80 })
          .toFile(path.join(optimizedPath, file));
          
        console.log(`✅ Optimisé: ${file}`);
      }
    }
  } catch (error) {
    console.error('Erreur:', error);
  }
}

// Lancer l'optimisation
optimizeTextures(texturesPath); 