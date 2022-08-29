import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'shortTime'
})
export class ShortTimePipe implements PipeTransform {

  transform(number: any, ...args: unknown[]): unknown {
    if (isNaN(number)) return `00:00:00`;
    if (number === null) return `00:00:00`;
    if (number === 0) return `00:00:00`;

  
    let days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;
  
    total_seconds = parseInt(Math.floor(number / 1000).toString());
    total_minutes = parseInt(Math.floor(total_seconds / 60).toString());
    total_hours = parseInt(Math.floor(total_minutes / 60).toString());
    days = parseInt(Math.floor(total_hours / 24).toString());
    seconds = parseInt((total_seconds % 60).toString()).toString();
    minutes = parseInt((total_minutes % 60).toString()).toString();
    hours = parseInt((total_hours % 24).toString()).toString();

    return `${hours.length == 1 ? ('0' + hours) : hours}:${minutes.length == 1 ? ('0' + minutes) : minutes}:${seconds.length == 1 ? ('0' + seconds) : seconds}`
  }

}
