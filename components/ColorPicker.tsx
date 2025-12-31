"use client";

import React from 'react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  return (
    <div className="color-group">
      <label>{label}</label>
      <div className="color-picker-container">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <span className="color-value">{value}</span>
      </div>
    </div>
  );
}
