import { AfterViewInit, Component, Input, OnInit, OnChanges, OnDestroy, ChangeDetectionStrategy, ElementRef} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { UsageIbService } from '../../../../@core/data/usage-ib.service';
import { ReadjsonService } from '../../../../@core/data/readjson.service';
import { ReadjsonComponent } from '../../readjson/readjson.component';
declare const echarts: any;

@Component({
  selector: 'ngx-multi-axis-chart',
  styleUrls: ['./multi-axis-chart.component.scss'],
  template: `
    
    <div echarts [options]="option" class="echart"></div>
  `,
})
export class MultiAxisChartComponent implements OnChanges, OnDestroy {
  option: any;
  themeSubscription: any;
  jsondata: any;
  xdata:any;
  initialized=false;
  usage=[{"2013-08-01":[15,16,18,20]},{"2013-09-01":[6,25,32,14]},
            {"2013-10-01":[15,21,25,32]},{"2013-11-01":[21,25,20,28]},
            {"2013-12-01":[15,22,29,20]},{"2014-01-01":[16,18,14,19]},
            {"2014-02-01":[16,12,9,5]},{"2014-03-01":[12,11,5,4]},
            {"2014-04-01":[25,12,6,7]}];
  @Input() selectPN: string;

  constructor(private readjsonService: ReadjsonService, private usageibService: UsageIbService, private theme: NbThemeService) {
   readjsonService.getJson('assets/jsonfiles/dashboard2.json').subscribe(val => {
     this.jsondata = val;
     this.xdata=val.IB.date;
     });
  }

  ngOnChanges() {
    if(!this.initialized){

      
      this.initialized=true;
    }else{
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
            type: '',
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
            data: this.jsondata.IB.date,
           //data:[
            //'2002/01/01','2003/01/01','2004/01/01','2005/01/01','2006/01/01',
            //'2007/01/01','2008/01/01','2009/01/01','2010/01/01','2011/01/01'
        //]
          },
        ],
        yAxis: [
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
            type: 'line',
            smooth: true,
            data: this.jsondata.IB_Trans.baseline,
            //data:[16,18,20,15,32,
            //14,19,25,26,27]
          },
          {
            name: 'Usage',
            type: 'line',
            smooth: true,
            //data: this.jsondata.Usage.usage,
            data: [
            ["2013-08-01",[15,16,18,20]],["2013-09-01",[6,25,32,14]],
            ["2013-10-01",[15,21,25,32]],["2013-11-01",[21,25,20,28]],
            ["2013-12-01",[15,22,29,20]],["2014-01-01",[16,18,14,19]],
            ["2014-02-01",[16,12,9,5]],["2014-03-01",[12,11,5,4]],
            ["2014-04-01",[25,12,6,7]]
            ]
          },
        ],
      };
    });
    }
    
  }
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
 }
