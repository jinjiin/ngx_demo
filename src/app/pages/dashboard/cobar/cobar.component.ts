import { Component, OnDestroy } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { ReadjsonService } from '../../../@core/data/readjson.service';

@Component({
  selector: 'ngx-cobar',
  styleUrls: ['./cobar.component.scss'],
  template:
   `
  <nb-card>
     <nb-card-header>Group By Commodity</nb-card-header>
      <nb-card-body>
         <div echarts [options]="options" class="echarts"></div>
      </nb-card-body>
    </nb-card>
  `,
})
export class CobarComponent implements OnDestroy {
  options: any;
  data: {};
  themeSubscription: any;
  dataLabels = [];
  dataNum = [];
  constructor(private readjsonService: ReadjsonService, private theme: NbThemeService) {
    readjsonService.getJson('assets/jsonfiles/dashboard1.json').subscribe(val => {
       for (let i = 0; i < 9; ++i) {
          this.dataLabels.push(val.Commodity.CommodityVal[i]);
          this.dataNum.push(val.Commodity.usage[i]);
        }

      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;
      this.options = {
        
    backgroundColor: echarts.bg,
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
          },
    },
    grid: {
          // left: '3%',
          // right: '4%',
          bottom: '5%',
          top: '40%',
          containLabel: true,
        },
     legend: {
        data: this.dataLabels,
        textStyle: {
            color: echarts.textColor,
          },
    },
    toolbox: {
        show : false,
    },
    // calculable : true,
    xAxis : [
        {
            type : 'category',
             data: ['Commodity'],
             axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
        },
    ],
    yAxis : [
        {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
        },
    ],
    series : [
        {
            name: this.dataLabels[0],
            type: 'bar',
            data: [this.dataNum[0]],
            color: [colors.primaryLight],
        },
      {
            name: this.dataLabels[1],
            type: 'bar',
            data: [this.dataNum[1]],
            color: [colors.success],
        },
      {
            name: this.dataLabels[2],
            type: 'bar',
            data: [this.dataNum[2]],
            color: [colors.info],
        },
      {
            name: this.dataLabels[3],
            type: 'bar',
            data: [this.dataNum[3]],
            color: ['#83FCD8'],
        },
      {
            name: this.dataLabels[4],
            type: 'bar',
            data: [this.dataNum[4]],
            color: [colors.warning],
        },
      {
            name: this.dataLabels[5],
            type: 'bar',
            data: [this.dataNum[5]],
            color: ['#81C2D6'],
        },
      {
            name: this.dataLabels[6],
            type: 'bar',
            data: [this.dataNum[6]],
            color: ['#8192D6'],
        },
      /*{
            name: this.dataLabels[7],
            type: 'bar',
            data: [this.dataNum[7]],
            color: ['#D9B3E6'],
        },
       {
            name: this.dataLabels[8],
            type: 'bar',
            data: [this.dataNum[8]],
            color: ['#DCF7A1'],
        }, */
      
    ],
};
 });
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

}
