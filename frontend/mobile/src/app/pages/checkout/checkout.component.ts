import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Checkout} from '../../../../../shared/business/domain/enumeration/checkout';
import {DataService} from '../../../../../shared/business/services/data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public checkoutOptions = Object.keys(Checkout).map(k => Checkout[k]);

  constructor(public data: DataService, private router: Router) { }

  ngOnInit() {
  }

  onCheckoutSelected(option: Checkout) {
    this.data.updateSelection({checkout: this.data.applicationStatus.checkout});
    this.data.applicationStatus.checkout = option;
    this.router.navigate(['/confirmation']);
  }
}
