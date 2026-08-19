# HCX Racing Game 🎮

An interactive racing game built with Next.js and React, featuring a dynamic road environment, obstacle avoidance, and real-time scoring system.

## Features

✅ **Interactive Gameplay**
- Arrow key controls for car movement
- SPACEBAR for speed boost
- Real-time score tracking
- Obstacle collision detection

✅ **Performance Optimized**
- Smooth 60 FPS gameplay
- Optimized rendering with Canvas API
- Responsive design

✅ **Development Ready**
- TypeScript support
- Docker containerization
- CI/CD pipeline with GitHub Actions
- Multi-environment deployment (staging/production)

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the game.

## Docker Setup

### Build Image

```bash
docker build -t hcx-racing-game:latest .
```

### Run Container

```bash
docker run -p 3000:3000 -e ENVIRONMENT=production hcx-racing-game:latest
```

### Docker Compose

```bash
# Run production environment
docker-compose up racing-game

# Run development environment with hot reload
docker-compose up racing-game-dev
```

## Project Structure

```
nextjs/racing-game/
├── components/
│   └── RacingGameBackground.tsx    # Main game component
├── pages/
│   ├── index.tsx                   # Home page
│   └── api/
│       └── health.ts               # Health check endpoint
├── public/                          # Static assets
├── Dockerfile                       # Production image
├── Dockerfile.dev                   # Development image
├── docker-compose.yml              # Docker Compose config
└── next.config.js                  # Next.js configuration
```

## Game Controls

| Control | Action |
|---------|--------|
| ← | Move left |
| → | Move right |
| SPACEBAR | Speed boost |

## Environment Variables

See `.env.example` for all available variables.

## Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel
vercel
```

### GitHub Pages

The project includes GitHub Actions workflow for automated deployment.

## CI/CD Pipeline

The repository includes GitHub Actions workflows that:

1. **Build & Test** - Compile and test on Node 18.x and 20.x
2. **Docker** - Build and push Docker images
3. **Deploy** - Automatic deployment to staging and production
4. **Health Check** - Verify deployment endpoints

## API Endpoints

### Health Check

```bash
GET /api/health
```

Returns:
```json
{
  "status": "ok",
  "version": "1.0.0",
  "environment": "production"
}
```

## Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Type checking
npm run type-check
```

## Performance

- **FCP**: < 1s
- **LCP**: < 2s
- **CLS**: < 0.1
- **Frame Rate**: 60 FPS

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - See LICENSE file for details

## Support

For issues and questions, please open an issue on GitHub or contact the development team.

## Roadmap

- [ ] Multiplayer support
- [ ] Power-ups system
- [ ] Leaderboard
- [ ] Mobile optimizations
- [ ] Sound effects and music
- [ ] Different game modes
