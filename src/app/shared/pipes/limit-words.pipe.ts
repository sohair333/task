import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitWords'
})
export class LimitWordsPipe implements PipeTransform {

  transform(value: string, limit: number = 5): string {
    if (!value) return '';
    const words = value.split(' ');
    return words.length > limit ? words.slice(0, limit).join(' ') + '...' : value;
  }
}
