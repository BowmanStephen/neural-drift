# CLAUDE.md

Neural Drift — generative art visualization of neural network-inspired particle systems. Pure HTML5 + p5.js, no build process. Deploys on Vercel.

**Live**: https://neural-drift-eta.vercel.app/

## Development

```bash
# No build required — open directly
open index.html

# Or serve locally
python3 -m http.server 8000
```

Both `index.html` and `files/neural_drift.html` are complete self-contained implementations. `index.html` is the Vercel entry point.

## Core Algorithm

**Dual-force architecture:**
1. **Macro flow field**: Layered Perlin noise (70% primary + 30% turbulence), evolves via z-dimension
2. **Micro flocking**: Particle-to-particle alignment within configurable radius, spatial hashing (`cellSize = 30`) for O(n) neighbor detection

**Visual rendering**: Velocity-based color interpolation (slow = warm amber, fast = electric blue), alpha fade trails, edge wrapping.

## Key Parameters

| Parameter | Default | Effect |
|-----------|---------|--------|
| `particleCount` | 3000 | Number of particles (500-8000) |
| `flowIntensity` | 1.5 | Flow field strength (0.5-3.0) |
| `noiseScale` | 0.006 | Perlin noise granularity (0.002-0.015) |
| `trailPersistence` | 12 | Trail length — lower = longer (1-30) |
| `neighborInfluence` | 0.3 | Flocking alignment strength (0-1.0) |
| `timeEvolution` | 0.0005 | Flow field change rate (0.0001-0.002) |

## When Modifying

- **Particle behavior**: `NeuralParticle.follow()` (flow field) or `getNeighborInfluence()` (flocking)
- **Visual style**: Color interpolation in `show()`, trail fade in `draw()`
- **Performance**: Reduce `particleCount` or increase `cellSize`
- **Colors**: Anthropic palette — `--anthropic-orange` (slow), `--anthropic-blue` (fast), `--anthropic-dark` (background)

## Gotchas

- **Deterministic seeds**: Same seed + params = identical output. Seeds control both `randomSeed()` and `noiseSeed()`.
- **No CSS transitions**: All motion via `useCurrentFrame()` + `interpolate()` — it's canvas-based.
- **p5.js via CDN**: Loaded from cdnjs, not bundled.
- **Single-file architecture**: All JS/CSS/HTML in one document.
