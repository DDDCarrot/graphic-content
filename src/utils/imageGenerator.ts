import { toPng } from 'html-to-image';

export const downloadElementAsImage = async (elementId: string, fileName: string) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found`);
    return;
  }

  try {
    const dataUrl = await toPng(element, { cacheBust: true, pixelRatio: 2 });
    const link = document.createElement('a');
    link.download = `${fileName}.png`;
    link.href = dataUrl;
    link.click();
  } catch (err) {
    console.error('Failed to generate image', err);
  }
};

export const downloadAllImages = async (ids: string[], baseFileName: string) => {
  for (let i = 0; i < ids.length; i++) {
    await downloadElementAsImage(ids[i], `${baseFileName}-${i + 1}`);
    // Add a small delay to prevent browser throttling downloads
    await new Promise(resolve => setTimeout(resolve, 500));
  }
};
