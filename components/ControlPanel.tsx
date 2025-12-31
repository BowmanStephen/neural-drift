"use client";

import React from 'react';
import Slider from './Slider';
import ColorPicker from './ColorPicker';
import PresetSelector from './PresetSelector';
import { NeuralDriftParams, Preset, presets } from '../types/neural-drift';

interface ControlPanelProps {
  params: NeuralDriftParams;
  onParamChange: (key: keyof NeuralDriftParams, value: any) => void;
  onSeedChange: (seed: number) => void;
  onReset: () => void;
  onDownload: () => void;
  onPresetSelect: (preset: Preset) => void;
}

export default function ControlPanel({
  params,
  onParamChange,
  onSeedChange,
  onReset,
  onDownload,
  onPresetSelect
}: ControlPanelProps) {
  const handlePreviousSeed = () => {
    onSeedChange(Math.max(1, params.seed - 1));
  };

  const handleNextSeed = () => {
    onSeedChange(params.seed + 1);
  };

  const handleRandomSeed = () => {
    onSeedChange(Math.floor(Math.random() * 999999) + 1);
  };

  const handleSeedInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSeed = parseInt(e.target.value);
    if (newSeed && newSeed > 0) {
      onSeedChange(newSeed);
    }
  };

  return (
    <div className="sidebar">
      <h1>Neural Drift</h1>
      <p className="subtitle">
        The computational poetry of signal becoming meaning—where discrete
        impulses coalesce into rivers of understanding.
      </p>

      {/* Seed Section */}
      <div className="control-section">
        <h3>Seed</h3>
        <input
          type="text"
          className="seed-input"
          value={params.seed}
          onChange={handleSeedInput}
        />
        <div className="seed-controls">
          <button className="button" onClick={handlePreviousSeed}>
            ← Prev
          </button>
          <button className="button" onClick={handleNextSeed}>
            Next →
          </button>
        </div>
        <button className="button primary" onClick={handleRandomSeed}>
          Random Seed
        </button>
      </div>

      {/* Presets Section */}
      <PresetSelector presets={presets} onSelectPreset={onPresetSelect} />

      {/* Parameters Section */}
      <div className="control-section">
        <h3>Parameters</h3>

        <Slider
          label="Particle Count"
          value={params.particleCount}
          min={500}
          max={8000}
          step={100}
          onChange={(value) => onParamChange('particleCount', value)}
        />

        <Slider
          label="Flow Intensity"
          value={params.flowIntensity}
          min={0.5}
          max={3.0}
          step={0.1}
          onChange={(value) => onParamChange('flowIntensity', value)}
          displayValue={params.flowIntensity.toFixed(1)}
        />

        <Slider
          label="Noise Scale"
          value={params.noiseScale}
          min={0.002}
          max={0.015}
          step={0.001}
          onChange={(value) => onParamChange('noiseScale', value)}
          displayValue={params.noiseScale.toFixed(3)}
        />

        <Slider
          label="Trail Persistence"
          value={params.trailPersistence}
          min={1}
          max={30}
          step={1}
          onChange={(value) => onParamChange('trailPersistence', value)}
        />

        <Slider
          label="Neighbor Influence"
          value={params.neighborInfluence}
          min={0}
          max={1.0}
          step={0.05}
          onChange={(value) => onParamChange('neighborInfluence', value)}
          displayValue={params.neighborInfluence.toFixed(2)}
        />

        <Slider
          label="Time Evolution"
          value={params.timeEvolution}
          min={0.0001}
          max={0.002}
          step={0.0001}
          onChange={(value) => onParamChange('timeEvolution', value)}
          displayValue={params.timeEvolution.toFixed(4)}
        />
      </div>

      {/* Colors Section */}
      <div className="control-section">
        <h3>Colors</h3>

        <ColorPicker
          label="Slow (Warm Thought)"
          value={params.colorSlow}
          onChange={(value) => onParamChange('colorSlow', value)}
        />

        <ColorPicker
          label="Fast (Electric Cognition)"
          value={params.colorFast}
          onChange={(value) => onParamChange('colorFast', value)}
        />

        <ColorPicker
          label="Background"
          value={params.colorBg}
          onChange={(value) => onParamChange('colorBg', value)}
        />
      </div>

      {/* Actions Section */}
      <div className="control-section">
        <h3>Actions</h3>
        <div className="button-row">
          <button className="button" onClick={onReset}>
            Reset
          </button>
          <button className="button primary" onClick={onDownload}>
            Download PNG
          </button>
        </div>
      </div>
    </div>
  );
}
