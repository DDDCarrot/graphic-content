import type { TextChunk } from '../types';

export const splitText = (text: string, maxChars: number): TextChunk[] => {
  if (!text) return [];

  const chunks: TextChunk[] = [];
  const paragraphs = text.split(/\n\s*\n/); // Split by double newline (paragraphs)

  let currentChunkContent = '';

  for (const paragraph of paragraphs) {
    const trimmedParagraph = paragraph.trim();
    if (!trimmedParagraph) continue;

    // Check if adding this paragraph would exceed the limit
    // +2 accounts for the double newline separator if we append
    const prospectiveLength = currentChunkContent.length + (currentChunkContent ? 2 : 0) + trimmedParagraph.length;

    if (prospectiveLength <= maxChars) {
      currentChunkContent += (currentChunkContent ? '\n\n' : '') + trimmedParagraph;
    } else {
      // Current chunk is full, push it if not empty
      if (currentChunkContent) {
        chunks.push({
          id: crypto.randomUUID(),
          content: currentChunkContent,
        });
        currentChunkContent = '';
      }

      // Now handle the current paragraph
      if (trimmedParagraph.length <= maxChars) {
        currentChunkContent = trimmedParagraph;
      } else {
        // Paragraph is too long, split by sentences
        // Match sentences ending with punctuation or end of string
        const sentences = trimmedParagraph.match(/[^.!?]+[.!?]+["']?|.+$/g) || [trimmedParagraph];
        
        for (const sentence of sentences) {
          const trimmedSentence = sentence.trim();
          if (!trimmedSentence) continue;

          // Check if sentence fits in current chunk (with space separator)
          const prospectiveSentenceLength = currentChunkContent.length + (currentChunkContent ? 1 : 0) + trimmedSentence.length;

          if (prospectiveSentenceLength <= maxChars) {
             currentChunkContent += (currentChunkContent ? ' ' : '') + trimmedSentence;
          } else {
             // Push current chunk
             if (currentChunkContent) {
               chunks.push({
                 id: crypto.randomUUID(),
                 content: currentChunkContent,
               });
               currentChunkContent = '';
             }

             // If sentence itself is too long, force split
             if (trimmedSentence.length > maxChars) {
                let remaining = trimmedSentence;
                while (remaining.length > 0) {
                   if (remaining.length <= maxChars) {
                     currentChunkContent = remaining;
                     break;
                   }
                   
                   // Find split point
                   let splitIndex = maxChars;
                   // Try to back up to the last space to avoid cutting words
                   const lastSpace = remaining.lastIndexOf(' ', maxChars);
                   if (lastSpace > 0) {
                     splitIndex = lastSpace;
                   }

                   chunks.push({
                     id: crypto.randomUUID(),
                     content: remaining.slice(0, splitIndex).trim(),
                   });
                   remaining = remaining.slice(splitIndex).trim();
                }
             } else {
               currentChunkContent = trimmedSentence;
             }
          }
        }
      }
    }
  }

  if (currentChunkContent) {
    chunks.push({
      id: crypto.randomUUID(),
      content: currentChunkContent,
    });
  }

  return chunks;
};
