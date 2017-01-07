import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seriesImage'
})

export class SeriesImagePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value == null) {
      return `../../assets/images/imagenotfound.png`;
    }
    return `https://image.tmdb.org/t/p/original${value}`;
  }
}