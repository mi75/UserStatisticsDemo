import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class ApiCallerService {

  public static readonly webAdddr = 'http://127.0.0.1:3000/';

  constructor(
    private http: HttpClient
  ) { }

  getData(addr) {
    return this.http.get(ApiCallerService.webAdddr + addr);
  }
}
