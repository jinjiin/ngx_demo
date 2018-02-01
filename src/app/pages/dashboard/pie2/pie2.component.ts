import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ReadjsonService } from '../../../@core/data/readjson.service';

@Component({
  selector: 'ngx-pie2',
  styleUrls: ['./pie2.component.scss'],
  template: `
  <nb-card>
      <nb-card-header>Group By Lifecycle</nb-card-header>
        <nb-card-body>
           <div echarts [options]="options" class="echart"></div>
        </nb-card-body>
    </nb-card>
  `,
})
export class Pie2Component implements AfterViewInit, OnDestroy {

  options: any = {};
  themeSubscription: any;
  dataAll = [];
  constructor(private readjsonService: ReadjsonService, private theme: NbThemeService) {
  }

  ngAfterViewInit() {
    this.readjsonService.getJson('assets/jsonfiles/dashboard1.json').subscribe(val => {
       var Total = 0;
       for(let i = 0; i < val.Lifecycle.Lifecycle.length; ++i) {
          Total = Total + val.Lifecycle.usage[i];
       }
       for (let i = 0; i < val.Lifecycle.Lifecycle.length; ++i) {
        if(val.Lifecycle.Lifecycle[i]!='NA')
          if(Math.round(val.Lifecycle.usage[i]/Total*100)>0)
             this.dataAll.push({
              name: val.Lifecycle.Lifecycle[i] + ' '+String(Math.round(val.Lifecycle.usage[i]/Total*100))+'%',
              value: 2-0.25*i,
             });
       }
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.successLight, colors.dangerLight,  colors.primaryLight, '#DCF7A1'],
        tooltip: {
          trigger: 'item',
          formatter: '{b}',
       },
        legend: {
          show: false,
        },
        calculable: true,
        series: [
          {
            name: 'area',
            type: 'pie',
            radius: [30, 110],
            roseType: 'area',
            data: this.dataAll, /*[
              { value: 10, name: 'EOL' },
              { value: 5, name: 'EOS' },
              { value: 15, name: 'LTBD' },
              { value: 25, name: 'NPI' },
              { value: 20, name: 'NPID' },
              { value: 35, name: 'REG' },
            ],*/
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
               lineStyle: {
                color: echarts.axisLineColor,
              },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                color: echarts.axisLineColor,
              },
              },
            },
          },
        ],
      };
    });
       });
    }
  ngOnDestroy(): void{
    this.themeSubscription.unsubscribe();
  }
}