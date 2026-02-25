import React from 'react';
import type { GenerationConfig } from '../types';

interface ConfigPanelProps {
  config: GenerationConfig;
  onChange: (config: GenerationConfig) => void;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({ config, onChange }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Configuration</h3>
      
      {/* Mode Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 block">Generation Mode</label>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => onChange({ ...config, mode: 'single' })}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              config.mode === 'single' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Single Image
          </button>
          <button
            onClick={() => onChange({ ...config, mode: 'multi' })}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              config.mode === 'multi' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Multi-Page
          </button>
        </div>
      </div>

      {/* Width Control */}
      <div className="space-y-2">
        <label className="flex justify-between text-sm font-medium text-gray-700">
          <span>Image Width</span>
          <span className="text-blue-600 font-mono">{config.width}px</span>
        </label>
        <input
          type="range"
          min="640"
          max="1920"
          step="10"
          value={config.width}
          onChange={(e) => onChange({ ...config, width: parseInt(e.target.value) })}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-400 px-1">
          <span>640px</span>
          <span>1920px</span>
        </div>
      </div>

      {/* Font Size Control */}
      <div className="space-y-2">
        <label className="flex justify-between text-sm font-medium text-gray-700">
          <span>Font Size</span>
          <span className="text-blue-600 font-mono">{config.fontSize}px</span>
        </label>
        <input
          type="range"
          min="12"
          max="48"
          step="1"
          value={config.fontSize}
          onChange={(e) => onChange({ ...config, fontSize: parseInt(e.target.value) })}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-400 px-1">
          <span>12px</span>
          <span>48px</span>
        </div>
      </div>

      {/* Max Chars Control (Only relevant for Multi mode or if Single mode needs cutting but user chose Single) */}
      <div className="space-y-2">
        <label className="flex justify-between text-sm font-medium text-gray-700">
          <span>Max Characters per Image</span>
          <span className="text-blue-600 font-mono">{config.maxCharsPerImage}</span>
        </label>
        <input
          type="range"
          min="100"
          max="3000"
          step="50"
          value={config.maxCharsPerImage}
          onChange={(e) => onChange({ ...config, maxCharsPerImage: parseInt(e.target.value) })}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="text-xs text-gray-500">
          {config.mode === 'single' 
            ? 'Note: Single mode will try to fit all text, but very long text might be truncated or font size reduced (if implemented).' 
            : 'Text will be automatically split into multiple images based on this limit.'}
        </div>
      </div>

      {/* Emoji Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 block">Emoji Decoration</label>
        <div className="relative">
          <input
            type="text"
            value={config.emoji}
            onChange={(e) => onChange({ ...config, emoji: e.target.value })}
            placeholder="Type an emoji (e.g., 🚀)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            maxLength={2} // Usually emojis are 1-2 chars
          />
        </div>
        <p className="text-xs text-gray-500">
          Tip: Use <kbd className="bg-gray-100 px-1 rounded border">Win + .</kbd> or <kbd className="bg-gray-100 px-1 rounded border">Cmd + Ctrl + Space</kbd> to open emoji picker.
        </p>
      </div>
    </div>
  );
};
