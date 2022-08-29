import { Pipe, PipeTransform } from '@angular/core';
import parsePhoneNumber from 'libphonenumber-js'

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === undefined || value === null || value === '') return '';
    const phoneNumber = parsePhoneNumber(value);
    return phoneNumber ? (`${phoneNumber.countryCallingCode ? `+${phoneNumber.countryCallingCode} ` : ''}${phoneNumber.formatNational()}`) : value;
  }

}
