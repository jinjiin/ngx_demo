import { Injectable } from '@angular/core';

@Injectable()
export class BaseInfoService {

 data=[{
    "CommodityVal": "LCD PANELS",
    "ProductName": "THINKPAD-T550",
    "Price": "14.3$",
    "Brand": "ThinkPad",
    "Usage": "8",
    "InstallBase": "4600",
    "Mean Usage": "13.96",
    "Total Weeks": "221",
    "Mean Gap":"4m",
    "SubstitutesPNS": "04X0439,04X0441,04X0804,00HM066",
    "LTB Time": "2017-05-20",
    "LifeCycle": "EOL"
}];

  constructor() { }
  getData() {
    return this.data;
  }
}
