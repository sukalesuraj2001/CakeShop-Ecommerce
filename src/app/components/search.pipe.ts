import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(value: any[], filterString: string, propName: string): any[] {
    if (!value || !filterString || !propName) {
      return value;
    }

    filterString = filterString.trim().toLowerCase(); // Trim and convert filterString to lowercase
    return value.filter(item => {
      const propValue = item[propName];
      if (propValue && typeof propValue === 'string') {
        return propValue.trim().toLowerCase().includes(filterString);
      }
      return false;
    });
  }
}
