import { Component } from '@angular/core';
import { ReadjsonService } from '../../@core/data/readjson.service';
@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  Usage: any;
  Inv: any;
  Value: any;
  UsagePrice: any;
  Usa_growth: any;
    Usa_Down = true;
    Val_Down = true;
    Val_growth: any;
    Inv_growth: any;
    Inv_Down = true;
    WW_growth: any;
    WW_Down = true;
    AP_growth: any;
    AP_Down= true;
    LAS_growth: any;
    LAS_Down= true;
    EMEA_growth: any;
    EMEA_Down= true;
    NA_growth: any;
    NA_Down:boolean;

  AP_Geo : any;
  EMEA_Geo : any;
  LAS_Geo : any;
  NA_Geo : any;
  AP_Usa : any;
  EMEA_Usa: any;
  LAS_Usa : any;
  NA_Usa : any;
  AP_Geo_last: any;
  EMEA_Geo_last: any;
  LAS_Geo_last : any;
  NA_Geo_last : any;
  AP_Usa_last : any;
  EMEA_Usa_last: any;
  LAS_Usa_last : any;
  NA_Usa_last : any;
  WW: any;
  last_month_usa: any;
  last_month_Val: any;
  last_month_Inv: any;
  last_month_WW: any;
  constructor(private readjsonService: ReadjsonService) {
        readjsonService.getJson('assets/jsonfiles/dashboard1.json').subscribe(val => {

      this.Usage = val.MonthUsage;
      this.last_month_usa = val.LastMonthUsage;
      this.WW = val.WW;
      this.last_month_WW = val.lastWW;
      this.Value = val.Value;//this.AP_Usa + this.EMEA_Usa + this.LAS_Usa + this.NA_Usa;
      this.Usa_growth = this.Usage - this.last_month_usa;
      this.last_month_Val = val.lastvalue;//this.AP_Usa_last + this.EMEA_Usa_last + this.LAS_Usa_last + this.NA_Usa_last;
      this.last_month_Inv = val.lastinventory;//this.AP_Geo_last + this.EMEA_Geo_last + this.LAS_Geo_last + this.NA_Geo_last + this.last_month_WW;
      this.Inv = val.inventory;//this.AP_Geo + this.EMEA_Geo + this.LAS_Geo + this.NA_Geo + this.WW;
      this.Val_growth = (this.Value- this.last_month_Val)/this.last_month_Val;
      this.Inv_growth = (this.Inv - this.last_month_Inv)/this.last_month_Inv;
      this.WW_growth = (this.WW - this.last_month_WW)/this.WW;
      this.Inv = '$'+String(this.Inv) + 'M';
      this.Value = '$'+String(this.Value) + 'M';
      this.last_month_Val = '$'+String(this.last_month_Val) + 'M';
      this.last_month_Inv ='$'+String( this.last_month_Inv) + 'M';
      this.WW = '$'+ String(this.WW) +'M';
      this.last_month_WW = '$'+ String(this.last_month_WW) + 'M';
      if (this.Val_growth<0)
      {
        this.Val_growth = String(Math.floor( this.Val_growth * 100)) + '%'; 
        this.Val_Down = true;
      }
      else
      {
        this.Val_growth = '+' + String(Math.floor( this.Val_growth * 100)) + '%'; 
        this.Val_Down = false;
      }
      if (this.Usa_growth < 0)
      {
          this.Usa_growth = String(Math.floor( this.Usa_growth / this.last_month_usa * 100)) + '%';
          this.Usa_Down = true;
      }
      else
      {
          this.Usa_growth = '+' +String(Math.floor( this.Usa_growth / this.last_month_usa * 100)) + '%';
          this.Usa_Down = false;
      }
        if (this.Inv_growth<0)
        {
          this.Inv_growth = String(Math.round( this.Inv_growth * 100)) + '%';
          this.Inv_Down = false;
        }
        else
        {
          this.Inv_growth = '+' + String(Math.round( this.Inv_growth * 100)) + '%';
          this.Inv_Down = true;
        }
        if (this.WW_growth<0)
        {
          this.WW_growth = String(Math.floor(this.WW_growth * 100)) + '%';
          this.WW_Down = false;
        }
        else
        {
          this.WW_growth = '+' +String(Math.floor(this.WW_growth * 100)) + '%';
          this.WW_Down = true;
        }
    
    this.last_month_usa = String(Math.round(this.last_month_usa / 1000)) + 'K';
    this.Usage = String(Math.round(this.Usage / 1000)) + 'K';
    
    this.AP_Geo = val.AP;
    this.AP_Geo_last = val.lastAP;
    this.AP_growth = Math.floor( (this.AP_Geo - this.AP_Geo_last)/this.AP_Geo_last* 100)+ '%';
    if (this.AP_Geo - this.AP_Geo_last<0)
    {
      this.AP_Down = false;
    }
    else
    {
      this.AP_growth = '+' + this.AP_growth;
      this.AP_Down = true;
    }
      this.AP_Geo = '$' + this.AP_Geo + "M";
    this.AP_Geo_last = '$' + this.AP_Geo_last + "M";
    //this.AP_growth = this.AP_growth ;     //this.AP_growth = String(Math.floor( this.AP_growth))) + '%'; 

    this.EMEA_Geo = val.EMEA;
    this.EMEA_Geo_last = val.lastEMEA;
    this.EMEA_growth = Math.floor( (this.EMEA_Geo - this.EMEA_Geo_last)/this.EMEA_Geo_last* 100)+ '%';
    if (this.EMEA_Geo - this.EMEA_Geo_last<0)
          this.EMEA_Down = false;
    else
    {
      this.EMEA_Down = true;
      this.EMEA_growth = '+' + this.EMEA_growth;
    }
          
      this.EMEA_Geo = '$' + this.EMEA_Geo + "M";
    this.EMEA_Geo_last = '$' + this.EMEA_Geo_last + "M";

    this.LAS_Geo = val.LAS;
    this.LAS_Geo_last = val.lastLAS;
    this.LAS_growth = Math.floor( (this.LAS_Geo - this.LAS_Geo_last)/this.LAS_Geo_last* 100)+ '%';
    if (this.LAS_Geo - this.LAS_Geo_last<0)
          this.LAS_Down = false;
    else
    {
      this.LAS_Down = true;  
      this.LAS_growth = '+' + this.LAS_growth;
    }
            
      this.LAS_Geo = '$' + this.LAS_Geo + "M";
    this.LAS_Geo_last = '$' + this.LAS_Geo_last + "M";

    this.NA_Geo = val.NAG;
    this.NA_Geo_last = val.lastNAG;
    this.NA_growth = Math.floor( (this.NA_Geo - this.NA_Geo_last)/this.NA_Geo_last* 100)+ '%';
    if (this.NA_Geo - this.NA_Geo_last<0)
          this.NA_Down = false;
    else
    {
      this.NA_Down = true;
      this.NA_growth = '+' + this.NA_growth;
    }
              
      this.NA_Geo = '$' + this.NA_Geo + "M";
    this.NA_Geo_last = '$' + this.NA_Geo_last + "M";
   });
    }

}
