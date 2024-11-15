import React, { useEffect, useRef, useState } from 'react'
import canvasImages from './canvasimages'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

function Canvas({ details }) {
  const { startIndex, numImages, duration, size, top, left, zIndex } = details;
  const canvasRef = useRef(null);
  const [index, setIndex] = useState({ value: startIndex });
  const scrollSpeed = useRef(Math.random().toFixed(1)); // Store random speed in ref

  useGSAP(() => {
    gsap.to(index, {
      value: startIndex + numImages - 1,
      duration: duration,
      ease: 'linear',
      repeat: -1,
      onUpdate: () => {
        setIndex({ value: Math.round(index.value) });
      }
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = canvasImages[index.value];
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
  }, [index.value]);

  return (
    <canvas 
      data-scroll
      data-scroll-speed={scrollSpeed.current}
      ref={canvasRef}
      className='absolute'
      style={{
        width: `${size}px`,
        height: `${size}px`,
        position: 'absolute',
        top: `${top}%`,
        left: `${left}%`,
        zIndex: zIndex
      }}
    />
  );
}

export default Canvas