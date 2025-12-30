# Neural Drift

> The computational poetry of signal becoming meaning—where discrete impulses coalesce into rivers of understanding.

**Neural Drift** is a generative art visualization of neural network-inspired particle systems. Thousands of luminous particles navigate a landscape defined by layered Perlin noise fields, creating emergent flocking behavior that mirrors the way thoughts cluster and cascade through networked systems.

🌐 **Live Demo**: [neural-drift-eta.vercel.app](https://neural-drift-eta.vercel.app/)

![Neural Drift Visualization](https://via.placeholder.com/900x600/0d1117/d97757?text=Neural+Drift)

## Features

- **Interactive Controls**: Real-time parameter adjustment for particle count, flow intensity, noise scale, and more
- **Seed Navigation**: Explore infinite unique neural landscapes with deterministic seeds
- **Color Customization**: Customize slow/fast particle colors and background
- **PNG Export**: Download beautiful snapshots of your neural compositions
- **Emergent Behavior**: Dual-force architecture combining macro-level flow fields with micro-level flocking

## Quick Start

### Local Development

```bash
# Clone the repository
git clone https://github.com/BowmanStephen/neural-drift.git
cd neural-drift

# Serve locally (Python 3)
python3 -m http.server 8000

# Open in browser
open http://localhost:8000/index.html
```

Or simply open `index.html` directly in your browser (no build process required).

## Technology Stack

- **Library**: [p5.js](https://p5js.org/) v1.7.0
- **Language**: JavaScript ES6+
- **Markup**: Pure HTML5
- **Styling**: CSS3 with custom properties
- **Fonts**: Google Fonts (Poppins, Lora)
- **Architecture**: Single-page application, no build process

## Algorithm

The system uses a **dual-force architecture**:

1. **Macro-Level Flow Field**: Layered Perlin noise fields create directional currents that evolve over time
2. **Micro-Level Flocking**: Particle-to-particle alignment within a spatial hash grid for efficient neighbor detection
3. **Visual Rendering**: Velocity-based color interpolation (slow = warm amber, fast = electric blue) with trail persistence

## Parameters

| Parameter | Range | Default | Effect |
|-----------|-------|---------|--------|
| Particle Count | 500-8000 | 3000 | Number of neural impulses |
| Flow Intensity | 0.5-3.0 | 1.5 | Strength of flow field force |
| Noise Scale | 0.002-0.015 | 0.006 | Granularity of Perlin noise patterns |
| Trail Persistence | 1-30 | 12 | How long particle trails linger |
| Neighbor Influence | 0-1.0 | 0.3 | Flocking alignment strength |
| Time Evolution | 0.0001-0.002 | 0.0005 | Rate of flow field metamorphosis |

## Deployment

This project is deployed on [Vercel](https://vercel.com) and automatically deploys on every push to `main`.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/BowmanStephen/neural-drift)

## Philosophy

Read more about the algorithmic philosophy behind Neural Drift in [`files/neural_drift_philosophy.md`](files/neural_drift_philosophy.md).

## Project Structure

```
neural-drift/
├── index.html              # Main entry point (for Vercel deployment)
├── files/
│   ├── neural_drift.html   # Complete self-contained implementation
│   └── neural_drift_philosophy.md
├── CLAUDE.md               # Development documentation
└── README.md               # This file
```

## License

This project is open source and available for use and modification.

## Credits

Built with [p5.js](https://p5js.org/) for creative coding and generative art.

---

*Neural Drift asks: what does thought look like when stripped of content? Not the specific idea, but the pure kinetics of ideation itself.*

