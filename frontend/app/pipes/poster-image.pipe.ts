import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'posterImage'
})
export class PosterImagePipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (value == null) {

            return `assets/Poster_Not_Found.png`;

        }
        return `https://image.tmdb.org/t/p/original${value}`;
    }
}
