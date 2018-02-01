import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';


@Component({
  selector: 'ngx-multi-axis',
  styleUrls: ['./multi-axis.component.scss'],
  templateUrl: './multi-axis.component.html',
})
export class MultiAxisComponent implements OnDestroy {


  currentTheme: string;
  themeSubscription: any;

  constructor(private themeService: NbThemeService) {


    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
