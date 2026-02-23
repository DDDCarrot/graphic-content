export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  previewImage: string;
  style: React.CSSProperties;
  className?: string;
  emojiPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'none';
  background?: string;
  fontColor?: string;
  accentColor?: string;
}

export interface GenerationConfig {
  width: number;
  maxCharsPerImage: number;
  templateId: string;
  emoji: string;
  mode: 'single' | 'multi';
}

export interface TextChunk {
  content: string;
  id: string;
}
