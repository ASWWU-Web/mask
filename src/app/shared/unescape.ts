// from: https://stackoverflow.com/questions/47378033/what-the-right-way-unescape-html-entities-in-angular/47386232#47386232

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unescape'
})
export class UnescapePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const doc = new DOMParser().parseFromString(value, 'text/html');
    return doc.documentElement.textContent;
  }
}
