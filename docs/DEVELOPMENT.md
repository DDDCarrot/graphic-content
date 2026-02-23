# Developer Documentation

## Project Structure

This project uses React + TypeScript + Vite + TailwindCSS.

```
graphic_content/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── ConfigPanel.tsx       # Sidebar configuration UI
│   │   ├── TemplateRenderer.tsx  # Core component for rendering text to image
│   │   └── TemplateSelector.tsx  # Template selection grid
│   ├── templates/        # Template definitions
│   │   └── config.ts             # Exported template configurations
│   ├── utils/            # Helper functions
│   │   ├── imageGenerator.ts     # html-to-image integration
│   │   └── textProcessor.ts      # Logic for splitting text into chunks
│   ├── types/            # TypeScript interfaces
│   ├── App.tsx           # Main application logic
│   └── main.tsx          # Entry point
├── docs/                 # Documentation
├── index.html            # HTML entry point
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## Core Logic

### Text Processing (`src/utils/textProcessor.ts`)

The `splitText` function is the core logic for handling long text.
- **Input**: Full text string, max characters per chunk.
- **Process**:
  1. Splits text by paragraphs (`\n\n`).
  2. Iterates through paragraphs and appends to the current chunk if it fits.
  3. If a paragraph is too long, it splits by sentences (`.!?`).
  4. If a sentence is still too long, it splits by words (whitespace).
  5. Ensures no words are cut in the middle if possible.
- **Output**: Array of `TextChunk` objects.

### Template System (`src/templates/config.ts`)

Templates are defined as `TemplateConfig` objects.
- `id`: Unique identifier.
- `style`: CSS properties applied to the container.
- `emojiPosition`: Where the emoji is placed (e.g., 'top-right').
- `fontColor`, `background`, `accentColor`: Theme variables.

To add a new template, simply add a new object to the `templates` array in `src/templates/config.ts`.

### Image Generation (`src/utils/imageGenerator.ts`)

Uses `html-to-image` to capture the DOM node of `TemplateRenderer`.
- `toPng` is used to generate a data URL.
- A hidden anchor tag is created to trigger the download.
- `pixelRatio: 2` is used for high-quality retina output.

## Development

1. **Install Dependencies**: `npm install`
2. **Start Dev Server**: `npm run dev`
3. **Build**: `npm run build`
4. **Preview Build**: `npm run preview`

## API Reference (Internal)

### `TemplateRenderer` Props

| Prop | Type | Description |
|------|------|-------------|
| `template` | `TemplateConfig` | The selected template configuration. |
| `content` | `string` | The text content to render. |
| `emoji` | `string` | Optional emoji to display. |
| `width` | `number` | Width of the container in pixels. |
| `className` | `string` | Additional CSS classes. |
| `id` | `string` | DOM ID for image capture. |

### `splitText` Function

```typescript
function splitText(text: string, maxChars: number): TextChunk[]
```
- Returns an array of `{ id: string, content: string }`.
