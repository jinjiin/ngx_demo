import { Component, OnInit } from '@angular/core';
import { ReadjsonService } from '../../../@core/data/readjson.service';

@Component({
  selector: 'ngx-readjson',
  templateUrl: './readjson.component.html',
  styleUrls: ['./readjson.component.scss'],
})
export class ReadjsonComponent implements OnInit {
  private url= 'assets/jsonfiles/doublebar.json';
  jsonInit: any;
  IB: any;
  selectitem: string;
  constructor(private readjsonService: ReadjsonService) {
       readjsonService.getJson(this.url).subscribe(val => {
       this.jsonInit = val;
     });
  }
  ngOnInit() {
  }
  onChange(event) {

    this.IB = this.readjsonService.getDataFilterBy(this.jsonInit, this.selectitem);

  }
}



