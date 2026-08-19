import React, { useEffect, useRef, useState } from 'react';

interface RacingGameBackgroundProps {
  width?: number;
  height?: number;
  speed?: number;
  carColor?: string;
}

interface GameState {
  carX: number;
  carY: number;
  score: number;
  gameActive: boolean;
  isBoosting: boolean;
  boostTime: number;
}

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  id: number;
}

const RacingGameBackground: React.FC<RacingGameBackgroundProps> = ({
  width = 800,
  height = 600,
  speed = 3,
  carColor = '#ff6b00',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>({
    carX: width / 2 - 25,
    carY: height - 100,
    score: 0,
    gameActive: true,
    isBoosting: false,
    boostTime: 0,
  });

  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const roadOffsetRef = useRef(0);
  const obstacleCounterRef = useRef(0);
  const obstacleIdRef = useRef(0);

  // Keyboard event handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true;

      if (e.code === 'Space') {
        e.preventDefault();
        setGameState((prev) => {
          if (prev.boostTime === 0 && prev.gameActive) {
            return {
              ...prev,
              isBoosting: true,
              boostTime: 30,
            };
          }
          return prev;
        });
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Main game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let scoreCounter = 0;

    const drawRoad = () => {
      // Road background
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, width, height);

      // Road
      ctx.fillStyle = '#444';
      ctx.fillRect(width / 4, 0, width / 2, height);

      // Road lines animation
      ctx.strokeStyle = '#ffff00';
      ctx.lineWidth = 3;
      ctx.setLineDash([20, 20]);

      for (let i = -1; i < height / 40; i++) {
        const yPos = (i * 40 + roadOffsetRef.current) % height;
        ctx.beginPath();
        ctx.moveTo(width / 2, yPos);
        ctx.lineTo(width / 2, yPos + 30);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Road edges
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(width / 4, 0);
      ctx.lineTo(width / 4, height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo((3 * width) / 4, 0);
      ctx.lineTo((3 * width) / 4, height);
      ctx.stroke();
    };

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
      ctx.strokeStyle = '#c0c0c0';
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

      // Boost flame effect
      if (gameState.isBoosting) {\n        ctx.fillStyle = 'rgba(255, 165, 0, 0.8)';\n        ctx.fillRect(x + 10, y + 80, 30, 20);\n        ctx.fillStyle = 'rgba(255, 69, 0, 0.6)';\n        ctx.fillRect(x + 15, y + 85, 20, 15);\n      }\n    };\n\n    const drawObstacle = (x: number, y: number) => {\n      ctx.fillStyle = '#e74c3c';\n      ctx.fillRect(x, y, 50, 80);\n      ctx.fillStyle = '#c0392b';\n      ctx.fillRect(x + 5, y + 15, 40, 25);\n      ctx.fillStyle = '#000';\n      ctx.fillRect(x + 5, y, 10, 15);\n      ctx.fillRect(x + 35, y, 10, 15);\n      ctx.fillRect(x + 5, y + 65, 10, 15);\n      ctx.fillRect(x + 35, y + 65, 10, 15);\n\n      // Warning stripes\n      ctx.strokeStyle = '#ff00ff';\n      ctx.lineWidth = 2;\n      ctx.beginPath();\n      ctx.moveTo(x, y);\n      ctx.lineTo(x + 50, y + 80);\n      ctx.stroke();\n    };\n\n    const drawHUD = () => {\n      ctx.fillStyle = '#fff';\n      ctx.font = 'bold 20px Arial';\n      ctx.fillText(`Score: ${Math.floor(gameState.score)}`, 20, 30);\n\n      if (gameState.boostTime > 0) {\n        ctx.fillStyle = '#FFD700';\n        ctx.font = 'bold 18px Arial';\n        ctx.fillText(`BOOST: ${gameState.boostTime}`, width - 180, 30);\n      }\n\n      ctx.fillStyle = '#ccc';\n      ctx.font = '14px Arial';\n      ctx.fillText('← → Move | SPACE Boost', 20, height - 20);\n    };\n\n    const drawGameOver = () => {\n      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';\n      ctx.fillRect(0, 0, width, height);\n\n      ctx.fillStyle = '#fff';\n      ctx.font = 'bold 50px Arial';\n      ctx.textAlign = 'center';\n      ctx.fillText('GAME OVER', width / 2, height / 2 - 40);\n\n      ctx.font = 'bold 30px Arial';\n      ctx.fillStyle = '#FFD700';\n      ctx.fillText(`Final Score: ${Math.floor(gameState.score)}`, width / 2, height / 2 + 20);\n\n      ctx.font = '18px Arial';\n      ctx.fillStyle = '#fff';\n      ctx.fillText('Press SPACE or click to restart', width / 2, height / 2 + 80);\n      ctx.textAlign = 'left';\n    };\n\n    const gameLoop = () => {\n      if (!gameState.gameActive) {\n        drawRoad();\n        drawGameOver();\n        animationId = requestAnimationFrame(gameLoop);\n        return;\n      }\n\n      // Draw road\n      drawRoad();\n\n      // Update car position\n      setGameState((prev) => {\n        let newCarX = prev.carX;\n        const moveSpeed = prev.isBoosting ? 7 : 5;\n\n        if (keysPressed.current['arrowleft'] || keysPressed.current['a']) {\n          newCarX = Math.max(width / 4 + 5, newCarX - moveSpeed);\n        }\n        if (keysPressed.current['arrowright'] || keysPressed.current['d']) {\n          newCarX = Math.min((3 * width) / 4 - 55, newCarX + moveSpeed);\n        }\n\n        let newBoostTime = prev.boostTime - 1;\n        if (newBoostTime < 0) newBoostTime = 0;\n\n        return {\n          ...prev,\n          carX: newCarX,\n          boostTime: newBoostTime,\n          isBoosting: newBoostTime > 0,\n        };\n      });\n\n      // Draw player car\n      drawCar(gameState.carX, gameState.carY);\n\n      // Generate obstacles\n      obstacleCounterRef.current++;\n      if (obstacleCounterRef.current > 100) {\n        const lanes = [width / 4 + 10, width / 2 - 25, (3 * width) / 4 - 60];\n        const randomLane = lanes[Math.floor(Math.random() * lanes.length)];\n\n        setObstacles((prev) => [\n          ...prev,\n          {\n            x: randomLane,\n            y: -80,\n            width: 50,\n            height: 80,\n            id: obstacleIdRef.current++,\n          },\n        ]);\n        obstacleCounterRef.current = 0;\n      }\n\n      // Update and draw obstacles\n      setObstacles((prev) => {\n        const speedMultiplier = gameState.isBoosting ? 1.2 : 1;\n        const updated = prev\n          .map((obs) => ({\n            ...obs,\n            y: obs.y + speed * speedMultiplier + 1,\n          }))\n          .filter((obs) => obs.y < height + 100);\n\n        // Draw obstacles\n        updated.forEach((obs) => {\n          drawObstacle(obs.x, obs.y);\n        });\n\n        // Collision detection\n        let hasCollision = false;\n        updated.forEach((obs) => {\n          if (\n            gameState.carX < obs.x + obs.width &&\n            gameState.carX + 50 > obs.x &&\n            gameState.carY < obs.y + obs.height &&\n            gameState.carY + 80 > obs.y\n          ) {\n            hasCollision = true;\n          }\n        });\n\n        if (hasCollision) {\n          setGameState((prev) => ({ ...prev, gameActive: false }));\n        }\n\n        return updated;\n      });\n\n      // Update score\n      scoreCounter += gameState.isBoosting ? 2 : 1;\n      if (scoreCounter > 10) {\n        setGameState((prev) => ({\n          ...prev,\n          score: prev.score + 1,\n        }));\n        scoreCounter = 0;\n      }\n\n      // Update road offset\n      const speedMultiplier = gameState.isBoosting ? 1.5 : 1;\n      roadOffsetRef.current += speed * speedMultiplier;\n\n      // Draw HUD\n      drawHUD();\n\n      animationId = requestAnimationFrame(gameLoop);\n    };\n\n    animationId = requestAnimationFrame(gameLoop);\n\n    return () => {\n      cancelAnimationFrame(animationId);\n    };\n  }, [gameState, width, height, speed, carColor]);\n\n  const resetGame = () => {\n    setGameState({\n      carX: width / 2 - 25,\n      carY: height - 100,\n      score: 0,\n      gameActive: true,\n      isBoosting: false,\n      boostTime: 0,\n    });\n    setObstacles([]);\n    roadOffsetRef.current = 0;\n    obstacleCounterRef.current = 0;\n  };\n\n  return (\n    <div className=\"flex flex-col items-center justify-center bg-black p-4\">\n      <div className=\"w-full max-w-2xl\">\n        <h1 className=\"text-3xl font-bold text-center text-yellow-400 mb-2\">🎮 HCX Racing Game</h1>\n        <p className=\"text-center text-gray-400 mb-4\">Navigate the traffic and earn points!</p>\n\n        <div className=\"relative inline-block w-full\">\n          <canvas\n            ref={canvasRef}\n            width={width}\n            height={height}\n            className=\"border-4 border-yellow-400 shadow-lg w-full\"\n            onClick={!gameState.gameActive ? resetGame : undefined}\n          />\n        </div>\n\n        <div className=\"mt-4 text-center\">\n          <div className=\"text-white text-lg font-bold mb-2\">\n            Current Score: {Math.floor(gameState.score)}\n          </div>\n          <p className=\"text-gray-400 text-sm mb-4\">\n            <strong>Controls:</strong> ← → Arrow Keys to Move | <strong>SPACEBAR</strong> for Boost\n          </p>\n\n          {!gameState.gameActive && (\n            <button\n              onClick={resetGame}\n              className=\"px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition duration-200\"\n            >\n              Play Again\n            </button>\n          )}\n        </div>\n      </div>\n    </div>\n  );\n};\n\nexport default RacingGameBackground;
