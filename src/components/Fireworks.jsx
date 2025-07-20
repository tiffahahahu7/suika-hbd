import { useEffect } from 'react';

const Fireworks = () => {
  useEffect(() => {
    const handleClick = (event) => {
      const color = `hsl(${Math.random() * 360}, 100%, 70%)`;
      const angles = [0, 45, 90, 135, 180, 225, 270, 315];
      const x = event.clientX;
      const y = event.clientY;

      const createParticles = (distance) => {
        angles.forEach((angle) => {
          const particle = document.createElement('div');
          particle.classList.add('particle');
          document.body.appendChild(particle);

          const radian = angle * (Math.PI / 180);
          const offsetX = Math.cos(radian) * distance;
          const offsetY = Math.sin(radian) * distance;

          particle.style.left = `${x - 3}px`;
          particle.style.top = `${y - 3}px`;
          particle.style.backgroundColor = color;
          particle.style.setProperty('--x', `${offsetX}px`);
          particle.style.setProperty('--y', `${offsetY}px`);
          particle.style.filter = `drop-shadow(0px 0px 6px ${color})`;

          requestAnimationFrame(() => {
            particle.style.opacity = '1';
          });

          setTimeout(() => {
            particle.remove();
          }, 2000);
        });
      };

      createParticles(50);
      setTimeout(() => createParticles(100), 105);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null; 
};

export default Fireworks;
