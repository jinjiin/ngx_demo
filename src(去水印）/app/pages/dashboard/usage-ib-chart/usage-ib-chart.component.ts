import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { UsageIbService } from '../../../@core/data/usage-ib.service';
import { ReadjsonService } from '../../../@core/data/readjson.service';
import { InputPnComponent } from '../input-pn/input-pn.component';
declare const echarts: any;

@Component({
  selector: 'ngx-usage-ib-chart',
  templateUrl: './usage-ib-chart.component.html',
  template: `
    <div echarts [options]="option" class="echart"></div>
  `,
})
export class UsageIbChartComponent implements AfterViewInit, OnDestroy {
  option: any = {};
  themeSubscription: any;
  data: any;
  constructor(private readjsonService: ReadjsonService, private theme: NbThemeService,
  	private usageibService: UsageIbService) {
    readjsonService.getJson('assets/jsonfiles/usage-ib.json').subscribe(val => {
    this.data = val;
    });
   }

  ngAfterViewInit() {
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const echart: any = config.variables.echarts;
      this.option = {
        backgroundColor: echart.bg,
        color: [colors.success, colors.info],
        tooltip: {
          trigger: 'none',
          axisPointer: {
            type: 'cross',
          },
        },
        legend: {
          data: ['InstallBase', 'Usage'],
          textStyle: {
            color: echart.textColor,
          },
        },
        grid: {
          top: 70,
          bottom: 50,
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors.info,
              },
            },
            axisLabel: {
              textStyle: {
                color: echart.textColor,
              },
            },
            axisPointer: {
              label: {
                formatter: params => {
                  return (
                    'Precipitation  ' + params.value + (params.seriesData.length ? 'value' + params.seriesData[0].data : '')
                  );
                },
              },
            },
            data: this.usageibService.getUsageLabel(),
          },
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors.success,
              },
            },
            axisLabel: {
              textStyle: {
                color: echart.textColor,
              },
            },
            axisPointer: {
              label: {
                formatter: params => {
                  return (
                    'Precipitation  ' + params.value + (params.seriesData.length ? 'value' + params.seriesData[0].data : '')
                  );
                },
              },
            },
            data: this.usageibService.getIBLabel(),
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: colors.info,
              },
            },
            splitLine: {
              lineStyle: {
                color: echart.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echart.textColor,
              },
            },
          },
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: colors.success,
              },
            },
            splitLine: {
              lineStyle: {
                color: echart.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echart.textColor,
              },
            },
          },
        ],
        series: [
          {
            name: 'InstallBase',
             xAxisIndex: 1,
            yAxisIndex: 1,
            type: 'line',
            smooth: true,
            data: this.usageibService.getIB(),
          },
          {
            name: 'Usage',
            type: 'line',
            smooth: true,
            data: this.usageibService.getUsage(),
          },
        ],
      };
    });
  }
 onChange(event){
  	this.option.series.data = this.usageibService.getIB();
  }
   ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
