import {Component, Input, OnInit, OnChanges, OnDestroy, ChangeDetectionStrategy, ElementRef, SimpleChanges} from '@angular/core';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { NbThemeService } from '@nebular/theme';
import { ForecastService } from '../../../@core/data/forecast.service';
import { ReadjsonService } from '../../../@core/data/readjson.service';
import { AngularCompilerOptions } from '@angular/compiler-cli';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'ngx-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnChanges, OnDestroy {
  messinfo: any;
  flag:any;
  options: any;
  Longoptions:any;
  themeSubscription: any;
  jsondata: any;
  initialized = false;
  methods= [
              { id: 1, name: 'IB_M' },
              { id: 2, name: 'Com_M' },
              { id: 3, name: 'MA_W' },
              { id: 4, name: 'MA_4' },
              { id: 5, name: 'MA_8' },
              { id: 6, name: 'MA_16' }];
    bestM: any;
    RA: any;
    RAShift: any;
    IB: any;
    CommodityVal: any;
    ProductName: any;
    Price: any;
    CC: any;
    NewUsage: any;
    Stock: any;
    MeanUsage: any;
    TotalWeeks: any;
    MeanGap: any;
    SubstitutesPNS: any;
    Frequency: any;
    Match: any;
   Actual: any; // Actual
  Rap: any; // RA_P
  Rasp: any; // RA_S_P
  Ibp: any; // IB_P
  LTFdata: any;
  LTFoptions: any;
  MLTFdata: any;
  MLTFoptions: any;
 @Input() selectPN: string;
  Mdata: any;
  Ldata: any;
  constructor(private http: HttpClient, private dataProvider: ForecastService, private theme: NbThemeService, private readjsonService: ReadjsonService) {

  }

   ngOnChanges(changes:SimpleChanges) {
    if(!this.initialized) {
       this.messinfo = "";
       this.flag = false;
        this.CommodityVal="LCD PANELS";
        this.ProductName="THINKPAD-T550";
        this.Price=14.3+"$";
        this.CC="PL";
        this.NewUsage="8";
        this.Stock=0;
        this.MeanUsage=13.96;
        this.TotalWeeks=223;
        this.MeanGap=4;
        this.SubstitutesPNS="04X0439_04X0441_04X0804...";
        this.Frequency="High";
        this.Match="Yes";
        this.bestM="IB_M";
        this.RA="266.36";
        this.RAShift="393.48";
        this.IB="574.36";
        this.Actual = 'NA';
        this.Rap = 0;
        this.Rasp = 0;
        this.Ibp = 'NA';
      this.LTFdata = [{'name': 'RA', 'value': 266.36}, {'name': 'RASgift', 'value': 393.48}, {'name': 'IB', 'value': 574.36}];
      this.MLTFdata = [{'name': 'Actual', 'value': 0}, {'name': 'Rap', 'value': 0}, {'name': 'Rasp', 'value': 0}, {'name': 'Ibp', 'value': 0}];
      // this.LTFdata = [266.36, 393.48, 574.36];
      // this.MLTFdata = [0, 0,  0, 0];
      
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.setOptions(this.dataProvider.getData(), colors, this.bestM);
      this.setLongOpt(this.dataProvider.getData(), colors);
      this.setLTFoptions(this.LTFdata, config);
      this.setMLTFoptions(this.MLTFdata, config);
  });
    this.initialized = true;

   }else{
    this.jsondata = [];
    this.setJsonData(this.selectPN);
    }  
   

  }

 private onCertain():void{
  this.ProductName=this.readjsonService.getDataFilterBy(this.jsondata,'ProductName');
  this.CommodityVal=this.readjsonService.getDataFilterBy(this.jsondata,'CommodityVal');
  this.CC=this.readjsonService.getDataFilterBy(this.jsondata,'CC');
  this.NewUsage=this.readjsonService.getDataFilterBy(this.jsondata,'NewUsage');
  this.MeanGap=this.readjsonService.getDataFilterBy(this.jsondata,'Lag');
  this.MeanUsage=this.readjsonService.getDataFilterBy(this.jsondata,'MeanUsage');
  this.Price=this.readjsonService.getDataFilterBy(this.jsondata,'ListPrice');
  this.SubstitutesPNS=this.readjsonService.getDataFilterBy(this.jsondata,'SubsPNs');
  this.Frequency=this.readjsonService.getDataFilterBy(this.jsondata,'Frequency');
  this.Match=this.readjsonService.getDataFilterBy(this.jsondata,'Match');
  this.TotalWeeks=this.readjsonService.getDataFilterBy(this.jsondata,'TotalWeeks');
   this.messinfo=this.readjsonService.getDataFilterBy(this.jsondata,'Message');
   this.Actual = this.readjsonService.getDataFilterBy(this.jsondata, 'Actual');
   this.Rap = this.readjsonService.getDataFilterBy(this.jsondata, 'RA_P');
   this.Rasp = this.readjsonService.getDataFilterBy(this.jsondata, 'RA_S_P');
   this.Ibp = this.readjsonService.getDataFilterBy(this.jsondata, 'IB_P');
   this.bestM=this.readjsonService.getDataFilterBy(this.jsondata,'BestM');
  
  this.RA=this.readjsonService.getDataFilterBy(this.jsondata,'RA');
  this.RAShift=this.readjsonService.getDataFilterBy(this.jsondata,'RAShift');
  this.IB=this.readjsonService.getDataFilterBy(this.jsondata,'IB_S');
   
  this.LTFdata = [{'name': 'RA', 'value': this.RA}, {'name': 'RASgift', 'value': this.RAShift}, {'name': 'IB', 'value': this.IB}];
  this.MLTFdata = [{'name': 'Actual', 'value': this.Actual}, {'name': 'Rap', 'value': this.Rap}, {'name': 'Rasp', 'value':  this.RAShift}, {'name': 'Ibp', 'value': this.Ibp}];
      if (this.messinfo == '') {
        this.flag = false;
      }else{
        this.flag=true;
      }
  this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.setOptions(this.jsondata, colors,this.bestM);
      this.setLongOpt(this.jsondata, colors);
      this.setLTFoptions(this.LTFdata,  colors);
      this.setMLTFoptions(this.MLTFdata, colors);
      });

 }

   private  onSelect(method:any): void {
    //this.setJsonData(this.selectPN);
        this.bestM=this.readjsonService.getDataFilterBy(this.jsondata,'BestM');

        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.setOptions(this.jsondata,colors,method.name);
    });
  }
 
 private setJsonData(pn: any): void {
  
   this.readjsonService.getJson('assets/jsonfiles/' + pn + '.json').subscribe(val => this.jsondata = val);


 }
  private setLTFoptions(data: any, colors: any): void {
    this.LTFoptions = {
      'type': 'serial',
      'theme': 'light',
      'categoryField': 'name',
      'rotate': true,
      'startDuration': 1,
      'categoryAxis': {
      'gridPosition': 'start',
      'position': 'left',
      },
      'trendLines': [],
  'graphs': [
    {
      'balloonText': '[[value]]',
      'fillAlphas': 0.8,
      "id": "AmGraph-1",
      "lineAlpha": 0.2,
      "title": "Income",
      "type": "column",
      "valueField": "value",
    },
  ],
  "guides": [],
  "valueAxes": [
    {
      "id": "ValueAxis-1",
      "position": "top",
      "axisAlpha": 0,
      'color': '#AAAAAA',
    },
    
  ],
  "allLabels": [],
  "balloon": {},
  "titles": [],
  dataProvider: this.LTFdata,
    "export": {
      "enabled": true,
     },
    }
  }
  private setMLTFoptions(data: any, colors: any): void {
    this.MLTFoptions = {
      'type': 'serial',
      'theme': 'light',
      'categoryField': 'name',
      'rotate': true,
      'startDuration': 1,
      'categoryAxis': {
      'gridPosition': 'start',
      'position': 'left',
      },
      'trendLines': [],
  'graphs': [
    {
      'balloonText': '[[value]]',
      'fillAlphas': 0.8,
      "id": "AmGraph-1",
      "lineAlpha": 0.2,
      "title": "Income",
      "type": "column",
      "valueField": "value",
    },
  ],
  "guides": [],
  "valueAxes": [
    {
      "id": "ValueAxis-1",
      "position": "top",
      "axisAlpha": 0,
       'color': '#AAAAAA',
    },
  ],
  "allLabels": [],
  "balloon": {},
  "titles": [],
  dataProvider: this.MLTFdata,
    "export": {
      "enabled": true,
     },
    }
  }
 private setLongOpt(data:any,colors:any):void{
  this.Longoptions = {'type': 'serial',
                      'theme': 'light',
                      'dataDateFormat': 'YYYY-MM-DD',
                      'precision': 2,
                      'dataProvider': data,
                      'valueAxes': [{
                                     'id': 'v1',
                                     'title': 'long-term-Prediction',
                                     'position': 'left',
                                     'autoGridCount': false,
                                     'color': '#AAAAAA',
                                     'labelFunction': function(value) {
                                              return Math.round(value) ;
                                     },
                                  }],
                        'graphs': [{
                        'id': 'g1',
                        'valueAxis': 'v1',
                        'bullet': 'round',
                        'bulletBorderAlpha': 1,
                        'bulletColor': '#FFFFFF',
                        'bulletSize': 5,
                        'hideBulletsCount': 50,
                        'lineThickness': 2,
                        'lineColor': colors.danger,
                        'type': 'smoothedLine',
                        'title': 'Usage',
                        'useLineColorForBulletBorder': true,
                        'valueField': 'usage',
                        'balloonText': '[[title]]<br /><b style="font-size: 130%">[[value]]</b>',
                        }, {
                        'id': 'g2',
                        'valueAxis': 'v1',
                        'bullet': 'round',
                        'bulletBorderAlpha': 1,
                        'bulletColor': '#FFFFFF',
                        'bulletSize': 5,
                        'hideBulletsCount': 50,
                        'lineThickness': 2,
                        'lineColor': colors.defaultText,
                        'type': 'smoothedLine',
                        'dashLength': 5,
                        'title': 'IB',
                        'useLineColorForBulletBorder': true,
                        'valueField': 'IB_Trans',
                        'balloonText': '[[title]]<br /><b style="font-size: 130%">[[value]]</b>',
                        },{
                        'id': 'g3',
                        'valueAxis': 'v1',
                        'bullet': 'round',
                        'bulletBorderAlpha': 1,
                        'bulletColor': '#FFFFFF',
                        'bulletSize': 5,
                        'hideBulletsCount': 50,
                        'lineThickness': 2,
                        'lineColor': colors.info,
                        'type': 'smoothedLine',
                        'dashLength': 5,
                        'title': 'IB_Shift',
                        'useLineColorForBulletBorder': true,
                        'valueField': 'IB_Trans_Shift',
                        'balloonText': '[[title]]<br /><b style="font-size: 130%">[[value]]</b>',
                        },{
                        "id": "g4",
                        "title": "LTB_Pred",
                        "valueField": "LTB_Pred",
                        "lineAlpha": 0.5,
                        "lineColor": colors.warning,
                        "bullet": "round",
                        "dashLength": 2,
                        "bulletBorderAlpha": 1,
                        "bulletAlpha": 1,
                        "bulletSize": 2,
                        "stackable": false,
                        "bulletColor": "#FFFFFF",
                        "bulletBorderColor":colors.warning,
                        "bulletBorderThickness": 3,
                        "balloonText": '[[title]]<br /><b style="font-size: 130%">[[value]]</b>',
                        }],
                         'chartScrollbar': {
                         'graph': 'g2',
                         'oppositeAxis': false,
                         'offset': 30,
                         'scrollbarHeight': 50,
                         'backgroundAlpha': 0,
                         'selectedBackgroundAlpha': 0.1,
                         'selectedBackgroundColor': '#888888',
                         'graphFillAlpha': 0,
                         'graphLineAlpha': 0.5,
                         'selectedGraphFillAlpha': 0,
                         'selectedGraphLineAlpha': 1,
                         'autoGridCount': true,
                         'color': '#AAAAAA',
                         },
                         'chartCursor': {
                         'pan': true,
                         'valueLineEnabled': true,
                         'valueLineBalloonEnabled': true,
                         'cursorAlpha': 0,
                         'valueLineAlpha': 0.2,
                         },
                         'categoryField': 'date',
                         'categoryAxis': {
                         'parseDates': true,
                         'dashLength': 1,
                         'minorGridEnabled': true,
                         },
                         'legend': {
                         'useGraphSettings': true,
                         'position': 'top',
                         'color': '#AAAAAA',
                         'font-size': '200%', 
                         },
                         'balloon': {
                         'borderThickness': 1,
                         'shadowAlpha': 0,
                         },
                         'export': {
                         'enabled': true,
                         },
                      };
    
 }
 private setOptions(data: any,colors: any,bestmethod: any): void{
    this.options = {'type': 'serial',
                      'theme': 'light',
                      'dataDateFormat': 'YYYY-MM-DD',
                      'precision': 2,
                      'dataProvider': data,
                      'valueAxes': [{
                                     'id': 'v1',
                                     'title': 'Short-Term-Prediction',
                                     'position': 'left',
                                     'autoGridCount': false,
                                     'color': '#AAAAAA',
                                     'labelFunction': function(value) {
                                              return Math.round(value) ;
                                     },
                                  }],
                        'graphs': [{
                        'id': 'g1',
                        'valueAxis': 'v1',
                        'bullet': 'round',
                        'bulletBorderAlpha': 1,
                        'bulletColor': '#FFFFFF',
                        'bulletSize': 5,
                        'hideBulletsCount': 50,
                        'lineThickness': 2,
                        'lineColor': colors.danger,
                        'type': 'smoothedLine',
                        'title': 'Usage',
                        'useLineColorForBulletBorder': true,
                        'valueField': 'usage',
                        'balloonText': '[[title]]<br /><b style="font-size: 130%">[[value]]</b>',
                        }, {
                        'id': 'g2',
                        'valueAxis': 'v1',
                        'bullet': 'round',
                        'bulletBorderAlpha': 1,
                        'bulletColor': '#FFFFFF',
                        'bulletSize': 5,
                        'hideBulletsCount': 50,
                        'lineThickness': 2,
                        'lineColor': colors.defaultText,
                        'type': 'smoothedLine',
                        'dashLength': 5,
                        'title': 'IB',
                        'useLineColorForBulletBorder': true,
                        'valueField': 'IB_Trans',
                        'balloonText': '[[title]]<br /><b style="font-size: 130%">[[value]]</b>',
                        },{
                        'id': 'g3',
                        'valueAxis': 'v1',
                        'bullet': 'round',
                        'bulletBorderAlpha': 1,
                        'bulletColor': '#FFFFFF',
                        'bulletSize': 5,
                        'hideBulletsCount': 50,
                        'lineThickness': 2,
                        'lineColor': colors.info,
                        'type': 'smoothedLine',
                        'dashLength': 5,
                        'title': 'IB_Shift',
                        'useLineColorForBulletBorder': true,
                        'valueField': 'IB_Trans_Shift',
                        'balloonText': '[[title]]<br /><b style="font-size: 130%">[[value]]</b>',
                        },{
                        "id": "g4",
                        "title": bestmethod,
                        "valueField": bestmethod,
                        "lineAlpha": 0.5,
                        "lineColor": colors.warning,
                        "bullet": "round",
                        "dashLength": 2,
                        "bulletBorderAlpha": 1,
                        "bulletAlpha": 1,
                        "bulletSize": 2,
                        "stackable": false,
                        "bulletColor": "#FFFFFF",
                        "bulletBorderColor":colors.warning,
                        "bulletBorderThickness": 3,
                        "balloonText": '[[title]]<br /><b style="font-size: 130%">[[value]]</b>',
                        }],
                         'chartScrollbar': {
                         'graph': 'g2',
                         'oppositeAxis': false,
                         'offset': 30,
                         'scrollbarHeight': 50,
                         'backgroundAlpha': 0,
                         'selectedBackgroundAlpha': 0.1,
                         'selectedBackgroundColor': '#888888',
                         'graphFillAlpha': 0,
                         'graphLineAlpha': 0.5,
                         'selectedGraphFillAlpha': 0,
                         'selectedGraphLineAlpha': 1,
                         'autoGridCount': true,
                         'color': '#AAAAAA',
                         },
                         'chartCursor': {
                         'pan': true,
                         'valueLineEnabled': true,
                         'valueLineBalloonEnabled': true,
                         'cursorAlpha': 0,
                         'valueLineAlpha': 0.2,
                         },
                         'categoryField': 'date',
                         'categoryAxis': {
                         'parseDates': true,
                         'dashLength': 1,
                         'minorGridEnabled': true,
                         },
                         'legend': {
                         'useGraphSettings': true,
                         'position': 'top',
                         'color': '#AAAAAA',
                         'font-size': '200%',
                         },
                         'balloon': {
                         'borderThickness': 1,
                         'shadowAlpha': 0,
                         },
                         'export': {
                         'enabled': true,
                         },
                      };


  }
   ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }


      



}
