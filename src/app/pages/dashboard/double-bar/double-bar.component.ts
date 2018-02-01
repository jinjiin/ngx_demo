import {Component, Input, OnInit, OnChanges, ChangeDetectionStrategy, ElementRef,     OnDestroy} from '@angular/core';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { NbThemeService } from '@nebular/theme';
import { PredictService } from '../../../@core/data/predict.service';
import { ReadjsonService } from '../../../@core/data/readjson.service';
import { AngularCompilerOptions } from '@angular/compiler-cli';

@Component({
  selector: 'ngx-double-bar',
  styleUrls: ['./double-bar.component.scss'],
  template:
 `
  <amCharts id="doublebar" [options]="options" [style.width.%]="100" [style.height.px]="500"></amCharts>
`,
})
export class DoubleBarComponent implements OnInit, OnDestroy {

  options: any;
  themeSubscription: any;
  jsondata: any;
  op: any;
  @Input() selectPN: string;
  constructor( private dataProvider: PredictService, private theme: NbThemeService, private readjsonService: ReadjsonService) {
        readjsonService.getJson('assets/jsonfiles/doublebar.json').subscribe(val => {
       this.jsondata = val;
     });
  }
  ngOnInit() {
    // this.options[0]['dataProvider'] =this.dataProvider.getData();
    this.options.dataProvider = this.dataProvider.getData();
    this.op = this.options.dataProvider;
  }
   ngOnChanges() {

   this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.options = {'type': 'serial',
                      'theme': 'light',
                      'dataDateFormat': 'YYYY',
                      'precision': 2,
                      'dataProvider': this.jsondata,
                      'valueAxes': [{
                                     'id': 'v1',
                                     'title': 'Factual',
                                     'position': 'left',
                                     'autoGridCount': false,
                                     'color': '#AAAAAA',
                                     'labelFunction': function(value) {
                                              return '$' + Math.round(value) + 'M';
                                     },
                                  }],
                        'graphs': [{
                        'id': 'g3',
                        'valueAxis': 'v1',
                        'lineColor': colors.info,
                        'fillColors': colors.info,
                        'fillAlphas': 1,
                        'type': 'column',
                        'title': 'Factual',
                        'valueField': 'Factual',
                        'clustered': false,
                        'columnWidth': 160,
                        'legendValueText': '$[[value]]M',
                        'balloonText': '[[title]]<br /><b style="font-size: 130%">$[[value]]M</b>',
                        }, {
                        'id': 'g4',
                        'valueAxis': 'v1',
                        'lineColor': colors.success,
                        'fillColors': colors.success,
                        'fillAlphas': 1,
                         'type': 'column',
                        'title': 'IB',
                        'valueField': 'IB',
                        'clustered': false,
                        'columnWidth': 80,
                        'legendValueText': '$[[value]]M',
                        'balloonText': '[[title]]<br /><b style="font-size: 130%">$[[value]]M</b>',
                        }, {
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
                        'title': 'RA',
                        'useLineColorForBulletBorder': true,
                        'valueField': 'RA',
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
                        'title': 'RA-Shift',
                        'useLineColorForBulletBorder': true,
                        'valueField': 'RA-Shift',
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
                        'title': 'history',
                        'useLineColorForBulletBorder': true,
                        'valueField': 'usage',
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
                        'title': 'IB',
                        'useLineColorForBulletBorder': true,
                        'valueField': 'ib',
                        'balloonText': '[[title]]<br /><b style="font-size: 130%">[[value]]</b>',
                        }],
                         'chartScrollbar': {
                         'graph': 'g1',
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


   ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }


}
