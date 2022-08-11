/* eslint-disable no-underscore-dangle */
import tippy from 'tippy.js';

export function BlurAllImages() {
  const style = document.createElement('style');
  style.id = 'detox-blur-image';
  style.appendChild(document.createTextNode(`
  img {
    filter: blur(50px);
  }
  `));

  document.head.appendChild(style);
}

export function RemoveBlurAllImages() {
  const blurrerBlurStyle = document.getElementById('detox-blur-image');
  if (blurrerBlurStyle) {
    document.head.removeChild(blurrerBlurStyle);
  }
}

export function AddPopover(element: HTMLElement, reason?: string) {
  const el = element;
  if (!(el as any)._tippy) {
    tippy(el, {
      content: reason || 'Blurred by Blurrer!',
    });
  }
}

export function RemovePopover(element: HTMLElement) {
  const el = element;
  if ((el as any)._tippy) {
    (el as any)._tippy.destroy();
  }
}

export function CreateBlurOverlay(element: HTMLElement, blurValue?: number, reason?: string) {
  const el = element;
  el.style.filter = `blur(${blurValue || 50}px)`;
  el.style.userSelect = 'none';

  AddPopover(el, reason);
}

export function RemoveBlurOverlay(element: HTMLElement) {
  const el = element;
  el.style.removeProperty('filter');
  el.style.userSelect = 'auto';
  RemovePopover(el);
}
