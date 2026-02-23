import React from 'react';
import { templates } from '../templates/config';
import clsx from 'clsx';

interface TemplateSelectorProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedId,
  onSelect,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {templates.map((template) => (
        <button
          key={template.id}
          onClick={() => onSelect(template.id)}
          className={clsx(
            'relative group overflow-hidden rounded-lg border-2 transition-all duration-200 aspect-square flex flex-col items-center justify-center p-4',
            selectedId === template.id
              ? 'border-blue-500 ring-2 ring-blue-200 ring-offset-2'
              : 'border-gray-200 hover:border-blue-300'
          )}
          style={{ background: template.style.background || template.style.backgroundColor }}
        >
          <div className="text-sm font-medium text-center z-10" style={{ color: template.fontColor }}>
            {template.name}
          </div>
          <div className="mt-2 text-xs opacity-75 text-center z-10" style={{ color: template.fontColor }}>
            Aa
          </div>
          
          {/* Selection Checkmark */}
          {selectedId === template.id && (
            <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1 shadow-sm">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};
