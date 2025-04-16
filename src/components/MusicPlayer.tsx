"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './MusicPlayer.module.css';

type Song = {
  title: string;
  artist: string;
  audioFile: string;
  cover?: string;
};

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 从API获取音乐数据
  useEffect(() => {
    async function fetchMusicData() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/music');
        
        if (!response.ok) {
          throw new Error('获取音乐数据失败');
        }
        
        const data = await response.json();
        
        if (data && Array.isArray(data) && data.length > 0) {
          setSongs(data);
        } else {
          // 如果没有音乐数据，使用默认的音乐数据
          setSongs([
            {
              title: "夜明けと蛍",
              artist: "n-buna & 初音ミク",
              audioFile: "/music/n-buna,初音ミク - 夜明けと蛍.mp3",
              cover: "/images/hanatoame.jpg"
            }
          ]);
        }
      } catch (err) {
        console.error('获取音乐数据出错:', err);
        setError('获取音乐数据失败，使用默认音乐');
        
        // 使用默认的音乐数据
        setSongs([
          {
            title: "夜明けと蛍",
            artist: "n-buna & 初音ミク",
            audioFile: "/music/n-buna,初音ミク - 夜明けと蛍.mp3",
            cover: "/images/hanatoame.jpg"
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchMusicData();
  }, []);
  
  // 处理音频播放
  useEffect(() => {
    // 如果没有加载完或者没有歌曲，不执行音频相关逻辑
    if (isLoading || songs.length === 0) return;
    
    const currentSong = songs[currentSongIndex];
    if (!currentSong) return;
    
    audioRef.current = new Audio(currentSong.audioFile);
    
    // 监听音频加载完成事件
    audioRef.current.addEventListener('canplaythrough', () => {
      if (isPlaying) {
        audioRef.current?.play().catch(e => console.error("播放出错:", e));
      }
    });
    
    // 监听音频结束事件，播放下一首
    audioRef.current.addEventListener('ended', () => {
      playNextSong();
    });
    
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [currentSongIndex, songs, isLoading]);

  // 处理播放状态变化
  useEffect(() => {
    if (!isLoading && songs.length > 0 && audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("播放出错:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, isLoading, songs]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const playNextSong = () => {
    if (!songs.length) return;
    
    if (shuffle) {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * songs.length);
      } while (nextIndex === currentSongIndex && songs.length > 1);
      setCurrentSongIndex(nextIndex);
    } else {
      setCurrentSongIndex((currentSongIndex + 1) % songs.length);
    }
  };

  const playPrevSong = () => {
    if (!songs.length) return;
    
    if (shuffle) {
      let prevIndex;
      do {
        prevIndex = Math.floor(Math.random() * songs.length);
      } while (prevIndex === currentSongIndex && songs.length > 1);
      setCurrentSongIndex(prevIndex);
    } else {
      setCurrentSongIndex((currentSongIndex - 1 + songs.length) % songs.length);
    }
  };

  const toggleShuffle = () => {
    setShuffle(!shuffle);
  };

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  // 如果没有加载完或者没有歌曲，不渲染播放器
  if (isLoading || songs.length === 0) {
    return null;
  }

  const currentSong = songs[currentSongIndex];

  return (
    <div 
      className={`${styles.musicPlayer} ${isExpanded ? styles.expanded : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`${styles.musicButton} ${isPlaying ? styles.playing : ''}`} onClick={togglePlay}>
        <button className={styles.iconButton}>
          🎵
        </button>
      </div>
      
      <div className={styles.expandedPanel}>
        {error && <div className={styles.errorMessage}>{error}</div>}
        
        <div className={styles.songDetails}>
          <div className={styles.coverArt}>
            {currentSong.cover ? (
              <img 
                src={currentSong.cover} 
                alt={`${currentSong.title} cover`} 
                className={`${styles.coverImage} ${isPlaying ? styles.rotating : ''}`}
              />
            ) : (
              <div className={`${styles.defaultCover} ${isPlaying ? styles.rotating : ''}`}>
                🎵
              </div>
            )}
          </div>
          
          <div className={styles.songInfo}>
            <h4 className={styles.songTitle}>{currentSong.title}</h4>
            <p className={styles.songArtist}>{currentSong.artist}</p>
          </div>
        </div>
        
        <div className={styles.playerControls}>
          <button 
            className={styles.controlButton} 
            onClick={playPrevSong}
            aria-label="上一首"
          >
            ⏮️
          </button>
          
          <button 
            className={styles.playButton} 
            onClick={togglePlay}
            aria-label={isPlaying ? "暂停" : "播放"}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          
          <button 
            className={styles.controlButton} 
            onClick={playNextSong}
            aria-label="下一首"
          >
            ⏭️
          </button>
          
          <button 
            className={`${styles.controlButton} ${shuffle ? styles.active : ''}`} 
            onClick={toggleShuffle}
            aria-label="随机播放"
          >
            🔀
          </button>
        </div>
      </div>
    </div>
  );
} 