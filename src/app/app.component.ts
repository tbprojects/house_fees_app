import { Component, HostBinding, OnInit } from '@angular/core';
import { ScreenSizeService } from 'core/services/screen-size.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @HostBinding('class.small-screen')
  smallScreen: boolean = false;

  constructor(private screenSize: ScreenSizeService) {}

  ngOnInit() {
    this.screenSize.smallScreen.subscribe(smallScreen => this.smallScreen = smallScreen);
  }
}
