import React, { useEffect, useRef } from 'react';

interface RacingGameBackgroundProps {
  width?: number;
  height?: number;
  speed?: number;
  carColor?: string;
}

export const RacingGameBackground: React.FC<RacingGameBackgroundProps> = ({
  width = 800,
  height = 600,
  speed = 3,
  carColor = '#ff6b00',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let roadOffset = 0;
    let carY = height - 100;
    let carX = width / 2 - 25;
    let carVelX = 0;
    let isAccelerating = false;
    let score = 0;

    // Keyboard controls
    const keys: { [key: string]: boolean } = {};

    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = true;
      if (e.key === ' ') isAccelerating = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = false;
      if (e.key === ' ') isAccelerating = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Draw road
    const drawRoad = () => {
      // Road background
      ctx.fillStyle = '#333';
      ctx.fillRect(0, 0, width, height);

      // Road
      ctx.fillStyle = '#444';
      ctx.fillRect(width / 4, 0, width / 2, height);

      // Road lines animation
      ctx.strokeStyle = '#ffff00';
      ctx.lineWidth = 3;
      ctx.setLineDash([20, 20]);

      for (let i = -1; i < height / 40; i++) {
        const yPos = (i * 40 + roadOffset) % height;
        ctx.beginPath();
        ctx.moveTo(width / 2, yPos);
        ctx.lineTo(width / 2, yPos + 30);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Road edges
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width / 4, 0);
      ctx.lineTo(width / 4, height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo((3 * width) / 4, 0);
      ctx.lineTo((3 * width) / 4, height);
      ctx.stroke();
    };

    // Draw player car
    const drawCar = (x: number, y: number) => {
      // Car body
      ctx.fillStyle = carColor;
      ctx.fillRect(x, y, 50, 80);

      // Car window
      ctx.fillStyle = '#87ceeb';
      ctx.fillRect(x + 5, y + 15, 40, 25);

      // Wheels
      ctx.fillStyle = '#000';
      ctx.fillRect(x + 5, y, 10, 15);
      ctx.fillRect(x + 35, y, 10, 15);
      ctx.fillRect(x + 5, y + 65, 10, 15);
      ctx.fillRect(x + 35, y + 65, 10, 15);

      // Wheel rims
      ctx.strokeStyle = '#silver';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x + 10, y + 7.5, 5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x + 40, y + 7.5, 5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x + 10, y + 72.5, 5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x + 40, y + 72.5, 5, 0, Math.PI * 2);
      ctx.stroke();

      // Headlights
      ctx.fillStyle = '#ffff00';
      ctx.fillRect(x + 8, y - 2, 8, 3);
      ctx.fillRect(x + 34, y - 2, 8, 3);
    };

    // Draw obstacles
    const drawObstacle = (x: number, y: number) => {
      ctx.fillStyle = '#e74c3c';
      ctx.fillRect(x, y, 50, 80);
      ctx.fillStyle = '#c0392b';
      ctx.fillRect(x + 5, y + 15, 40, 25);
      ctx.fillStyle = '#000';
      ctx.fillRect(x + 5, y, 10, 15);
      ctx.fillRect(x + 35, y, 10, 15);
      ctx.fillRect(x + 5, y + 65, 10, 15);
      ctx.fillRect(x + 35, y + 65, 10, 15);
    };

    // Draw HUD
    const drawHUD = () => {
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 20px Arial';
      ctx.fillText(`Score: ${Math.floor(score)}`, 20, 30);
      ctx.font = 'bold 16px Arial';
      ctx.fillText('Controls: ← → Arrow Keys to Move', 20, 60);
      ctx.fillText('SPACE to Accelerate', 20, 90);
    };

    // Game loop
    const gameLoop = () => {
      // Clear canvas
      drawRoad();

      // Car movement
      const moveSpeed = 5;
      if (keys['arrowleft']) carVelX = -moveSpeed;
      else if (keys['arrowright']) carVelX = moveSpeed;
      else carVelX *= 0.8; // Friction

      carX += carVelX;

      // Boundary checking
      if (carX < width / 4 + 5) carX = width / 4 + 5;
      if (carX + 50 > (3 * width) / 4 - 5) carX = (3 * width) / 4 - 55;

      // Speed boost
      const speedMultiplier = isAccelerating ? 1.5 : 1;
      roadOffset += speed * speedMultiplier;

      // Draw obstacles
      const obstacleSpacing = 150;
      for (let i = 0; i < 5; i++) {
        const obstacleY =
          (i * obstacleSpacing - roadOffset) % (height + 150) - 150;
        const obstacleX = width / 2 - 25 + (i % 2 === 0 ? -70 : 70);
        drawObstacle(obstacleX, obstacleY);
      }

      // Draw player car
      drawCar(carX, carY);

      // Draw HUD
      drawHUD();

      // Update score
      score += speed * speedMultiplier * 0.1;

      requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [width, height, speed, carColor]);

  return (
    <div className="flex flex-col items-center justify-center bg-black p-4">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border-4 border-yellow-400 shadow-lg"
      />
      <div className="mt-4 text-center">
        <p className="text-white font-bold text-lg">HCX Racing Game</p>
        <p className="text-gray-400 text-sm">Navigate the traffic and earn points!</p>
      </div>
    </div>
  );
};

export default RacingGameBackground;
