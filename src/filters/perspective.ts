import axios from 'axios';
import { FilterResult } from '../types';

function getParamsOverTheshold(data: any, threshold: number) {
  const filtered: {[type: string]: number} = {};

  Object.keys(data).forEach((param) => {
    if (data[param] > (1.5 - ((threshold / 200) + 0.5))) {
      filtered[param] = data[param];
    }
  });

  return filtered;
}

export default async function checkPerspectiveApi(
  text: string, threshold: number,
): Promise<FilterResult> {
  if (!text) {
    return {
      filter: false,
      reason: 'No text was detected here',
    };
  }

  const res = await axios.post('https://eng-hack.herokuapp.com/check/text', {
    text,
  });

  const { data } = res.data;

  const filtered = getParamsOverTheshold(data, threshold);

  const overThreshold = Object.keys(filtered);

  if (overThreshold.length === 0) {
    return {
      filter: false,
      reason: 'None of the parameters crossed the threshold on the given text',
    };
  }

  return {
    filter: true,
    reason: `The text contains following qualities above threshold: ${overThreshold.join(', ')}`,
  };
}
