export interface NeuralDriftParams {
  seed: number;
  particleCount: number;
  flowIntensity: number;
  noiseScale: number;
  trailPersistence: number;
  neighborInfluence: number;
  timeEvolution: number;
  colorSlow: string;
  colorFast: string;
  colorBg: string;
}

export const defaultParams: NeuralDriftParams = {
  seed: 12345,
  particleCount: 1500,
  flowIntensity: 1.5,
  noiseScale: 0.006,
  trailPersistence: 12,
  neighborInfluence: 0.3,
  timeEvolution: 0.0005,
  colorSlow: '#d97757',
  colorFast: '#4ecdc4',
  colorBg: '#0d1117'
};

export interface Preset {
  name: string;
  description: string;
  params: Partial<NeuralDriftParams>;
}

export const presets: Preset[] = [
  {
    name: 'Classic Neural',
    description: 'Balanced flow with warm-to-cool gradients',
    params: {
      particleCount: 1500,
      flowIntensity: 1.5,
      noiseScale: 0.006,
      trailPersistence: 12,
      neighborInfluence: 0.3,
      colorSlow: '#d97757',
      colorFast: '#4ecdc4',
      colorBg: '#0d1117'
    }
  },
  {
    name: 'Ethereal Dreams',
    description: 'Light, flowing particles with long trails',
    params: {
      particleCount: 1200,
      flowIntensity: 1.0,
      noiseScale: 0.004,
      trailPersistence: 25,
      neighborInfluence: 0.1,
      colorSlow: '#e8d5b7',
      colorFast: '#a8d8ea',
      colorBg: '#1a1a2e'
    }
  },
  {
    name: 'Electric Storm',
    description: 'Intense, fast-moving neural activity',
    params: {
      particleCount: 2500,
      flowIntensity: 2.5,
      noiseScale: 0.010,
      trailPersistence: 5,
      neighborInfluence: 0.5,
      colorSlow: '#ff6b35',
      colorFast: '#00d9ff',
      colorBg: '#0a0a0a'
    }
  },
  {
    name: 'Oceanic Flow',
    description: 'Calm, blue-green fluid dynamics',
    params: {
      particleCount: 2000,
      flowIntensity: 1.2,
      noiseScale: 0.005,
      trailPersistence: 18,
      neighborInfluence: 0.4,
      colorSlow: '#2d6a4f',
      colorFast: '#48cae4',
      colorBg: '#081c15'
    }
  },
  {
    name: 'Sunset Neural',
    description: 'Warm oranges and purples',
    params: {
      particleCount: 1800,
      flowIntensity: 1.8,
      noiseScale: 0.007,
      trailPersistence: 10,
      neighborInfluence: 0.25,
      colorSlow: '#f72585',
      colorFast: '#4cc9f0',
      colorBg: '#1a0b2e'
    }
  }
];
