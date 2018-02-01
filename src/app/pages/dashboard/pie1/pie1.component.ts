import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-pie1',
  styleUrls: ['./pie1.component.scss'],
  template: `
  <nb-card>
      <nb-card-header>Group By Lifecycle</nb-card-header>
        <nb-card-body>
           <div echarts [options]="options" class="echart"></div>
        </nb-card-body>
    </nb-card>
  
  `,
})
export class Pie1Component implements AfterViewInit, OnDestroy {

  options: any = {};
  themeSubscription: any;
  constructor(private theme: NbThemeService) { }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['EOL', 'EOS', 'LTBD', 'NPI', 'NPID', 'REG'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: 'Countries',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: [
              { value: 10, name: 'EOL' },
              { value: 10, name: 'EOS' },
              { value: 30, name: 'LTBD' },
              { value: 10, name: 'NPI' },
              { value: 30, name: 'NPID' },
              { value: 10, name: 'REG'},
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

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

}
