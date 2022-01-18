import { Component, Inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirm-snackbar',
  templateUrl: './confirm-snackbar.component.html',
  styleUrls: ['./confirm-snackbar.component.scss']
})
export class ConfirmSnackbarComponent {

  constructor(@Inject(MatSnackBarRef) public snackbar: MatSnackBarRef<any>) { }

}
