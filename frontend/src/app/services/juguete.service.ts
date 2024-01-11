import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Juguete} from "../common/juguete";

@Injectable({
  providedIn: 'root'
})
export class JugueteService {

  baseURL = 'http://localhost:3000/api/juguetes';

  constructor(private http: HttpClient) { }

  getJugueteList(): Observable<Juguete[]>
  {
    return this.http.get<Juguete[]>(this.baseURL);
  }
  getCategorias():Observable<string[]>{
    return this.http.get<string[]>(this.baseURL + '/categoria');
  }

  updateJuguete(id: string, juguete: Juguete):Observable<ApiResponseUp>{
    return this.http.patch<ApiResponseUp>(this.baseURL + '/' + id,juguete);
  }

  deleteJuguete(id: string):Observable<ApiResponse>{
    return this.http.delete<ApiResponse>(this.baseURL + '/' + id);
  }

  addJuguete(juguete: Juguete):Observable<ApiResponse>{
    return this.http.post<ApiResponse>(this.baseURL,juguete);
  }

  getJuguete(id: string):Observable<Juguete>{
    return this.http.get<Juguete>(this.baseURL + '/juguete/' +id)
  }
}

interface ApiResponse
{
  status: string;
}

interface ApiResponseUp
{
  status: string,
  juguete: Juguete;
}

