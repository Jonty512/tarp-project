import { CreateBlurOverlay, RemoveBlurOverlay } from '../util/overlay';
import checkPerspectiveApi from './perspective';

const INSTAGRAM_CLASS_NAME = 'css-901oao r-1nao33i r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-bnwqim r-qvutc0'; // ZyFrc  _aa06

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
