"use client";

import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  displayValue?: string;
}

export default function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  displayValue
}: SliderProps) {
  return (
    <div className="control-group">
      <label>{label}</label>
      <div className="slider-container">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
        />
        <span className="value-display">
          {displayValue || value.toString()}
        </span>
      </div>
    </div>
  );
}
