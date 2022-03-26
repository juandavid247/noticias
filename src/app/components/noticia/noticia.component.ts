import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interface/index';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { StorageService } from '../../services/storage.service';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;

  constructor(private iab: InAppBrowser,
              private actionSheetController: ActionSheetController,
              private socialSharing: SocialSharing,
              private  storageService: StorageService 
                
            ) { }

  ngOnInit() {}

  lanzarNoticia(){
    const browser = this.iab.create(this.noticia.url, '_system' );

  }

  async lanzarMenu(){

    const noticiaEnfavoritos= this.storageService.noticiaEnFavoritos(this.noticia);

    const actionSheet = await this.actionSheetController.create({
      buttons:[{
        text: 'Compartir Noticia',
        icon: 'share-social',
        handler: () => {
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url 
          )
        }
      },{
          text: noticiaEnfavoritos ? 'Remover de favoritos' : 'Agregar a Favoritos',
          icon: noticiaEnfavoritos ?'star-sharp': 'star-outline',
          
          handler: () => {
            this.storageService.saveRemoveNoticia(this.noticia);
          }
      },{
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }

}
