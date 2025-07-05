import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByDateDesc',
  standalone: true // ✅ for Angular standalone pipe
})
export class OrderByDateDescPipe implements PipeTransform {
  transform(items: any[]): any[] {
    if (!items) return [];
    return [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
}
