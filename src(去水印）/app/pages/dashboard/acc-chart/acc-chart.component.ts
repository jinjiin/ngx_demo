import {Component, Input, OnInit, OnChanges, ChangeDetectionStrategy, ElementRef,     OnDestroy} from '@angular/core';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { NbThemeService } from '@nebular/theme';
import { PredictService } from '../../../@core/data/predict.service';
import { AngularCompilerOptions } from '@angular/compiler-cli';

@Component({
  selector: 'ngx-acc-chart',
  styleUrls: ['./acc-chart.component.scss'],
  template:
 `
  <amCharts id="dsfads" [options]="options" [style.width.%]="100" [style.height.px]="180"></amCharts>
`,
})
export class AccChartComponent implements OnInit, OnDestroy {

  options: any;
  themeSubscription: any;
  jsondata: any;
  op: any;
  constructor( private dataProvider: PredictService, private theme: NbThemeService) {
  }
   ngOnInit() {

   this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.options = {'type': 'serial',
                      'theme': 'light',
                      'dataDateFormat': 'YYYY',
                      'precision': 2,
                      'dataProvider': this.dataProvider.getData(),
                      'valueAxes': [{
                                     'id': 'v1',
                                     'title': 'Accuracy',
                                     'position': 'left',
                                     'autoGridCount': false,
                                     'color': '#AAAAAA',
                                     'labelFunction': function(value) {
                                              return  Math.round(value) + '%';
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
                        'title': 'MV-4',
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
                        'title': 'MV-8',
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
                        'title': 'Usage',
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
