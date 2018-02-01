import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-card',
  styleUrls: ['./card.component.scss'],
  template: `
    <nb-card>
      <div class="details">
        <div class="title">{{ title }}</div>
        <div class="description">{{ description }}</div>
      </div>
    </nb-card>
  `,
})
export class CardComponent {

  @Input() title: string;
  @Input() description: string;
}
