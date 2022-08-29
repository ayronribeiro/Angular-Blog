import { Injectable } from '@angular/core';

import { Parser } from 'json2csv';
import * as moment from 'moment';
import { HTTP_STATUS_CODES } from '../../classes/http.class';


@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }


  toCSV(data, columns?: any[]) {
    const values = [];
    data.forEach((item) => {
      const obj = {};
      for (let column of columns) {
        if (!column.hide) {
          switch (column.type) {
            case 'date':
              obj[column.label] = moment(this.getValue(item, column.key)).format('DD/MM/yyyy hh:mm:ss');
              break;
            case 'boolean':
              obj[column.label] = this.getValue(item, column.key) ? 'X' : '';
              break;
              case 'http':
                let val = this.getValue(item, column.key);
                obj[column.label] = HTTP_STATUS_CODES[val] || val;
                break;
            default:
              obj[column.label] = this.getValue(item, column.key) || '';
              break;
          }
        }
      }

      values.push(obj);
    });

    const fields = [];

    columns.forEach((column) => {
      if (!column.hide) fields.push(column.label);
    });

    const parser = new Parser({ fields: fields });
    return parser.parse(values);
  }

  getValue(item, key) {
    let result = item;

    const split = key.split('.');

    for (let key of split) {
      result = result[key];
      if (result === null || result === undefined) return undefined;
    }

    return typeof result == 'function' ? result() : result;
  }


  download(text, filename) {
    var encodedUri = encodeURI(text.trim());
    var link = document.createElement("a");
    link.style.display = 'none';
    link.setAttribute("href", 'data:text/csv;charset=utf-8,' + encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
