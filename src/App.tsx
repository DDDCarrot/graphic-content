import { useState, useMemo } from 'react';
import { templates } from './templates/config';
import { splitText } from './utils/textProcessor';
import { TemplateSelector } from './components/TemplateSelector';
import { ConfigPanel } from './components/ConfigPanel';
import { TemplateRenderer } from './components/TemplateRenderer';
import { toPng } from 'html-to-image';
import type { GenerationConfig, TextChunk } from './types';
import { Download } from 'lucide-react';

function App() {
  const [text, setText] = useState<string>('');
  const [config, setConfig] = useState<GenerationConfig>({
    width: 800,
    maxCharsPerImage: 1000,
    templateId: 'classic-minimal',
    emoji: '✨',
    mode: 'multi',
  });

  const selectedTemplate = templates.find((t) => t.id === config.templateId) || templates[0];

  const chunks: TextChunk[] = useMemo(() => {
    if (config.mode === 'single') {
      return [{ id: 'single-chunk', content: text }];
    }
    return splitText(text, config.maxCharsPerImage);
  }, [text, config.maxCharsPerImage, config.mode]);

  const handleDownload = async (chunkId: string, index: number) => {
    const element = document.getElementById(`preview-${chunkId}`);
    if (element) {
      try {
        const dataUrl = await toPng(element, { cacheBust: true, pixelRatio: 2 });
        const link = document.createElement('a');
        link.download = `graphic-content-${index + 1}.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('Failed to download image', err);
      }
    }
  };

  const handleDownloadAll = async () => {
    for (let i = 0; i < chunks.length; i++) {
      await handleDownload(chunks[i].id, i);
      // Small delay to prevent browser throttling
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Graphic Content</h1>
          </div>
          <div className="flex items-center gap-4">
             <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Docs</a>
             <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
               Export Project
             </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Panel: Controls */}
        <div className="lg:col-span-4 space-y-6">
          {/* Text Input */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Input Content</h3>
            <textarea
              className="w-full h-64 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-base leading-relaxed"
              placeholder="Paste your long text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="mt-2 text-xs text-gray-400 flex justify-between">
              <span>{text.length} characters</span>
              <span>{chunks.length} image(s) generated</span>
            </div>
          </div>

          {/* Template Selector */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose Template</h3>
            <TemplateSelector
              selectedId={config.templateId}
              onSelect={(id) => setConfig({ ...config, templateId: id })}
            />
          </div>

          {/* Configuration Panel */}
          <ConfigPanel config={config} onChange={setConfig} />
        </div>

        {/* Right Panel: Preview */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Preview</h2>
            <div className="flex gap-2">
                <button 
                  onClick={handleDownloadAll}
                  disabled={chunks.length === 0 || !text}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  <Download size={18} />
                  Download All ({chunks.length})
                </button>
            </div>
          </div>

          {text ? (
            <div className="grid grid-cols-1 gap-8 justify-items-center pb-20">
              {chunks.map((chunk, index) => (
                <div key={chunk.id} className="relative group w-full flex flex-col items-center">
                  <div className="mb-2 w-full flex justify-between items-center max-w-[800px]">
                    <span className="text-sm font-medium text-gray-500">Image {index + 1} of {chunks.length}</span>
                    <button
                      onClick={() => handleDownload(chunk.id, index)}
                      className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <Download size={14} /> Download this
                    </button>
                  </div>
                  
                  {/* The actual image container to capture */}
                  <div className="transform origin-top transition-transform duration-200" style={{ maxWidth: '100%', overflowX: 'auto' }}>
                     <TemplateRenderer
                        id={`preview-${chunk.id}`}
                        template={selectedTemplate}
                        content={chunk.content}
                        emoji={config.emoji}
                        width={config.width}
                        className="shadow-xl"
                      />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-96 bg-white rounded-xl border-2 border-dashed border-gray-200 text-gray-400">
              <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-lg font-medium">No content to preview</p>
              <p className="text-sm mt-1">Start typing or paste text in the left panel</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
