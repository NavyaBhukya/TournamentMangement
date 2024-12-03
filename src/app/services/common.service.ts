import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public isEditPlayer =  new BehaviorSubject<boolean>(false)

  constructor() { }
  public showHeader: EventEmitter<string> = new EventEmitter<string>

}
