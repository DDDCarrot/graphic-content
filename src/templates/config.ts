import type { TemplateConfig } from '../types';

export const templates: TemplateConfig[] = [
  {
    id: 'classic-minimal',
    name: 'Classic Minimal',
    description: 'Clean, elegant, and readable. Perfect for professional content.',
    previewImage: '', // To be generated or placeholder
    style: {
      backgroundColor: '#ffffff',
      color: '#1f2937', // gray-900
      fontFamily: '"Inter", sans-serif',
      padding: '40px',
      borderRadius: '0px',
    },
    emojiPosition: 'top-right',
    background: '#ffffff',
    fontColor: '#1f2937',
    accentColor: '#3b82f6',
  },
  {
    id: 'modern-dark',
    name: 'Modern Dark',
    description: 'Sleek dark mode design for high contrast and modern look.',
    previewImage: '',
    style: {
      backgroundColor: '#111827', // gray-900
      color: '#f3f4f6', // gray-100
      fontFamily: '"Inter", sans-serif',
      padding: '40px',
      borderRadius: '0px',
    },
    emojiPosition: 'bottom-right',
    background: '#111827',
    fontColor: '#f3f4f6',
    accentColor: '#8b5cf6',
  },
  {
    id: 'soft-gradient',
    name: 'Soft Gradient',
    description: 'A gentle gradient background that adds warmth and character.',
    previewImage: '',
    style: {
      background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
      color: '#2d3748',
      fontFamily: '"Inter", sans-serif',
      padding: '40px',
      borderRadius: '0px',
    },
    emojiPosition: 'top-left',
    background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
    fontColor: '#2d3748',
    accentColor: '#ec4899',
  },
  {
    id: 'nature-card',
    name: 'Nature Card',
    description: 'Earthy tones inspired by nature. Calming and organic.',
    previewImage: '',
    style: {
      backgroundColor: '#f0fdf4', // green-50
      color: '#14532d', // green-900
      fontFamily: '"Georgia", serif',
      padding: '40px',
      borderRadius: '0px',
      border: '8px solid #dcfce7',
    },
    emojiPosition: 'bottom-left',
    background: '#f0fdf4',
    fontColor: '#14532d',
    accentColor: '#16a34a',
  },
  {
    id: 'tech-blue',
    name: 'Tech Blue',
    description: 'Professional tech-oriented style with blue accents.',
    previewImage: '',
    style: {
      backgroundColor: '#eff6ff', // blue-50
      color: '#1e3a8a', // blue-900
      fontFamily: '"Courier New", monospace',
      padding: '40px',
      borderRadius: '0px',
    },
    emojiPosition: 'top-right',
    background: '#eff6ff',
    fontColor: '#1e3a8a',
    accentColor: '#2563eb',
  },
];
