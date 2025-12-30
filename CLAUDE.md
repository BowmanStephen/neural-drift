# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Neural Drift** is a generative art visualization of neural network-inspired particle systems. The philosophical concept is "the computational poetry of signal becoming meaning"—where individual neural impulses coalesce into flowing rivers of understanding through emergent flocking behavior.

## Project Structure

```
neural-drift/
├── files/
│   ├── neural_drift_philosophy.md    # Core philosophy and algorithmic concepts
│   └── neural_drift.html              # Complete self-contained implementation
└── files.zip                         # Archived backup
```

## Technology Stack

- **Frontend**: Pure HTML5 + p5.js v1.7.0 (loaded via CDN)
- **Styling**: CSS3 with custom properties, Google Fonts (Poppins, Lora)
- **Language**: JavaScript ES6+
- **Architecture**: Single-page application, no build process

## Development

```bash
# Open in browser (no build required)
open files/neural_drift.html

# Or serve locally for development
python3 -m http.server 8000 --directory files/
# Then visit http://localhost:8000/neural_drift.html
```

## Core Algorithm Architecture

The system uses a **dual-force architecture**:

### 1. Macro-Level Flow Field (Primary Force)
- Layered Perlin noise fields that create directional currents
- Two noise layers combined: primary flow (70%) + secondary turbulence (30%)
- Evolves over time via z-dimension crawling (`zOffset`)

### 2. Micro-Level Flocking (Secondary Force)
- Particle-to-particle alignment within a configurable radius
- Spatial hashing for O(n) neighbor detection performance
- `cellSize = 30` pixels for the spatial hash grid

### 3. Visual Rendering
- **Color**: Velocity-based interpolation (slow = warm amber, fast = electric blue)
- **Trails**: Alpha fade based on `trailPersistence` parameter
- **Edge wrapping**: Particles wrap around canvas boundaries for continuous flow

## Key Parameters

| Parameter | Range | Default | Effect |
|-----------|-------|---------|--------|
| `particleCount` | 500-8000 | 3000 | Number of neural impulses |
| `flowIntensity` | 0.5-3.0 | 1.5 | Strength of flow field force |
| `noiseScale` | 0.002-0.015 | 0.006 | Granularity of Perlin noise patterns |
| `trailPersistence` | 1-30 | 12 | How long particle trails linger (lower = longer) |
| `neighborInfluence` | 0-1.0 | 0.3 | Flocking alignment strength |
| `timeEvolution` | 0.0001-0.002 | 0.0005 | Rate of flow field metamorphosis |

## Code Organization

The `neural_drift.html` file contains everything in a single document:

- **CSS Section**: Anthropic-inspired design system, glassmorphism sidebar
- **HTML Section**: Canvas container + control sidebar
- **JS Section**:
  - `params` object: All configurable parameters
  - `NeuralParticle` class: Individual particle behavior
  - `setup()` / `draw()`: p5.js lifecycle
  - `spatialHash`: Grid-based neighbor detection
  - UI handlers: Seed navigation, parameter updates, export

## Design Patterns

1. **Deterministic Randomness**: Seeds control both `randomSeed()` and `noiseSeed()` for reproducible art
2. **Spatial Hashing**: Cell-based lookup for efficient neighbor queries
3. **Velocity-Based Visualization**: Color and alpha respond to particle speed
4. **Trail Persistence**: Canvas fade instead of clearing creates ghostly afterimages

## Color System

Uses Anthropic design colors by default:
- `--anthropic-orange` (#d97757): Slow-moving thoughts (warm)
- `--anthropic-blue` (#6a9bcc): Fast-moving cognition (cool)
- `--anthropic-dark` (#0d1117): Background (deep void)

## When Modifying

- **Particle behavior**: Modify `NeuralParticle.follow()` for flow field changes, or `getNeighborInfluence()` for flocking
- **Visual style**: Adjust color interpolation in `show()`, trail fade in `draw()`
- **Performance**: Reduce `particleCount` or increase `cellSize` for better frame rate
- **Noise patterns**: Adjust `noiseScale`, layer multipliers, or add third noise layer

## UI Controls

- **Seed Navigation**: Previous/Next/Random for exploring different neural landscapes
- **Parameter Sliders**: Real-time updates (most parameters apply immediately)
- **Color Pickers**: Custom slow/fast/background colors
- **Actions**: Reset to defaults, Download PNG snapshot
