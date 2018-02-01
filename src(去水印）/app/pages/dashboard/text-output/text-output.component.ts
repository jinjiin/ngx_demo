import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-text-output',
  styleUrls: ['./text-output.component.scss'],
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
    </nb-card>
  `,
})
export class TextOutputComponent {

  @Input() title: string;
  @Input() type: string;
  @Input() description: string;
}
