import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl = 'http://127.0.0.1:8000/apis/v1/';


  constructor(private http: HttpClient) { }

  getTodos(): Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl);
  }

  addTodos(val: any){
    return this.http.post(this.APIUrl, val);
  }

  updateTodos(val: any){
    return this.http.put(this.APIUrl, val);
  }

  deleteTodos(val: any){
    console.log(this.APIUrl);
    
    return this.http.delete(this.APIUrl + val);
  }

}
