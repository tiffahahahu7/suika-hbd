import { useDraggable } from '@dnd-kit/core';

export default function Fruit({ id, src, size, x, y }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    position: 'absolute',
    left: transform ? x + transform.x : x,
    top: transform ? y + transform.y : y,
    width: size,
    height: size,
    zIndex: 2,
    touchAction: 'none',
    transition: 'width 0.2s, height 0.2s',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="fruit"
    >
      <img src={src} alt="fruit" width={size} height={size} />
    </div>
  );
}