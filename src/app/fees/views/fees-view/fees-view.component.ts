import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeeService } from 'core/services/fee.service';
import { House } from 'core/types/house';
import { distinctUntilKeyChanged, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-fees-view',
  templateUrl: './fees-view.component.html',
  styleUrls: ['./fees-view.component.scss']
})
export class FeesViewComponent {
  fees = this.route.data
    .pipe(
      map(data => data['house'] as House),
      distinctUntilKeyChanged('uuid'),
      switchMap(house => this.feeService.getAll(house.uuid!))
    );

  constructor(private feeService: FeeService, private route: ActivatedRoute) {}
}
