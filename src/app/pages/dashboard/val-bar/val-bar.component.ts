import { Component, OnDestroy } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { ReadjsonService } from '../../../@core/data/readjson.service';


@Component({
  selector: 'ngx-val-bar',
  styleUrls: ['./val-bar.component.scss'],
  template:
   `
   <nb-card>
     <nb-card-header>Group By Commodity</nb-card-header>
      <nb-card-body>
      	<chart type="horizontalBar" [data]="data" [options]="options"></chart>
      </nb-card-body>
    </nb-card>
  `,
})
export class ValBarComponent implements OnDestroy {
  options: any;
  data: {};
  themeSubscription: any;
  dataLabels = [];
  dataNum = [];
  constructor(private readjsonService: ReadjsonService,private theme: NbThemeService) {
  	readjsonService.getJson('assets/jsonfiles/dashboard1.json').subscribe(val => {
       for (let i = 0; i < 9; ++i) {
        if(val.Commodity.CommodityVal[i]!='NA')
        {
          this.dataLabels.push(val.Commodity.CommodityVal[i]);
          this.dataNum.push(val.Commodity.usage[i]);
        }   
        }
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;
      this.data = {
        labels: this.dataLabels,
        datasets: [{
            label: 'Dataset 1',
            backgroundColor: colors.successLight,
            borderWidth: 1,
            data: this.dataNum,
          },
        ],
      };

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          rectangle: {
            borderWidth: 2,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
        legend: {
          display: false,
        },
      };
    });
  	});
    
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
  
}
