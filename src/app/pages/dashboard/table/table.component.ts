import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ReadjsonService } from '../../../@core/data/readjson.service';

@Component({
  selector: 'ngx-table',
  styleUrls: ['./table.component.scss'],
  templateUrl: './table.component.html',
})
export class TableComponent implements OnDestroy {

  datas = [];
  // dataTop5 = [];
  dataAll = [];
  currentTheme: string;
  themeSubscription: any;

  constructor(private readjsonService: ReadjsonService, private themeService: NbThemeService) {
    readjsonService.getJson('assets/jsonfiles/dashboard1.json').subscribe(val => {

    //for (let i = 0; i <= 4; ++i) {
    //   this.dataTop5.push({
    //    CC: val.CC.CC[i],
    //    Usage: val.CC.usage[i],
    //  });
   // }

    for (let i = 0; i < val.CC.CC.length; ++i){
      this.dataAll.push({
        CC: val.CC.CC[i],
        Usage: val.CC.usage[i],
      });
    }

    //this.datas.push({
     // title: 'Top5',
     // data: this.dataTop5,
    //});
    this.datas.push({
      title: 'All CC',
      active: true,
      data: this.dataAll,
    });
});
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

}
