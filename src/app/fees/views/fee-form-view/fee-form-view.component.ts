import { Component, ElementRef, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FeeService } from 'core/services/fee.service';
import { SyncService } from 'core/services/sync.service';
import { lastValueFrom } from 'rxjs';
import { ConfirmSnackbarComponent } from 'shared/components/confirm-snackbar/confirm-snackbar.component';
import { dateDbFormat } from 'utils/date-db-format';
import { feeConfig } from '../../data/fee-config';
import { FeeFormBuilder } from '../../services/fee.form-builder';

@Component({
  selector: 'app-fee-form-view-view',
  templateUrl: './fee-form-view.component.html',
  styleUrls: ['./fee-form-view.component.scss'],
  providers: [FeeFormBuilder]
})
export class FeeFormViewComponent implements OnInit {
  feeTypeOptions = Array.from(feeConfig.entries()).map(([value, {label}]) => ({value, label}));
  form = this.fb.buildForm();

  constructor(
    private fb: FeeFormBuilder,
    private snackBar: MatSnackBar,
    private feeService: FeeService,
    private syncService: SyncService,
    private route: ActivatedRoute,
    private router: Router,
    private elRef: ElementRef,
  ) { }

  get feeUuid(): string {
    return this.form.get('uuid')!.value;
  }

  get houseUuid(): string {
    return this.form.get('houseUuid')!.value;
  }

  ngOnInit() {
    this.route.data.subscribe(({fee}) => {
      const {startAt, endAt, ...formValue} = fee;
      formValue.startAt = new Date(startAt);
      formValue.endAt = new Date(endAt);
      this.form.patchValue(formValue);
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

    const {startAt, endAt, ...fee} = this.form.value;
    fee.startAt = dateDbFormat(startAt);
    fee.endAt = dateDbFormat(endAt);
    await this.feeService.save(fee);
    this.syncService.requestSync(this.houseUuid);
    this.snackBar.open($localize `Fee saved!`);
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  async remove() {
    const confirmRef = this.snackBar.openFromComponent(ConfirmSnackbarComponent, {duration: undefined})
    const result = await lastValueFrom(confirmRef.afterDismissed());

    if (result.dismissedByAction) {
      await this.feeService.remove(this.feeUuid);
      this.syncService.requestSync(this.houseUuid);
      this.snackBar.open($localize `Fee removed!`);
      this.router.navigate(['..'], {relativeTo: this.route});
    }
  }

  cancel() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }
}
