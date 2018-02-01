import {Component, Input, OnInit, OnChanges, OnDestroy, ChangeDetectionStrategy, ElementRef} from '@angular/core';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { NbThemeService } from '@nebular/theme';
import { ForecastService } from '../../../@core/data/forecast.service';
import { ReadjsonService } from '../../../@core/data/readjson.service';
import { AngularCompilerOptions } from '@angular/compiler-cli';

@Component({
  selector: 'ngx-long-term',
  
  styleUrls: ['./long-term.component.scss'],
  templateUrl: './long-term.component.html',
})
export class LongTermComponent implements OnChanges, OnDestroy {

  options: any;
  themeSubscription: any;
  jsondata: any;
  initialized=false;
  
  data:any;
  RA:any;
  RAShift:any;
  IB:any;
  @Input() selectPN: string;
  constructor( private dataProvider: ForecastService, private theme: NbThemeService, private readjsonService: ReadjsonService) {
        readjsonService.getJson('assets/jsonfiles/predict.json').subscribe(val => {
       this.jsondata = val;
     });
        

  }
   
   ngOnChanges() {
    if(!this.initialized){
        this.RA="266.36";
        this.RAShift="393.48";
        this.IB="574.36";
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.options = {'type': 'serial',
                      'theme': 'light',
                      'dataDateFormat': 'YYYY-MM-DD',
                      'precision': 2,
                      'dataProvider': this.dataProvider.getData(),
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
                        }, {
                        'id': 'g5',
                        'valueAxis': 'v1',
                        'bullet': 'round',
                        'bulletBorderAlpha': 1,
                        'bulletColor': '#FFFFFF',
                        'bulletSize': 5,
                        'hideBulletsCount': 50,
                        'lineThickness': 2,
                        'lineColor': colors.defaultText,
                        'type': 'smoothedLine',
                        'title': 'IB_Shift',
                        'useLineColorForBulletBorder': true,
                        'valueField': 'IB_Trans_Shift',
                        'balloonText': '[[title]]<br /><b style="font-size: 130%">[[value]]</b>',
                        }, {
                        'id': 'g6',
                        'valueAxis': 'v1',
                        'bullet': 'round',
                        'bulletBorderAlpha': 1,
                        'bulletColor': '#FFFFFF',
                        'bulletSize': 5,
                        'hideBulletsCount': 50,
                        'lineThickness': 2,
                        'lineColor': colors.warning,
                        'type': 'smoothedLine',
                        'title': 'MA_W',
                        'useLineColorForBulletBorder': true,
                        'valueField': 'MA_W',
                        'balloonText': '[[title]]<br /><b style="font-size: 130%">[[value]]</b>',
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
    });
    this.initialized=true;

   }else{
       this.RA="266.36";
        this.RAShift="393.48";
        this.IB="574.36";
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.options = {'type': 'serial',
                      'theme': 'light',
                      'dataDateFormat': 'YYYY-MM-DD',
                      'precision': 2,
                      'dataProvider': this.jsondata,
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
                        "lineColor": colors.primary,
                        "bullet": "round",
                        "dashLength": 2,
                        "bulletBorderAlpha": 1,
                        "bulletAlpha": 1,
                        "bulletSize": 2,
                        "stackable": false,
                        "bulletColor": "#FFFFFF",
                        "bulletBorderColor":colors.primary,
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
    });
   }  
   

  }


   ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }


}
