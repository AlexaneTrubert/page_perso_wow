import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'remlaceTiret'
})
export class RemplaceTiretPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    return value.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  }
}
