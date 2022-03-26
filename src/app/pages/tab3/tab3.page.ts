import { Component } from '@angular/core';
import { Article } from '../../interface/index';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  get noticias(): Article[]{
    return this.storageService.getlocalNoticias;
  }

  constructor(private storageService:StorageService){}

}
