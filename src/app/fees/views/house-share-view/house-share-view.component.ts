import { PlatformLocation } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseService } from 'core/services/house.service';
import { SyncService } from 'core/services/sync.service';
import { House } from 'core/types/house';
import { map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-house-share-view',
  templateUrl: './house-share-view.component.html',
  styleUrls: ['./house-share-view.component.scss']
})
export class HouseShareViewComponent implements OnInit, OnDestroy {
  private destroyed = new Subject<void>();

  @ViewChild('qrCanvas') qrCanvas!: ElementRef<HTMLCanvasElement>;

  house = this.route.parent!.data
    .pipe(
      map(data => data['house'] as House)
    );

  shareUuid = this.house
    .pipe(
      map(house => house.uuid)
    );

  shareUrl = this.house
    .pipe(
      map(house => {
        const path = this.router.createUrlTree(['../..', house.uuid], {relativeTo: this.route}).toString();
        const baseHref = this.location.getBaseHrefFromDOM();
        const hostname = window.location.origin;
        return `${hostname}${baseHref}${path.replace('/', '')}`;
      })
    );

  get houseUuid(): string {
    return this.route.snapshot.parent!.data['house'].uuid;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private houseService: HouseService,
    private syncService: SyncService,
    private snackBar: MatSnackBar,
    private location: PlatformLocation,
  ) { }

  async ngOnInit() {
    this.syncService.requestSync(this.houseUuid);

    // @ts-ignore
    const QRious = (await import('qrious')).default;
    this.shareUrl
      .pipe(takeUntil(this.destroyed))
      .subscribe(shareLink => new QRious({element: this.qrCanvas.nativeElement, value: shareLink}));
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  onCopyUrl() {
    this.snackBar.open($localize `URL copied to clipboard!`);
  }

  async disableSharing() {
    await this.houseService.disableSync(this.houseUuid);
    this.snackBar.open($localize `Sharing disabled!`);
    this.router.navigate(['..'], {relativeTo: this.route});
  }
}
