import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seriesImage'
})

export class SeriesImagePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value == null) {

      return `assets/Serie_Not_Found.png`;

    }
    return `https://image.tmdb.org/t/p/original${value}`;
  }
}