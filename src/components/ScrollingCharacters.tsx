"use client";

import React, { useEffect, useState, useRef } from 'react';
import styles from './ScrollingCharacters.module.css';

export default function ScrollingCharacters() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [characters, setCharacters] = useState<Array<{
    id: number;
    position: number;
    isPaused: boolean;
    frameIndex: number; // 当前帧索引
  }>>([]);

  // 精灵图动画帧数
  const frameCount = 2; // 假设精灵图有2帧

  useEffect(() => {
    // 初始化角色
    const characterCount = 15;
    const initialCharacters = Array(characterCount).fill(null).map((_, index) => ({
      id: index,
      position: -100 - (index * 100), // 错开初始位置
      isPaused: false,
      frameIndex: 0 // 初始帧
    }));
    
    setCharacters(initialCharacters);

    // 动画循环 - 位置移动
    let moveAnimationId: number;
    
    const animateMovement = () => {
      setCharacters(prevCharacters => {
        return prevCharacters.map(character => {
          if (character.isPaused) return character;

          let newPosition = character.position + 2; // 移动速度
          const containerWidth = window.innerWidth;
          
          // 如果超出屏幕右侧，重置到左侧
          if (newPosition > containerWidth) {
            newPosition = -100;
          }
          
          return {
            ...character,
            position: newPosition
          };
        });
      });
      
      moveAnimationId = requestAnimationFrame(animateMovement);
    };
    
    moveAnimationId = requestAnimationFrame(animateMovement);

    // 帧动画循环 - 每200ms切换一次精灵图帧
    const frameInterval = setInterval(() => {
      setCharacters(prevCharacters => {
        return prevCharacters.map(character => {
          if (character.isPaused) return character;
          
          // 循环切换帧
          const nextFrameIndex = (character.frameIndex + 1) % frameCount;
          
          return {
            ...character,
            frameIndex: nextFrameIndex
          };
        });
      });
    }, 200); // 帧切换速度，可以根据需要调整
    
    return () => {
      cancelAnimationFrame(moveAnimationId);
      clearInterval(frameInterval);
    };
  }, []);

  const handleMouseEnter = (id: number) => {
    setCharacters(prevCharacters => 
      prevCharacters.map(char => 
        char.id === id ? { ...char, isPaused: true } : char
      )
    );
  };

  const handleMouseLeave = (id: number) => {
    setCharacters(prevCharacters => 
      prevCharacters.map(char => 
        char.id === id ? { ...char, isPaused: false } : char
      )
    );
  };

  return (
    <div className={styles.bottomContainer} ref={containerRef}>
      {characters.map((character) => (
        <div
          key={character.id}
          className={styles.bottomCharacter}
          style={{ 
            left: `${character.position}px`,
          }}
          onMouseEnter={() => handleMouseEnter(character.id)}
          onMouseLeave={() => handleMouseLeave(character.id)}
        >
          <div 
            className={styles.spriteImage}
            style={{
              backgroundPosition: `-${character.frameIndex * 80}px 0` // 假设每帧宽度为80px
            }}
          />
        </div>
      ))}
    </div>
  );
} 