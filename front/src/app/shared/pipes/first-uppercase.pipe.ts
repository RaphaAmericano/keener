import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstUppercase'
})
export class FirstUppercasePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value[0].toUpperCase() + value.substr(1).toLowerCase();
  }

}
