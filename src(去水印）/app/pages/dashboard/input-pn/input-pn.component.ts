import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-input-pn',
  templateUrl: './input-pn.component.html',
  styleUrls: ['./input-pn.component.scss'],
})
export class InputPnComponent implements OnInit {
  pn: string;
  constructor() { }

  ngOnInit() {
  }
  onChange(event) {
  }

}
