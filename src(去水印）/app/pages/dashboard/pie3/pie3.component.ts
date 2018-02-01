import { Component} from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-pie3',
  template:`
  <nb-card>
     <nb-card-header>Group By Part Family</nb-card-header>
      <nb-card-body>
      	<ngx-charts-pie-grid
  		[view]="view"
      	[scheme]="colorScheme"
      	[results]="single"
      	(select)="onSelect($event)">
       </ngx-charts-pie-grid>
      </nb-card-body>
    </nb-card>
  	
  `,
})
export class Pie3Component{
	single = [
	{
		name: "PC",
    	value: 8940000,
	},
	{
		name: "DT",
    	value: 5000000,
	},
	{
		name: "NB",
		value: 7200000,
	},
	]
	view = [500,255];
	showXAxis = true;
	showYAxis = true;
	gradient = true;
	showLegend = true;
	shoeXAxisLabel = true;
	shoeYAxisLabel = true;
	xAxisLabel = 'Country';
	yAxisLabel = 'Population';
	colorScheme: any;
	themeSubscription: any;
	autoScale = true;
	constructor(private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
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
