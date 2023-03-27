import { Component, Inject } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-house-import',
  templateUrl: './house-import.component.html',
  styleUrls: ['./house-import.component.scss']
})
export class HouseImportComponent {
  uuid = new UntypedFormControl('', {validators: [Validators.required]});

  constructor(@Inject(MatSnackBarRef) public snackbar: MatSnackBarRef<any>) { }

}
