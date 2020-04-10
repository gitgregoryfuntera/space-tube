import { ElectronService } from 'ngx-electron';
import { Component, AfterViewInit } from '@angular/core';
import * as path from 'path';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
 
  opacityValue = 0.2;

  youtubeView = [];

  constructor(
    private electronSvc: ElectronService,
  ) { }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    const webview = document.querySelector('webview')
    const root = webview.shadowRoot;
    this.youtubeView = Array.from(root.childNodes);
    console.log(this.youtubeView);
    this.updateWebView();
    console.log(root);
  }

  onChangeOpacity(indicator: number) {
    if (indicator === 0) {
      if (this.opacityValue > 0.2) {
        this.opacityValue = Number((this.opacityValue - 0.1).toFixed(1));
      }
    } 
    
    else {
      if (this.opacityValue < 1.0) {
        this.opacityValue = Number((this.opacityValue + 0.1).toFixed(1));
      }
    }

    this.updateWebView();
  }

  updateWebView() {
    this.youtubeView.forEach(childNode => {
      console.log('node names',childNode.nodeName);
      if (childNode.nodeName === 'STYLE') {
        childNode.textContent = `
            iframe {
              background-color: transparent !important;
              opacity:${this.opacityValue};
            }
        `
      }
    });
  }

}
