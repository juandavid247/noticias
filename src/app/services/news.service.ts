import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsResponse } from '../interface';
import { environment } from '../../environments/environment';

const apikey = environment.apikey
const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  headLinesPages = 0;
  categoriaActual = '';
  categoriaPage = 0;

  constructor(private http: HttpClient) {}

  getTopHeadLines(){
    this.headLinesPages++;
    return this.http.get<NewsResponse>(`${apiUrl}/top-headlines?country=co&page=${this.headLinesPages}`, {
      params: {
        apikey: apikey
      }
    });
  }
  getTopHeadlinesByCategory(categoria: string){

    if(this.categoriaActual === categoria){
      this.categoriaPage++;
    }else{
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
    return this.http.get<NewsResponse>(`${apiUrl}/top-headlines?country=co`, {
      params: {
        apikey: apikey,
        category: categoria, 
        page: this.categoriaPage
      }
    });

  }
}
