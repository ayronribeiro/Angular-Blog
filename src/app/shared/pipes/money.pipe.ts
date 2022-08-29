import { Pipe, PipeTransform } from '@angular/core';
import * as Mask from 'vanilla-masker';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return Mask.toMoney(Number(value).toFixed(2));
  }

}
