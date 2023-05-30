import ytdl from 'ytdl-core';

interface VideoInfo {
  duration: string | null;
  title: string | null;
}

async function getVideoInfo(videoUrl: string): Promise<VideoInfo> {
  try {
    const info = await ytdl.getBasicInfo(videoUrl);
    return {
      duration: info.videoDetails.lengthSeconds,
      title: info.videoDetails.title
    };
  } catch (error) {
    console.error('Ocorreu um erro ao extrair informações do vídeo:', error);
    return {
      duration: null,
      title: null
    };
  }
}

// Exemplo de uso:
const videoUrl = 'https://www.youtube.com/watch?v=9Q9FM2W8vvg'; // Substitua 'VIDEO_ID' pelo ID do vídeo desejado
getVideoInfo(videoUrl)
  .then(info => {
    console.log('Duração do vídeo:', info.duration);
    console.log('Nome do vídeo:', info.title);
  })
  .catch(error => {
    console.error('Ocorreu um erro:', error);
  });
