/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import * as nsfwjs from 'nsfwjs';
import { FilterResult } from '../types';
import {
  AddPopover,
  CreateBlurOverlay,
  RemoveBlurOverlay,
  RemovePopover,
} from '../util/overlay';
import sleep from '../util/sleep';

let model: nsfwjs.NSFWJS;

nsfwjs.load('https://d1zv2aa70wpiur.cloudfront.net/tfjs_quant_nsfw_mobilenet/').then((loaded) => {
  model = loaded;
});

async function scanImage(element: HTMLImageElement) {
  while (!model) {
    // eslint-disable-next-line no-await-in-loop
    await sleep(1000);
  }
  return model.classify(element);
}

export default async function filterImage(
  image: HTMLImageElement, threshold: number,
): Promise<FilterResult> {
  const width = image.clientWidth;
  if (width < 50) {
    return {
      filter: false,
      reason: 'The image is too small',
    };
  }
  const newImg = new Image(200, 200);
  newImg.crossOrigin = 'anonymous';
  newImg.src = image.src;
  const result = await scanImage(newImg);
  const highest = result[0];

  if (highest.className === 'Neutral' || highest.className === 'Drawing') {
    return {
      filter: false,
      reason: 'The image is neutral.',
    };
  }

  console.log(highest.probability, (1 - threshold / 100));
  if (highest.probability < (1 - threshold / 100)) {
    return {
      filter: false,
      reason: 'The image is below the given threshold.',
    };
  }

  return {
    filter: true,
    reason: `The image has NSFW content which is over the configured threshold.`, //${highest.className}
  };
}

export async function filterImages(
  images: HTMLImageElement[],
) {
  const results = [];
  for (const image of images) {
    const result = await filterImage(image, 0.5);
    results.push(result);
    await sleep(50);
  }

  return results;
}

export async function UnfilterAllImagesOnPage() {
  const images = [...document.querySelectorAll('img')];
  images.map(RemoveBlurOverlay);
}

export async function FilterAllImagesOnPage(threshold?: number) {
  if (threshold === 0) {
    UnfilterAllImagesOnPage();
    return;
  }
  const images = [...document.querySelectorAll('img')];
  images.map((img) => CreateBlurOverlay(img));
  const promises = images.map(async (image) => {
    try {
      const result = await filterImage(image, threshold || 0.5);

      if (!result.filter) {
        RemoveBlurOverlay(image);
      } else {
        RemovePopover(image);
        setTimeout(() => {
          AddPopover(image, result.reason);
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  });
  await Promise.all(promises);
}
