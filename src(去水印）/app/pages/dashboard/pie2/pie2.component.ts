import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

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
  constructor(private theme: NbThemeService) {
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config =>{
      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
        //title: {
        //text: 'Nightingale\'s Rose Diagram',
        //subtext: 'Mocking Data',
        //x: 'left',
        //textStyle: {
            //color: echarts.textColor,
         // },
        //},
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
       },
        legend: {
          display:false,
          //x: 'center',
          //y: 'bottom',
          //data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8'],
          //textStyle: {
           // color: echarts.textColor,
          //},
        },
        calculable: true,
        series: [
          {
            name: 'area',
            type: 'pie',
            radius: [30, 110],
            roseType: 'area',
            data: [
              { value: 10, name: 'EOL' },
              { value: 5, name: 'EOS' },
              { value: 15, name: 'LTBD' },
              { value: 25, name: 'NPI' },
              { value: 20, name: 'NPID' },
              { value: 35, name: 'REG' },
              
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
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
    }
  ngOnDestroy(): void{
    this.themeSubscription.unsubscribe();
  }
}