import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ReadjsonService } from'../../../@core/data/readjson.service';
@Component({
  selector: 'ngx-pie4',
  styleUrls: ['./pie4.component.scss'],
  template: `
  <nb-card>
     <nb-card-header>Group By Loc</nb-card-header>
      <nb-card-body>
        <chart type="doughnut" [data]="data" [options]="options"></chart>
     </nb-card-body>
  </nb-card>
  `,
})
export class Pie4Component implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;
  dataLabels = [];
  dataNum = [];
  constructor(private readjsonService: ReadjsonService,private theme: NbThemeService) {
      readjsonService.getJson('assets/jsonfiles/dashboard1.json').subscribe(val => {
        for (let i = 1; i< val.usage.Locname.length; ++i){
          this.dataLabels.push(val.usage.Locname[i]);
          this.dataNum.push(val.usage.usage[i]);
         }
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
          const colors: any = config.variables;
          const chartjs: any = config.variables.chartjs;
          this.data = {
              //labels: ['Download Sales', 'In-Store Sales', 'Mail Sales'],
              labels: this.dataLabels,
              datasets: [{
                //data: [300, 500, 100],
                data: this.dataNum,
                backgroundColor: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight, //'#F5F5DC','#000000','#FF7F50','00FFFF','#B8860B',
                '#006400','#BDB76B','#8B008B','#FF8C00','#8B0000',
                '#83D8B','#9400d3','#FF1493','#B22222','#228B22',
                '#FFD700','#808080','#ADFF2F','#CD5C5C'],
                //'#A9A9A9','#006400','#FFD700','00BFFF','#FFFAF0','#228B22','#FF69B4','#E6E6FA','#FF00FF'],
              }],
            };
          this.options = {
              maintainAspectRatio: false,
              responsive: true,
              scale: {
                pointLabels: {
                  fontSize: 14,
                  fontColor: chartjs.textColor,
                },
              },
              scales: {
                xAxes: [
                  {
                    display: false,
                  },
                ],
                yAxes: [
                  {
                    display: false,
                  },
                ],
              },
              legend: {
                //display:false,
                position: 'right',
                labels: {
                  fontColor: chartjs.textColor,
                },
              },
            };
        });

      });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
