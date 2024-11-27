import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
  public showHeader: EventEmitter<string> = new EventEmitter<string>
}
