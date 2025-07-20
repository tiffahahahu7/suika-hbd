import { useState, useRef, useEffect } from 'react';
import { DndContext, useDraggable } from '@dnd-kit/core';
import Fruit from './Fruit';
import hbd from '../assets/happy-birthday.gif';
import mickeyHbd from '../assets/mickey-hbd.gif';
import cherry from '../assets/fruits/1 - cherry.png';
import strawberry from '../assets/fruits/2 - strawberry.png';
import grape from '../assets/fruits/3 - grape.png';
import dekopon from '../assets/fruits/4 - dekopon.png';
import orange from '../assets/fruits/5 - orange.png';
import apple from '../assets/fruits/6 - apple.png';
import pear from '../assets/fruits/7 - pear.png';
import peach from '../assets/fruits/8 - peach.png';
import pineapple from '../assets/fruits/9 - pineapple.png';
import melon from '../assets/fruits/10 - melon.png';
import watermelon from '../assets/fruits/11 - watermelon.png';
import popSound from '../assets/music/pop.mp3';
import hbdSound from '../assets/music/hbd.mp3';

const fruitImages = [
  cherry,
  strawberry,
  grape,
  dekopon,
  orange,
  apple,
  pear,
  peach,
  pineapple,
  melon,
  watermelon,
];

// Sizes for each fruit type
const fruitSizes = [40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120];

function getNextType(typeIdx) {
  return typeIdx < fruitImages.length - 1 ? typeIdx + 1 : typeIdx;
}

function playSound(src) {
  const audio = new Audio(src);
  audio.play();
}

function getRandomPosition(size, areaWidth, areaHeight) {
  const x = Math.floor(Math.random() * Math.max(1, areaWidth - size));
  const y = Math.floor(Math.random() * Math.max(1, areaHeight - size));
  return { x, y };
}
export default function FruitGame() {
  const gameAreaRef = useRef(null);
  const [areaSize, setAreaSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function updateSize() {
      if (gameAreaRef.current) {
        setAreaSize({
          width: gameAreaRef.current.offsetWidth,
          height: gameAreaRef.current.offsetHeight,
        });
      }
    }
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const [fruits, setFruits] = useState([
    { id: 1, type: 0, x: 100, y: 100 },
    { id: 2, type: 0, x: 200, y: 100 },
    { id: 3, type: 1, x: 300, y: 100 },
    { id: 4, type: 2, x: 400, y: 100 },
    { id: 5, type: 3, x: 500, y: 100 },
    { id: 6, type: 4, x: 100, y: 200 },
    { id: 7, type: 5, x: 200, y: 200 },
    { id: 8, type: 6, x: 300, y: 200 },
    { id: 9, type: 7, x: 400, y: 200 },
    { id: 10, type: 8, x: 500, y: 200 },
    { id: 11, type: 9, x: 100, y: 300 },
    { id: 12, type: 10, x: 200, y: 300 },
  ]);
  const [showGif, setShowGif] = useState(false); 

useEffect(() => {
  if (areaSize.width && areaSize.height) {
    setFruits([
      { id: 1, type: 0, ...getRandomPosition(fruitSizes[0], areaSize.width, areaSize.height) },
      { id: 2, type: 0, ...getRandomPosition(fruitSizes[0], areaSize.width, areaSize.height) },
      { id: 3, type: 1, ...getRandomPosition(fruitSizes[1], areaSize.width, areaSize.height) },
      { id: 4, type: 2, ...getRandomPosition(fruitSizes[2], areaSize.width, areaSize.height) },
      { id: 5, type: 3, ...getRandomPosition(fruitSizes[3], areaSize.width, areaSize.height) },
      { id: 6, type: 4, ...getRandomPosition(fruitSizes[4], areaSize.width, areaSize.height) },
      { id: 7, type: 5, ...getRandomPosition(fruitSizes[5], areaSize.width, areaSize.height) },
      { id: 8, type: 6, ...getRandomPosition(fruitSizes[6], areaSize.width, areaSize.height) },
      { id: 9, type: 7, ...getRandomPosition(fruitSizes[7], areaSize.width, areaSize.height) },
      { id: 10, type: 8, ...getRandomPosition(fruitSizes[8], areaSize.width, areaSize.height) },
      { id: 11, type: 9, ...getRandomPosition(fruitSizes[9], areaSize.width, areaSize.height) },
      { id: 12, type: 10, ...getRandomPosition(fruitSizes[10], areaSize.width, areaSize.height) },
    ]);
  }
}, [areaSize.width, areaSize.height]);

  // Helper to check collision between two fruits
  function isColliding(f1, f2) {
    const size = fruitSizes[f1.type];
    return (
      Math.abs(f1.x - f2.x) < size &&
      Math.abs(f1.y - f2.y) < size
    );
  }

function handleDragEnd(event) {
  const { active, delta } = event;
  setFruits(fruits => {
    const movedFruit = fruits.find(f => f.id === active.id);
    if (!movedFruit) return fruits;
    const size = fruitSizes[movedFruit.type];
    const newX = Math.max(0, Math.min(movedFruit.x + delta.x, areaSize.width - size));
    const newY = Math.max(0, Math.min(movedFruit.y + delta.y, areaSize.height - size));
    // Update position
    let updatedFruits = fruits.map(f =>
      f.id === active.id ? { ...f, x: newX, y: newY } : f
    );
    // Check for collision with any fruit
    const collided = updatedFruits.find(
      f =>
        f.id !== active.id &&
        isColliding({ ...movedFruit, x: newX, y: newY }, f)
    );
    if (collided) {
      if (collided.type === movedFruit.type) {
        // If merging two watermelons, show hbd gif
        if (movedFruit.type === fruitImages.length - 1) {
          playSound(hbdSound);
          setShowGif(true);
          return [];
        }
        playSound(popSound);
        const nextType = getNextType(movedFruit.type);
        const newFruit = {
          id: Date.now(),
          type: nextType,
          x: newX,
          y: newY,
        };
        updatedFruits = updatedFruits
          .filter(f => f.id !== active.id && f.id !== collided.id)
          .concat(newFruit);
      }
    }
    return updatedFruits;
  });
}

useEffect(() => {
  const unlockAudio = () => {
    const audio = new Audio();
    audio.play().catch(() => {});
    window.removeEventListener('touchstart', unlockAudio);
    window.removeEventListener('mousedown', unlockAudio);
  };
  window.addEventListener('touchstart', unlockAudio, { once: true });
  window.addEventListener('mousedown', unlockAudio, { once: true });
}, []);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="game-area" ref={gameAreaRef}>
        {fruits.map(fruit => (
          <Fruit
            key={fruit.id}
            id={fruit.id}
            src={fruitImages[fruit.type]}
            size={fruitSizes[fruit.type]}
            x={fruit.x}
            y={fruit.y}
          />
        ))}
      </div>
      {showGif && (
        <div className="celebration" key="celebration">
          <img className='celebration-gif' src={hbd} alt="Happy Birthday" />
          <img className='celebration-gif' src={mickeyHbd} alt="Happy Birthday" />
        </div>
      )}
    </DndContext>
  );
}