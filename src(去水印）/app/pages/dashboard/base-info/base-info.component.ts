import { Component, Input, OnInit, OnChanges, ChangeDetectionStrategy, ElementRef,OnDestroy} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ReadjsonService } from '../../../@core/data/readjson.service';
@Component({
  selector: 'ngx-base-info',
  templateUrl: './base-info.component.html',
  styleUrls: ['./base-info.component.scss']
})
export class BaseInfoComponent{
  jsondata: any;
    CommodityVal="LCD PANELS";
    ProductName="THINKPAD-T550";
    Price="14.3$";
    Brand="ThinkPad";
    Usage="8";
    InstallBase="4600";
    MeanUsage="13.96";
    TotalWeeks="221";
    MeanGap="4m";
    SubstitutesPNS="04X0439,04X0441,04X0804,00HM066";
    LTBTime="2017-05-20";
    LifeCycle="EOL";
   @Input() selectPN: string;
  constructor(private readjsonService: ReadjsonService) {
        readjsonService.getJson('assets/jsonfiles/base-info.json').subscribe(val => {
       this.jsondata = val;
     });
        
   }
  ngOnChanges(){
  	    this.CommodityVal=this.jsondata[0].CommodityVal;
        this.ProductName=this.jsondata[0].ProductName;
        this.Price=this.jsondata[0].Price;
        this.Brand=this.jsondata[0].Brand;
        this.Usage=this.jsondata[0].Usage;
        this.InstallBase=this.jsondata[0].InstallBase;
        this.MeanUsage=this.jsondata[0].MeanUsage;
        this.TotalWeeks=this.jsondata[0].TotalWeeks;
        this.MeanGap=this.jsondata[0].MeanGap;
        this.SubstitutesPNS=this.jsondata[0].SubstitutesPNS;
        this.LifeCycle=this.jsondata[0].LifeCycle;

  }

}
