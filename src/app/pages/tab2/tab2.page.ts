import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { Article } from '../../interface/index';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment,{static: true}) segmento: IonSegment;

  categorias = ['business','entertainment','general','health','science','sports','technology'];
  noticias: Article[]=[]
 
   


  constructor(private news: NewsService) {}

  ngOnInit(){
    this.cargarNoticias(this.categorias[2]);
  }

  cambioCategoria(event){
    this.noticias= [];
    this.cargarNoticias(event.detail.value);

  }

  cargarNoticias(categoria: string, event?){
    this.news.getTopHeadlinesByCategory(categoria)
    .subscribe(resp =>{
      this.noticias.push(...resp.articles);
      if(event){
        event.target.complete();
      }
    })
  }
  loadData(event){
    this.cargarNoticias(this.segmento.value, event)
  }
  

}
