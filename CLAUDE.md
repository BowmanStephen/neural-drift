# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Neural Drift** is a generative art visualization of neural network-inspired particle systems. The philosophical concept is "the computational poetry of signal becoming meaning"—where individual neural impulses coalesce into flowing rivers of understanding through emergent flocking behavior.

**Live Demo**: https://neural-drift-eta.vercel.app/

## Project Structure

```
neural-drift/
├── index.html                        # Main entry point (Vercel deployment)
├── files/
│   ├── neural_drift_philosophy.md    # Core philosophy and algorithmic concepts
│   └── neural_drift.html              # Alternate implementation file
├── CLAUDE.md                          # This file - developer documentation
├── README.md                          # Public-facing documentation
├── .gitignore                         # Git ignore rules
└── files.zip                         # Archived backup
```

## Technology Stack

- **Frontend**: Pure HTML5 + p5.js v1.7.0 (loaded via CDN)
- **Styling**: CSS3 with custom properties, Google Fonts (Poppins, Lora)
- **Language**: JavaScript ES6+
- **Architecture**: Single-page application, no build process required
- **Design System**: Anthropic-inspired color palette and glassmorphism UI
- **Deployment**: Vercel (auto-deploy on push to main)

## Development & Deployment

```bash
# Open directly in browser (no build required)
open index.html

# Or serve locally for development
python3 -m http.server 8000
# Then visit http://localhost:8000/index.html

# Deploy to Vercel (if configured)
vercel deploy
```

**Note**: Both `index.html` and `files/neural_drift.html` are complete, self-contained implementations. The `index.html` file is optimized for Vercel deployment.

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

## Working with Seeds

The seed system is critical for reproducible art:
- **Seeds control**: Both `randomSeed()` for particle initialization and `noiseSeed()` for Perlin noise patterns
- **Deterministic output**: Same seed + same parameters = identical visualization
- **Seed storage**: Current seed is stored in `params.seed` (default: 42)
- **Seed navigation**: Use Previous/Next buttons to explore adjacent seeds incrementally

## Performance Optimization

If experiencing frame rate drops:
1. **Reduce particle count**: Lower `particleCount` from 3000 to 1500-2000
2. **Increase cell size**: Change `cellSize` from 30 to 50 in spatial hash
3. **Simplify noise**: Reduce noise layer complexity or increase `noiseScale`
4. **Disable trails**: Increase `trailPersistence` to 25-30 for shorter trails
5. **Reduce flocking**: Lower `neighborInfluence` or `neighborRadius`

## Common Modifications

### Changing Visual Style
- **Colors**: Modify `lerpColor()` calls in `show()` method
- **Particle size**: Change the `size` variable in `show()` (currently 2.0)
- **Trail length**: Adjust `trailPersistence` (lower = longer, 1-30 range)
- **Background**: Update `--anthropic-dark` CSS variable or background color picker

### Adjusting Behavior
- **Flow patterns**: Modify `noiseScale` (smaller = smoother, larger = more detailed)
- **Turbulence**: Change layer multipliers in `follow()` method (currently 0.7 and 0.3)
- **Flocking strength**: Adjust `neighborInfluence` (0.0 = no flocking, 1.0 = strong alignment)
- **Evolution speed**: Change `timeEvolution` rate in `draw()` loop

### Adding Features
- **New parameters**: Add to `params` object and create corresponding UI slider
- **Additional noise layers**: Add third `noise()` call with different z-offset
- **Particle types**: Extend `NeuralParticle` class with subclasses
- **Export formats**: Add SVG/WebM export alongside PNG download

## Debugging

- **Frame rate**: Monitor FPS in browser console or add frameRate() display
- **Particle behavior**: Use console.log in `follow()` or `update()` methods
- **Spatial hash**: Visualize grid by drawing cell boundaries (temporarily)
- **Seed issues**: Verify both `randomSeed()` and `noiseSeed()` use same value

## Deployment Notes

- **Vercel**: Automatically deploys from `main` branch
- **CDN**: p5.js loaded from `https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js`
- **No build**: Direct file serving - no bundling or optimization needed
- **SEO**: Meta tags included in `<head>` for social sharing
- **Performance**: Consider lazy-loading for mobile or lower-end devices
