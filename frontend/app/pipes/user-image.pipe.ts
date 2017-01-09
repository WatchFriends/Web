import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userImage'
})
export class UserImagePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return 'https://bitslog.files.wordpress.com/2013/01/unknown-person1.gif';
    }
    return value; // `/pictures/${value}`;
  }

}
