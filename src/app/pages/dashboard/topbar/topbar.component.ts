import { Component, OnDestroy } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { ReadjsonService } from '../../../@core/data/readjson.service';

@Component({
  selector: 'ngx-topbar',
  styleUrls: ['./topbar.component.scss'],
   template:
   `
   <nb-card>
     <nb-card-header>Group By ProductName</nb-card-header>
      <nb-card-body>
      	<chart type="horizontalBar" [data]="data" [options]="options"></chart>
      </nb-card-body>
    </nb-card>
  `,
})

export class TopbarComponent implements OnDestroy {
  options: any;
  data: {};
  themeSubscription: any;
  dataLabels = [];
  dataNum = [];
  constructor(private readjsonService: ReadjsonService,private theme: NbThemeService) {
  	readjsonService.getJson('assets/jsonfiles/dashboard1.json').subscribe(val => {
       //this.dataLabels = val.ProductName.ProductName;
       //this.dataNum = val.ProductName.usage;
       for (let i = 0; i < val.ProductSeries.ProductSeries.length; ++i){
        if(val.ProductSeries.ProductSeries[i]!=''){
          this.dataLabels.push(val.ProductSeries.ProductSeries[i]);
          this.dataNum.push(val.ProductSeries.usage[i]);
        }
    }
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;
      this.data = {
        labels: this.dataLabels,
        datasets: [{
            label: 'Dataset 1',
            backgroundColor: colors.infoLight,
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
