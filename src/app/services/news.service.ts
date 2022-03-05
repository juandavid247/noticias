import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsResponse } from '../interface/index';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getTopHeadLines(){
    return this.http.get<NewsResponse>('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=fdd9fe7156234a87b859ce2bf5a349b2');
  }
}
