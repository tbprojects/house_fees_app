import { Component, ElementRef, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseService } from 'core/services/house.service';
import { House } from 'core/types/house';
import { lastValueFrom } from 'rxjs';
import { ConfirmSnackbarComponent } from 'shared/components/confirm-snackbar/confirm-snackbar.component';
import { HouseFormBuilder } from '../../services/house.form-builder';

@Component({
  selector: 'app-house-form-view',
  templateUrl: './house-form-view.component.html',
  styleUrls: ['./house-form-view.component.scss'],
  providers: [HouseFormBuilder]
})
export class HouseFormViewComponent implements OnInit {

  form = this.fb.buildForm();

  constructor(
    private fb: HouseFormBuilder,
    private snackBar: MatSnackBar,
    private houseService: HouseService,
    private route: ActivatedRoute,
    private router: Router,
    private elRef: ElementRef,
  ) {}

  get houseUuid(): string {
    return this.form.get('uuid')!.value;
  }

  ngOnInit() {
    this.route.parent!.data.subscribe(({house}) => {
      this.form.patchValue(house);
      this.form.markAsPristine();
      this.form.markAsUntouched();
      this.elRef.nativeElement.scrollIntoView({behavior: 'smooth'});
    })
  }

  async save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snackBar.open($localize `Fill required fields`);
      return;
    }

    const house: House = this.form.value;
    await this.houseService.save(house);
    this.snackBar.open($localize `House saved!`);
    await this.router.navigate(['..'], {relativeTo: this.route});
  }

  async remove() {
    const confirmRef = this.snackBar.openFromComponent(ConfirmSnackbarComponent, {duration: undefined})
    const result = await lastValueFrom(confirmRef.afterDismissed());

    if (result.dismissedByAction) {
      await this.houseService.remove(this.houseUuid);
      this.snackBar.open($localize `House removed!`);
      await this.router.navigate(['../..'], {relativeTo: this.route});
    }
  }

  cancel() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }

}
