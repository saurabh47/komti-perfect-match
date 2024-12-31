import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heightFormat',
  standalone: true
})
export class HeightFormatPipe implements PipeTransform {

  transform(cm: number): string {
    if (!cm || cm <= 0) {
      return 'Invalid height';
    }

    const feet = Math.floor(cm / 30.48);
    const inches = Math.floor((cm / 2.54) % 12);
    const meters = (cm / 100).toFixed(2);

    return `${feet}' ${inches}"`;
  }

}
