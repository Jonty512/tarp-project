import { CreateBlurOverlay, RemoveBlurOverlay } from '../util/overlay';
import checkPerspectiveApi from './perspective';

const INSTAGRAM_CLASS_NAME = 'ZyFrc';

export async function InstagramTextUnFilter() {
  const elements = [...document.getElementsByClassName(INSTAGRAM_CLASS_NAME)] as HTMLElement[];
  elements.map(RemoveBlurOverlay);
}

export default async function InstagramTextFilter(threshold: number) {
  if (threshold === 0) {
    return InstagramTextUnFilter();
  }
  const elements = [...document.getElementsByClassName(INSTAGRAM_CLASS_NAME)] as HTMLElement[];
  return Promise.all(
    elements.map(async (el) => {
      console.log(el.innerText);
      const response = await checkPerspectiveApi(el.innerText, threshold);
      if (response.filter) {
        console.log(response);
        CreateBlurOverlay(el, 4, response.reason);
      }
    }),
  );
}
