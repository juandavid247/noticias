import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interface/index';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  private _localNoticias: Article[] = [];

  constructor(private storage: Storage){
    this.init();
  }

  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async saveRemoveNoticia(noticia: Article){

    const existe = this._localNoticias.find(localNoticia => localNoticia.title === noticia.title);
    if(existe){
      this._localNoticias = this._localNoticias.filter(localNoticia => localNoticia.title !== noticia.title);
    }else{
      this._localNoticias = [noticia, ...this._localNoticias]
    }
    this.storage.set('noticias', this._localNoticias)
  }
  
  public get getlocalNoticias(){
    return this._localNoticias
  }
  noticiaEnFavoritos(noticia: Article){
    return !!this._localNoticias.find(localStorage => localStorage.title === noticia.title);
  }

  async cargarFavoritos(){
    try {
     if(this._storage.get('noticias')){
       this._storage.set('noticias', this._localNoticias)
     }else{
       const noticias = await this._storage.get('noticias');
       this._localNoticias = noticias;
     }
    }catch (error) {
      console.log(error);
    }
  }
}

