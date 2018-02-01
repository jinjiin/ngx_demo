import { Component} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ReadjsonService } from '../../../@core/data/readjson.service';

@Component({
  selector: 'ngx-pie3',
  template: `
  <nb-card>
     <nb-card-header>Group By Part Family</nb-card-header>
      <nb-card-body>
      	<ngx-charts-pie-grid
      	[scheme]="colorScheme"
      	[results]="single"
      	(select)="onSelect($event)">
       </ngx-charts-pie-grid>
      </nb-card-body>
    </nb-card>
  `,
  styleUrls: ['./pie3.component.scss'],
})
export class Pie3Component {
	single = [];
  view = [550, 260];
  // <!--[view]="[400, 260]"-->
	showXAxis = false;
	showYAxis = false;
	gradient = false;
	showLegend = false;
	shoeXAxisLabel = false;
	shoeYAxisLabel = false;
	xAxisLabel = 'Country';
	yAxisLabel = 'Population';
	colorScheme: any;
	themeSubscription: any;
	autoScale = false;

	constructor(private readjsonService: ReadjsonService, private theme: NbThemeService) {

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.readjsonService.getJson('assets/jsonfiles/dashboard1.json').subscribe(val => {
       this.single = [];
       for (let i = 0; i < val.family.family.length; ++i) {
         this.single.push({
          name: val.family.family[i],
          value: val.family.usage[i],
         });
      }
     });
      const colors: any = config.variables;
      this.colorScheme = {
        domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
      };
    });
  }
  onSelect(event) {
    console.log(event);
  }
}
