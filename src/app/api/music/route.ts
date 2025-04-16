import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // 读取音乐数据文件夹
    const musicDir = path.join(process.cwd(), 'src/content/music');
    const files = fs.readdirSync(musicDir);
    
    // 过滤出JSON文件并读取内容
    const musicFiles = files.filter(file => file.endsWith('.json'));
    const musicData = musicFiles.map(file => {
      const filePath = path.join(musicDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const songData = JSON.parse(fileContent);
      
      // 确保文件路径正确
      // TinaCMS以图片类型上传的音频文件可能路径不包含前导斜杠
      if (songData.audioFile && !songData.audioFile.startsWith('/')) {
        songData.audioFile = '/' + songData.audioFile;
      }
      if (songData.cover && !songData.cover.startsWith('/')) {
        songData.cover = '/' + songData.cover;
      }
      
      return songData;
    });
    
    // 只返回启用的音乐
    const activeMusicData = musicData.filter(music => music.active);
    
    return NextResponse.json(activeMusicData, { status: 200 });
  } catch (error) {
    console.error('读取音乐数据出错:', error);
    return NextResponse.json({ error: '获取音乐数据失败' }, { status: 500 });
  }
} 