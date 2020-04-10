import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { NgxElectronModule } from 'ngx-electron';

@NgModule({
  declarations: [
    PageNotFoundComponent, 
    WebviewDirective, 
  ],
  imports: [
    CommonModule, 
    TranslateModule, 
    FormsModule,
    YouTubePlayerModule,
    NgxElectronModule,
    InfiniteScrollModule
  ],
  exports: [
    TranslateModule, 
    WebviewDirective, 
    FormsModule,
    YouTubePlayerModule,
    NgxElectronModule,
    InfiniteScrollModule
  ]
})
export class SharedModule {}
