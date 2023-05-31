import fs from "fs"
import ytdl from "ytdl-core" 
import path from "path"
const pathUploadsMusics = path.join(__dirname, '../uploads')

export const musicUpload = async (url: string, name: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(`${pathUploadsMusics}/${name}.mp3`);
        const music = ytdl(url, { filter: 'audioonly' });
        console.log('\nAguarde...\n');

        writeStream.on('finish', () => {
          console.log('Música baixada\n');
          resolve('Music upload');
        });
    
        music.on('error', (err) => {
          console.log('error_msg:', err);
          reject(new Error('Error music upload!'));
        });
    
        music.pipe(writeStream); 

    })
    
}