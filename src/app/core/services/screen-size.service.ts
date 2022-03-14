import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {
  smallScreen: Observable<boolean> = this.breakpoint
    .observe([Breakpoints.Small, Breakpoints.XSmall])
    .pipe(map(result => result.matches))

  constructor(private breakpoint: BreakpointObserver) { }
}
