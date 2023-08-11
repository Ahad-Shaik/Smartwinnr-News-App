import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsServiceService {

  url="https://newsapi.org/v2/everything?q=tesla&from=2023-08-10&sortBy=publishedAt&apiKey=75ab8cd0faef4d8798619eecdae1e39d";
 url2=" https://api-browser.newscatcherapi.com/?1=95cbCM7eGP_ixRmSNpJ4i3Lb2hRWbFL8OS_KOkuRh3o";
  constructor(private http:HttpClient) { }

  getNewsdata(){
    return this.http.get(this.url);
  }
}
