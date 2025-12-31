"use client";

import { useEffect, useRef, useState } from 'react';
import ControlPanel from '../components/ControlPanel';
import PresetSelector from '../components/PresetSelector';
import { NeuralDriftParams, defaultParams, presets, Preset } from '../types/neural-drift';

export default function Home() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [params, setParams] = useState<NeuralDriftParams>(defaultParams);
  const p5InstanceRef = useRef<any>(null);

  // Update params
  const handleParamChange = (key: keyof NeuralDriftParams, value: any) => {
    const newParams = { ...params, [key]: value };
    setParams(newParams);

    // Certain params require full reinitialization
    if (['seed', 'particleCount', 'colorBg'].includes(key)) {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.reinit(newParams.seed, newParams);
      }
    }
  };

  const handleSeedChange = (seed: number) => {
    handleParamChange('seed', seed);
  };

  const handleReset = () => {
    setParams(defaultParams);
    if (p5InstanceRef.current) {
      p5InstanceRef.current.reinit(defaultParams.seed, defaultParams);
    }
  };

  const handleDownload = () => {
    if (p5InstanceRef.current) {
      p5InstanceRef.current.saveCanvas(`neural-drift-${params.seed}`, 'png');
    }
  };

  const handlePresetSelect = (preset: Preset) => {
    const newParams = { ...params, ...preset.params };
    setParams(newParams);
    if (p5InstanceRef.current) {
      p5InstanceRef.current.reinit(newParams.seed, newParams);
    }
  };

  // Initialize p5.js
  useEffect(() => {
    if (typeof window === 'undefined' || !canvasRef.current) return;

    import('p5').then((p5Module) => {
      const p5 = p5Module.default;

      const sketch = (p: any) => {
        let particles: any[] = [];
        let zOffset = 0;
        let spatialHash: { [key: string]: any[] } = {};
        const cellSize = 50;
        let currentParams = params;

        function hexToRgb(hex: string) {
          const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          } : { r: 0, g: 0, b: 0 };
        }

        class Particle {
          pos: any;
          vel: any;
          acc: any;
          maxSpeed: number;
          prevPos: any;

          constructor() {
            this.pos = p.createVector(p.random(p.width), p.random(p.height));
            this.vel = p.createVector(0, 0);
            this.acc = p.createVector(0, 0);
            this.maxSpeed = p.random(1.5, 4);
            this.prevPos = this.pos.copy();
          }

          follow() {
            const angle1 = p.noise(
              this.pos.x * currentParams.noiseScale,
              this.pos.y * currentParams.noiseScale,
              zOffset
            ) * p.TWO_PI * 4;

            const angle2 = p.noise(
              this.pos.x * currentParams.noiseScale * 2.5 + 1000,
              this.pos.y * currentParams.noiseScale * 2.5 + 1000,
              zOffset * 1.5
            ) * p.TWO_PI * 2;

            const angle = angle1 * 0.7 + angle2 * 0.3;
            const force = p.createVector(p.cos(angle), p.sin(angle));
            force.setMag(currentParams.flowIntensity * 0.1);

            if (currentParams.neighborInfluence > 0) {
              const neighborForce = this.getNeighborInfluence();
              force.add(neighborForce);
            }

            this.acc.add(force);
          }

          getNeighborInfluence() {
            const cellX = p.floor(this.pos.x / cellSize);
            const cellY = p.floor(this.pos.y / cellSize);
            const alignment = p.createVector(0, 0);
            let count = 0;

            for (let dx = -1; dx <= 1; dx++) {
              for (let dy = -1; dy <= 1; dy++) {
                const key = (cellX + dx) + ',' + (cellY + dy);
                const cell = spatialHash[key];
                if (cell) {
                  for (const other of cell) {
                    if (other !== this) {
                      const d = this.pos.dist(other.pos);
                      if (d < cellSize && d > 0) {
                        alignment.add(other.vel);
                        count++;
                      }
                    }
                  }
                }
              }
            }

            if (count > 0) {
              alignment.div(count);
              alignment.setMag(currentParams.neighborInfluence * 0.05);
            }

            return alignment;
          }

          update() {
            this.vel.add(this.acc);
            this.vel.limit(this.maxSpeed);
            this.prevPos = this.pos.copy();
            this.pos.add(this.vel);
            this.acc.mult(0);
          }

          edges() {
            if (this.pos.x > p.width) {
              this.pos.x = 0;
              this.prevPos.x = 0;
            }
            if (this.pos.x < 0) {
              this.pos.x = p.width;
              this.prevPos.x = p.width;
            }
            if (this.pos.y > p.height) {
              this.pos.y = 0;
              this.prevPos.y = 0;
            }
            if (this.pos.y < 0) {
              this.pos.y = p.height;
              this.prevPos.y = p.height;
            }
          }

          show() {
            const speed = this.vel.mag();
            let t = p.map(speed, 0, this.maxSpeed, 0, 1);
            t = p.constrain(t, 0, 1);

            const slowColor = hexToRgb(currentParams.colorSlow);
            const fastColor = hexToRgb(currentParams.colorFast);

            const r = p.lerp(slowColor.r, fastColor.r, t);
            const g = p.lerp(slowColor.g, fastColor.g, t);
            const b = p.lerp(slowColor.b, fastColor.b, t);

            const alpha = p.map(speed, 0, this.maxSpeed, 30, 120);

            p.stroke(r, g, b, alpha);
            p.strokeWeight(p.map(speed, 0, this.maxSpeed, 1.5, 0.5));

            p.line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y);
          }
        }

        p.setup = () => {
          const canvas = p.createCanvas(900, 900);
          canvas.parent(canvasRef.current);
          p.colorMode(p.RGB);
          p.frameRate(60);

          p.randomSeed(currentParams.seed);
          p.noiseSeed(currentParams.seed);

          for (let i = 0; i < currentParams.particleCount; i++) {
            particles.push(new Particle());
          }

          const bg = hexToRgb(currentParams.colorBg);
          p.background(bg.r, bg.g, bg.b);
        };

        p.windowResized = () => {
          p.resizeCanvas(900, 900);
          p.setup();
        };

        p.draw = () => {
          const bg = hexToRgb(currentParams.colorBg);
          p.fill(bg.r, bg.g, bg.b, p.map(currentParams.trailPersistence, 1, 30, 50, 5));
          p.noStroke();
          p.rect(0, 0, p.width, p.height);

          spatialHash = {};
          for (const particle of particles) {
            const cellX = p.floor(particle.pos.x / cellSize);
            const cellY = p.floor(particle.pos.y / cellSize);
            const key = cellX + ',' + cellY;
            if (!spatialHash[key]) spatialHash[key] = [];
            spatialHash[key].push(particle);
          }

          for (const particle of particles) {
            particle.follow();
            particle.update();
            particle.edges();
            particle.show();
          }

          zOffset += currentParams.timeEvolution;
        };

        // Expose methods for React
        p.reinit = (seed: number, newParams: NeuralDriftParams) => {
          currentParams = newParams;
          zOffset = 0;
          particles = [];
          p.randomSeed(seed);
          p.noiseSeed(seed);

          for (let i = 0; i < newParams.particleCount; i++) {
            particles.push(new Particle());
          }

          const bg = hexToRgb(newParams.colorBg);
          p.background(bg.r, bg.g, bg.b);
        };
      };

      p5InstanceRef.current = new p5(sketch);
    });

    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
      }
    };
  }, []);

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px', minHeight: '100vh' }}>
      <ControlPanel
        params={params}
        onParamChange={handleParamChange}
        onSeedChange={handleSeedChange}
        onReset={handleReset}
        onDownload={handleDownload}
        onPresetSelect={handlePresetSelect}
      />

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div ref={canvasRef} />
      </div>
    </div>
  );
}
