"use client";

import React from 'react';
import { Preset } from '../types/neural-drift';

interface PresetSelectorProps {
  presets: Preset[];
  onSelectPreset: (preset: Preset) => void;
}

export default function PresetSelector({
  presets,
  onSelectPreset
}: PresetSelectorProps) {
  return (
    <div className="control-section">
      <h3>Presets</h3>
      <div className="preset-grid">
        {presets.map((preset, index) => (
          <button
            key={index}
            className="preset-button"
            onClick={() => onSelectPreset(preset)}
          >
            <div className="preset-name">{preset.name}</div>
            <div className="preset-description">{preset.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
