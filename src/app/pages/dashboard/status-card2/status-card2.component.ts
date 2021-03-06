import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-status-card2',
  styleUrls: ['./status-card2.component.scss'],
  template: `
  <nb-card>
      <!--<div class="icon-container">
        <div class="icon {{ type }}">
          <ng-content></ng-content>
        </div>
      </div>
    -->
      <div class="details">
      <div class="title">{{ title }}</div>
        <div class="description">{{ description }}</div>
      </div>
      <div class="stats-month">
          <span class="delta" [ngClass]="{ 'down': Down }">{{ growth }}</span>
          <span class="before">VS {{lastMonth}}</span>
        </div>
   </nb-card>
  `,
})
export class StatusCard2Component {

  @Input() title: string;
  @Input() type: string;
  @Input() description: string;
  @Input() Down: any;
  @Input() growth: string;
  @Input() lastMonth; any;
}
