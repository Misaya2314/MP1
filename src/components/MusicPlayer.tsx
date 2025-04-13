"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './MusicPlayer.module.css';

type Song = {
  title: string;
  artist: string;
  src: string;
  cover?: string;
};

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  
  const songs: Song[] = [
    {
      title: "夜明けと蛍",
      artist: "n-buna",
      src: "/music/n-buna,初音ミク - 夜明けと蛍.mp3",
      cover: "/images/hanatoame.jpg"
    },
    {
      title: "もうじき夏が終わるから",
      artist: "n-buna",
      src: "/music/n-buna,初音ミク - もうじき夏が終わるから.mp3",
      cover: "/images/hanatoame.jpg"
    },
    {
      title: "乙女よ大志を抱け!!",
      artist: "中村繪里子",
      src: "/music/中村繪里子 - 乙女よ大志を抱け!!.mp3",
      cover: "/images/THE IDOLM@STER ANIM@TION MASTER 02.jpg"
    }
  ];

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    audioRef.current = new Audio(currentSong.src);
    
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
  }, [currentSongIndex]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("播放出错:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const playNextSong = () => {
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