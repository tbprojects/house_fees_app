import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeeService } from 'core/services/fee.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-fees-view',
  templateUrl: './fees-view.component.html',
  styleUrls: ['./fees-view.component.scss']
})
export class FeesViewComponent {
  fees = this.route.data
    .pipe(
      switchMap(data => this.feeService.getAll(data['house'].uuid))
    );

  constructor(private feeService: FeeService, private route: ActivatedRoute) {}
}
