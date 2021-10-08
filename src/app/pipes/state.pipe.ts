import { Pipe, PipeTransform } from '@angular/core';
import { UtilitiesService } from '../services/utilities.service';

@Pipe({
  name: 'state'
})
export class StatePipe implements PipeTransform {
  constructor(
    private utilitiesService: UtilitiesService,
  ) {}
  transform(value: any, ...args: any[]): any {
    console.log('value: ', value);
    return true;
    // this.utilitiesService.fnHttpSetCustomWebService('/estado/' + value, 'GET', null).subscribe(resp => {
    //   console.log('resp: ', resp);
    //   // return null;
    // }, error => {
    //   return null;
    // });
  }

}
