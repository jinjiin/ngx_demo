import { Component, OnInit, OnDestroy } from '@angular/core';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-combined-chart',
  templateUrl: './combined-chart.component.html',
  styleUrls: ['./combined-chart.component.scss'],
})
export class CombinedChartComponent implements OnInit, OnDestroy {
  public options: any;
  private chart2: AmChart;
  private timer: any;
  themeSubscription: any;

  constructor(private AmCharts: AmChartsService, private theme: NbThemeService) {}

  makeRandomDataProvider() {
    const dataProvider = [];

    // Generate random data
    for (let year = 1950; year <= 2005; ++year) {
       dataProvider.push({
        year: '' + year + '10-11',
        market1: Math.floor(Math.random() * 100),
        market2: Math.floor(Math.random() * 50),
        sale1: Math.floor(Math.random() * 100) - 50,
        sale2: Math.floor(Math.random() * 100) + 50,
      });
    }

    return dataProvider;
  }

  makeOptions(dataProvider, layoutColors) {
    return {
      'type': 'serial',
      'theme': 'light',
      'marginTop': 0,
      'marginRight': 200,
      'dataProvider': dataProvider,
      'valueAxes': [{
        'axisAlpha': 0,
        'position': 'left',
        color: layoutColors.primaryLight,
        axisColor: layoutColors.defaultText,
        gridColor: layoutColors.defaultText,
      },
      {
        'gridAlpha': 0,
        'position': 'right',
        color: layoutColors.primaryLight,
        axisColor: layoutColors.defaultText,
        gridColor: layoutColors.defaultText,
      }],
      'graphs': [{
        'id': 'g1',
        color: layoutColors.defaultText,
        'valueAxis': 'v1',
        'lineColor': layoutColors.primaryLight,
        'fillColors': layoutColors.primaryLight,
        'fillAlphas': 0.8,
        'lineAlpha': 0.8,
        'type': 'column',
        'valueField': 'market1',
        'title': 'market1',
        'clustered': false,
        'columnWidth': 0.5,
        'lineColorField' : layoutColors.defaultText,
        'balloonText': '[[title]]<br/><b style=\'font-size: 130%\'>$[[value]]M</b>',
      }, {
        'id': 'g2',
        color: layoutColors.defaultText,
        'valueAxis': 'v1',
        'lineColor': layoutColors.success,
        'fillColors': layoutColors.success,
        'fillAlphas': 0.8,
        'lineAlpha': 0.8,
        'type': 'column',
        'valueField': 'market2',
        'title': 'market2',
        'clustered': false,
        'columnWidth': 0.5,
        'lineColorField' : layoutColors.defaultText,
        'balloonText': '[[title]]<br/><b style=\'font-size: 130%\'>$[[value]]M</b>',
      }, {
         'id': 'g3',
        'valueAxis': 'v2',
        'bullet': 'round',
        'bulletBorderAlpha': 1,
        'bulletColor': layoutColors.defaultText,
         color: layoutColors.defaultText,
        'bulletSize': 5,
        'hideBulletsCount': 50,
        'lineThickness': 2,
        'lineColor': layoutColors.danger,
        'type': 'smoothedLine',
        'title': 'sale1',
        'userLineColorForBulletBorder': true,
        'valueField': 'sale1',
        'lineColorField' : '#d1655d',
        'balloonText': '[[title]]<br/><b style=\'font-size: 130%\'>$[[value]]M</b>',
      }, {
         'id': 'g4',
        'valueAxis': 'v2',
        'bullet': 'round',
        'bulletBorderAlpha': 1,
        'bulletColor': layoutColors.defaultText,
         color: layoutColors.defaultText,
        'bulletSize': 5,
        'hideBulletsCount': 50,
        'lineThickness': 2,
        'lineColor': layoutColors.warning,
        'type': 'smoothedLine',
        'title': 'sale2',
        'userLineColorForBulletBorder': true,
        'valueField': 'sale2',
        'lineColorField' : '#d1655d',
        'balloonText': '[[title]]<br/><b style=\'font-size: 130%\'>$[[value]]M</b>',
      },
      ],
      'chartScrollbar': {
        'graph': 'g1',
        'gridAlpha': 0,
        'color': layoutColors.body,
        'scrollbarHeight': 55,
        'backgroundAlpha': 0,
        'selectedBackgroundAlpha': 0.1,
        'selectedBackgroundColor': layoutColors.body,
        'graphFillAlpha': 0,
        'autoGridCount': true,
        'selectedGraphFillAlpha': 0,
        'graphLineAlpha': 0.2,
        'graphLineColor': '#c2c2c2',
        'selectedGraphLineColor': layoutColors.body,
        'selectedGraphLineAlpha': 1,
      },
      'chartCursor': {
        'categoryBalloonDateFormat': 'YYYY',
        'cursorAlpha': 0,
        'valueLineEnabled': true,
        'valueLineBalloonEnabled': true,
        'valueLineAlpha': 0.5,
        'fullWidth': true,
        'cursorColor' : layoutColors.danger,
      },
      'dataDateFormat': 'YYYY-MM-DD',
      'categoryField': 'year',
      'categoryAxis': {
        'axisColor': layoutColors.body,
        'color': layoutColors.body,
        'grayColor': layoutColors.body,
        'minPeriod': 'YYYY',
        'parseDates': true,
        'minorGridAlpha': 0.1,
        'minorGridEnabled': true,
      },
      'export': {
        'enabled': true,
      },
    };
  }

  ngOnInit() {
    // Create chartdiv1
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.options = this.makeOptions(this.makeRandomDataProvider(), colors);
      this.timer = setInterval(() => {}, 10000);
    });
  }

   ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
