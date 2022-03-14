import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HouseService } from '../../services/house.service';
import { HouseImportComponent } from '../house-import/house-import.component';

@Component({
  selector: 'app-houses-menu',
  templateUrl: './houses-menu.component.html',
  styleUrls: ['./houses-menu.component.scss']
})
export class HousesMenuComponent {
  houses = this.houseService.getAll();

  constructor(private houseService: HouseService, private snackbar: MatSnackBar, private router: Router) {}

  async importHouse() {
    const promptRef = this.snackbar.openFromComponent(HouseImportComponent, {duration: undefined});
    const result = await lastValueFrom(promptRef.afterDismissed());

    if (result.dismissedByAction) {
      const uuid = promptRef.instance.uuid.value;
      await this.router.navigate(['fees', uuid]);
    }
  }
}
