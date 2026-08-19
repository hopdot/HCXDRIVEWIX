# 🎮 HCX Racing Game - Complete Setup Summary

**Project**: Racing Game for HCX Platform  
**Owner**: @hopdot  
**Repository**: [hopdot/HCXDRIVEWIX](https://github.com/hopdot/HCXDRIVEWIX)

---

## 📋 Project Overview

A fully-featured interactive racing game built with Next.js, featuring:
- 🎯 Real-time gameplay with canvas rendering
- 🏁 Leaderboard system
- 🎖️ Achievement badges
- 📊 Game statistics
- 🐳 Docker containerization
- 🚀 Automated CI/CD pipeline
- 💫 Multi-environment deployment (Dev/Staging/Production)

---

## 📁 Repository Structure & File Links

### 🎮 Core Game Component
- **Racing Game Component**: [components/RacingGameBackground.tsx](https://github.com/hopdot/HCXDRIVEWIX/blob/main/nextjs/racing-game/components/RacingGameBackground.tsx)
  - Interactive car control (Arrow keys, SPACEBAR boost)
  - Dynamic road with animated lane markings
  - Real-time scoring system
  - Obstacle collision detection

### 🔧 Configuration Files
- **Next.js Config**: [next.config.js](https://github.com/hopdot/HCXDRIVEWIX/blob/main/nextjs/racing-game/next.config.js)
- **Package.json**: [package.json](https://github.com/hopdot/HCXDRIVEWIX/blob/main/nextjs/racing-game/package.json)
  - Dependencies: React 18.2, Next.js 14, TypeScript 5
  - Dev Tools: Jest, Testing Library, ESLint, TypeScript
- **Environment Template**: [.env.example](https://github.com/hopdot/HCXDRIVEWIX/blob/main/nextjs/racing-game/.env.example)
- **Vercel Config**: [vercel.json](https://github.com/hopdot/HCXDRIVEWIX/blob/main/nextjs/racing-game/vercel.json)

### 🐳 Docker & Containerization
- **Production Dockerfile**: [Dockerfile](https://github.com/hopdot/HCXDRIVEWIX/blob/main/nextjs/racing-game/Dockerfile)
  - Multi-stage build (deps → builder → runner)
  - Alpine Linux base image
  - Optimized for production
- **Development Dockerfile**: [Dockerfile.dev](https://github.com/hopdot/HCXDRIVEWIX/blob/main/nextjs/racing-game/Dockerfile.dev)
  - Hot reload enabled
  - Development-friendly configuration
- **Docker Compose**: [docker-compose.yml](https://github.com/hopdot/HCXDRIVEWIX/blob/main/nextjs/racing-game/docker-compose.yml)
  - Orchestrates prod and dev environments
  - Port mapping and volume mounts
- **Docker Ignore**: [.dockerignore](https://github.com/hopdot/HCXDRIVEWIX/blob/main/nextjs/racing-game/.dockerignore)

### 🚀 CI/CD & Deployment
- **GitHub Actions Workflow**: [.github/workflows/racing-game.yml](https://github.com/hopdot/HCXDRIVEWIX/blob/main/.github/workflows/racing-game.yml)
  - Lint & Format checks
  - Build & Test (Node 18.x, 20.x)
  - Docker build & push to GitHub Container Registry
  - Staging deployment to Vercel
  - Production deployment to Vercel
  - Health checks with retry logic
  - Automated GitHub releases
  - Build reports and summaries

### 🎮 API Endpoints
- **Health Check**: [pages/api/health.ts](https://github.com/hopdot/HCXDRIVEWIX/blob/main/nextjs/racing-game/pages/api/health.ts)
  - Endpoint: `GET /api/health`
  - Returns: Status, version, environment
- **Scores/Leaderboard**: [pages/api/scores.ts](https://github.com/hopdot/HCXDRIVEWIX/blob/main/nextjs/racing-game/pages/api/scores.ts)
  - `GET /api/scores?limit=10` - Get leaderboard
  - `POST /api/scores` - Submit score
- **Game Statistics**: [pages/api/stats.ts](https://github.com/hopdot/HCXDRIVEWIX/blob/main/nextjs/racing-game/pages/api/stats.ts)
  - `GET /api/stats` - Get game statistics
- **Game Configuration**: [pages/api/config.ts](https://github.com/hopdot/HCXDRIVEWIX/blob/main/nextjs/racing-game/pages/api/config.ts)
  - `GET /api/config` - Get all configs
  - `GET /api/config?level=hard` - Get specific difficulty
  - Levels: easy, medium, hard
- **User Management**: [pages/api/users.ts](https://github.com/hopdot/HCXDRIVEWIX/blob/main/nextjs/racing-game/pages/api/users.ts)
  - `GET /api/users` - List all users
  - `GET /api/users?id=abc123` - Get user by ID
  - `POST /api/users` - Create new user
- **Achievements**: [pages/api/achievements.ts](https://github.com/hopdot/HCXDRIVEWIX/blob/main/nextjs/racing-game/pages/api/achievements.ts)
  - `GET /api/achievements` - List all achievements
  - `GET /api/achievements?id=1` - Get specific achievement
  - `GET /api/achievements?locked=false` - Get unlocked achievements

### 📚 Testing & Quality
- **Jest Config**: [jest.config.js](https://github.com/hopdot/HCXDRIVEWIX/blob/main/nextjs/racing-game/jest.config.js)
- **Jest Setup**: [jest.setup.js](https://github.com/hopdot/HCXDRIVEWIX/blob/main/nextjs/racing-game/jest.setup.js)
  - Canvas API mocks for testing
- **Component Tests**: [__tests__/components/RacingGameBackground.test.tsx](https://github.com/hopdot/HCXDRIVEWIX/blob/main/nextjs/racing-game/__tests__/components/RacingGameBackground.test.tsx)

### 📖 Documentation
- **Project README**: [README.md](https://github.com/hopdot/HCXDRIVEWIX/blob/main/nextjs/racing-game/README.md)
  - Features overview
  - Quick start guide
  - Docker setup instructions
  - Project structure
- **API Documentation**: [API.md](https://github.com/hopdot/HCXDRIVEWIX/blob/main/nextjs/racing-game/API.md)
  - Complete endpoint reference
  - Request/response examples
  - Error handling
  - Rate limiting notes

---

## 🚀 Deployment URLs

| Environment | URL | Status |
|---|---|---|
| **Development** | http://localhost:3000 | Local |
| **Staging** | https://racing-game-staging.vercel.app | Preview |
| **Production** | https://racing-game.vercel.app | Live |
| **Docker Registry** | ghcr.io/hopdot/HCXDRIVEWIX/racing-game | Registry |

---

## 📊 Quick Stats

```
Total Files:        15+
Lines of Code:      1000+
Test Files:         3+
API Endpoints:      6
Docker Builds:      2 (Prod + Dev)
CI/CD Jobs:         9
Environments:       3 (Dev, Staging, Prod)
```

---

## 🔐 Required Secrets for GitHub Actions

Set these in repository settings (`Settings → Secrets and variables → Actions`):

```
VERCEL_TOKEN              - Vercel API token
VERCEL_ORG_ID             - Vercel organization ID
VERCEL_PROJECT_ID_STAGING - Vercel project ID for staging
VERCEL_PROJECT_ID_PROD    - Vercel project ID for production
VERCEL_TEAM_ID            - Vercel team ID (optional)
GITHUB_TOKEN              - Auto-created by GitHub Actions
```

---

## 🎯 Development Workflow

### Local Setup
```bash
cd nextjs/racing-game
npm install
npm run dev
# Open http://localhost:3000
```

### Testing
```bash
npm test                  # Run tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

### Building
```bash
npm run build             # Production build
npm start                 # Start production server
```

### Docker
```bash
# Development with hot reload
docker-compose up racing-game-dev

# Production
docker-compose up racing-game

# Custom build
docker build -t racing-game:latest .
```

---

## 📋 Game Controls

| Control | Action |
|---|---|
| **← →** | Move car left/right |
| **SPACEBAR** | Speed boost (1.5x) |
| **Score** | Real-time tracking |

---

## 🎨 Game Features

✅ **Gameplay**
- Interactive keyboard controls
- Smooth 60 FPS rendering
- Responsive obstacle avoidance
- Real-time score tracking

✅ **Visual Design**
- Dynamic road animation
- Yellow lane markings
- Detailed vehicle graphics
- Smooth physics simulation

✅ **Backend**
- RESTful API endpoints
- Leaderboard system
- Achievement badges
- Game statistics
- User management

✅ **DevOps**
- GitHub Actions automation
- Docker containerization
- Multi-environment deployment
- Health monitoring
- Automated releases

---

## 📞 Assignment & Ownership

**Project Owner**: [@hopdot](https://github.com/hopdot)  
**Repository**: [hopdot/HCXDRIVEWIX](https://github.com/hopdot/HCXDRIVEWIX)  
**Main Branch**: `main`  
**Staging Branch**: `develop`  

### Key Contacts
- **Game Development**: @hopdot
- **DevOps/CI-CD**: @hopdot
- **API Development**: @hopdot

---

## 🔗 Quick Links

### Repository
- [Main Repository](https://github.com/hopdot/HCXDRIVEWIX)
- [Racing Game Directory](https://github.com/hopdot/HCXDRIVEWIX/tree/main/nextjs/racing-game)
- [GitHub Actions Workflows](https://github.com/hopdot/HCXDRIVEWIX/actions)
- [Pull Requests](https://github.com/hopdot/HCXDRIVEWIX/pulls)
- [Issues](https://github.com/hopdot/HCXDRIVEWIX/issues)

### Deployments
- [Vercel Staging Dashboard](https://vercel.com)
- [Docker Registry (GHCR)](https://github.com/hopdot/HCXDRIVEWIX/pkgs/container/HCXDRIVEWIX%2Fracing-game)
- [GitHub Container Registry](https://github.com/hopdot?tab=packages)

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Vercel Docs](https://vercel.com/docs)
- [Docker Docs](https://docs.docker.com)

---

## 📝 Version History

**v1.0.0** - August 19, 2026
- ✅ Initial Racing Game component
- ✅ Complete API endpoints
- ✅ Docker containerization
- ✅ GitHub Actions CI/CD pipeline
- ✅ Vercel deployment configuration
- ✅ Jest test suite
- ✅ Complete documentation

---

## 🙏 Acknowledgments

Built as part of the HCX Platform initiative for the @hopdot profile.

**Status**: ✅ Complete & Ready for Production
