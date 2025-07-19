import { useState } from 'react';
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

export default function FruitGame() {
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
      const newX = movedFruit.x + delta.x;
      const newY = movedFruit.y + delta.y;
      // Update position
      let updatedFruits = fruits.map(f =>
        f.id === active.id ? { ...f, x: newX, y: newY } : f
      );
      // Check for collision and merge
      const collided = updatedFruits.find(
        f =>
          f.id !== active.id &&
          f.type === movedFruit.type &&
          isColliding({ ...movedFruit, x: newX, y: newY }, f)
      );
      if (collided) {
        // If merging two watermelons, show hbd gif
        if (movedFruit.type === fruitImages.length - 1) {
          setShowGif(true);
          return [];
        }
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
      return updatedFruits;
    });
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="game-area">
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
        <div className="celebration">
          <img className='celebration-gif' src={hbd} alt="Happy Birthday" />
          <img className='celebration-gif' src={mickeyHbd} alt="Happy Birthday" />
        </div>
      )}
    </DndContext>
  );
}