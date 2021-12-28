import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeeService } from '../../services/fee.service';

@Component({
  selector: 'app-fees-view',
  templateUrl: './fees-view.component.html',
  styleUrls: ['./fees-view.component.scss']
})
export class FeesViewComponent {
  fees = this.feeService.getAll();

  constructor(private feeService: FeeService, private route: ActivatedRoute) {}

  get isFormActive(): boolean {
    return Boolean(this.route.firstChild);
  }
}
