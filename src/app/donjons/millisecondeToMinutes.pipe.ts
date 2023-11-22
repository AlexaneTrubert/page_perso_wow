import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'minutes'
})
export class MillisecondeToMinutesPipe implements PipeTransform {
  transform(value: number): number | string {
    if (!value) return value;

    let heures = Math.floor(value / 3600000);
    let minutes = Math.floor(value / 60000);
    let secondes = ((value % 60000) / 1000).toFixed(0);

    return heures + 'h ' + minutes + 'min ' + secondes + 's';
  }
}
