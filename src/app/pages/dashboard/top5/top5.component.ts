import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ReadjsonService } from '../../../@core/data/readjson.service';

@Component({
  selector: 'ngx-top5',
  styleUrls: ['./top5.component.scss'],
  template: `
    <div class="top">
        <chart type="horizontalBar" [data]="data" [options]="options" ></chart>
    </div>
  `,
})
export class Top5Component implements OnDestroy {
  options: any;
  data: {};
  themeSubscription: any;
  dataLabels = [];
  dataNum = [];
  constructor(private readjsonService: ReadjsonService, private theme: NbThemeService) {
    readjsonService.getJson('assets/jsonfiles/dashboard1.json').subscribe(val => {
       for (let i = 0; i < 5; ++i) {
          this.dataLabels.push(val.CC.CC[i]);
          this.dataNum.push(val.CC.usage[i]);
    }
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;
      this.data = {
        labels: this.dataLabels,
        datasets: [{
            label: 'Dataset 1',
            backgroundColor: colors.success,
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
                 // callback: function(value, index, values) {
                   //     return '$' + value;
                    // }

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

