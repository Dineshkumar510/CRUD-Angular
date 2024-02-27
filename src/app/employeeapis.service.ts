import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeapisService {

  constructor(private http: HttpClient) { }

  OnPostMethod(data:any){
    return this.http.post<any>("http://localhost:3000/posts", data)
    .pipe(map((res:any)=> {
      return res;
    }))
  }

  OngetMethod(){
    return this.http.get<any>("http://localhost:3000/posts")
    .pipe(map((res:any)=> {
      return res;
    }));
  }

  OnUpdateMethod(data:any, id:any){
    return this.http.put<any>(`http://localhost:3000/posts/${id}`, data)
    .pipe(map((res:any)=> {
      return res;
    }));
  }

  OnDeleteMethod(id:any){
    return this.http.delete<any>(`http://localhost:3000/posts/${id}`)
    .pipe(map((res:any)=> {
      return res;
    }));
  }
}
