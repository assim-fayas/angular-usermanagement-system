import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }

    if (!searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      // Implement your custom filtering logic here based on the item properties
      return item.name.toLowerCase().includes(searchText) ||
             item.email.toLowerCase().includes(searchText);
    });
  }
}
