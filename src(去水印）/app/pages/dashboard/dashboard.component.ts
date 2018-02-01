import { Component } from '@angular/core';
@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
	pn: any;
	constructor() {
		this.pn = '04X0440';
	}

}
