import axios from 'axios';
import { CreateBlurOverlay, RemoveBlurOverlay } from '../util/overlay';

export function blurFlaggedItem(item: any, text = false, images = false) {
  try {
    const element = document.querySelector(item.selector);
    if (element) {
      if (item.contentType === 'text') {
        if (text) {
          CreateBlurOverlay(element, 10, 'This content was flagged by the community.');
        } else {
          RemoveBlurOverlay(element);
        }
      }

      if (item.contentType === 'image') {
        if (images) {
          CreateBlurOverlay(element, 10, 'This content was flagged by the community.');
        } else {
          RemoveBlurOverlay(element);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}

export default async function filterCommunityReports(text = false, images = false) {
  const response = await axios.get('https://eng-hack.herokuapp.com/community/report', {
    params: {
      url: window.location.href,
    },
  });

  // console.log(response.data);

  response.data.reports.forEach((item: any) => {
    blurFlaggedItem(item, text, images);
  });
}
