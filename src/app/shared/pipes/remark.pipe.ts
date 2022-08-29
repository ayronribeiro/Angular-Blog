import { Pipe, PipeTransform } from '@angular/core';
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import { from } from 'rxjs';

@Pipe({
  name: 'remark'
})
export class RemarkPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return from(remark().use(remarkHtml).process(value));
  }

}
