import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ReadjsonService } from '../../../@core/data/readjson.service';


@Component({
  selector: 'ngx-gradient-bar',
  styleUrls: ['./gradient-bar.component.scss'],
  template: `
  <nb-card>
   <div class="chart-header">
    <div class="dropdown ghost-dropdown" ngbDropdown>
        <button type="button" ngbDropdownToggle class="btn btn-outline-primary">
          {{ type.title }}
        </button>
        <ul class="dropdown-menu" ngbDropdownMenu>
          <li class="dropdown-item" *ngFor="let t of types" (click)="onSelect(t)">{{t.title}} </li>
        </ul>
      </div>
      <p>Weeks Of Inventory(WOI)</p>
      <div class="dropdown ghost-dropdown" ngbDropdown>
        <button type="button" ngbDropdownToggle class="btn btn-outline-primary">
                <!--[ngClass]="{ 'btn-outline-success': currentTheme == 'default', 'btn-primary': currentTheme != 'default'}">-->
          {{ sub }}
        </button>
        <ul class="dropdown-menu" ngbDropdownMenu>
          <li class="dropdown-item" *ngFor="let lt of geo.subtitle" (click)="onSelect2(lt)">{{lt}} </li>
        </ul>
      </div>
     
    </div>
    <div echarts [options]="option" class="echart"></div>
    </nb-card>
  `,
})
export class GradientBarComponent implements OnDestroy, OnInit {

  option: any = {};
  themeSubscription: any;
  type = { title:'AP', subtitle:['ANZ_INHOUSE', 'JP_INHOUSE', 'India', 'Asean_MY_KR', 'HTK_KR_HK_TW', 'Asean_TTL']};
  types = [{ title:'AP', subtitle:['ANZ_INHOUSE', 'JP_INHOUSE', 'India', 'Asean_MY_KR', 'HTK_KR_HK_TW', 'Asean_TTL']},
            { title:'NA', subtitle:['INHOUSE_Consumer', 'INHOUSE_Commercial']},
            { title:'EMEA', subtitle:['L3_Consumer', 'L3_Commercial']},
            { title:'LAS', subtitle:['INHOUSE_Consumer', 'INHOUSE_Commercial']}];
  sub = 'ANZ_INHOUSE';
  geo = { title:'AP', subtitle:['ANZ_INHOUSE', 'JP_INHOUSE', 'India', 'Asean_MY_KR', 'HTK_KR_HK_TW', 'Asean_TTL']};
  date = [];
  data = [];
  AP_ANZ_INHOUSE = [];
  AP_JP_INHOUSE = [];
  AP_India = [];
  AP_Asean_MY_KR = [];
  AP_HTK_KR_HK_TW = [];
  AP_Asean_TTL = [];
  NAG_INHOUSE_Consumer = [];
  NAG_INHOUSE_Commercial = [];
  EMEA_L3_Consumer = [];
  EMEA_L3_Commercial = [];
  LAS_INHOUSE_Consumer = [];
  LAS_INHOUSE_Commercial = [];
  constructor(private readjsonService: ReadjsonService, private theme: NbThemeService) {
     readjsonService.getJson('assets/jsonfiles/dashboard1.json').subscribe(val => {
        this.date = val.WOI.date;
        this.AP_ANZ_INHOUSE = val.WOI.AP_ANZ_INHOUSE;
        this.AP_JP_INHOUSE = val.WOI.AP_JP_INHOUSE;
        this.AP_India = val.WOI.AP_India;
        this.AP_Asean_MY_KR = val.WOI.AP_Asean_MY_KR;
        this.AP_HTK_KR_HK_TW = val.WOI.AP_HTK_KR_HK_TW;
        this.AP_Asean_TTL = val.WOI.AP_ASEAN_TTL;
        this.NAG_INHOUSE_Commercial = val.WOI.NAG_INHOUSE_Commercial;
        this.NAG_INHOUSE_Consumer = val.WOI.NAG_INHOUSE_Consumer;
        this.EMEA_L3_Commercial = val.WOI.EMEA_L3_Commercial;
        this.EMEA_L3_Consumer = val.WOI.EMEA_L3_Consumer;
        this.LAS_INHOUSE_Consumer = val.WOI.LAS_INHOUSE_Consumer;
        this.LAS_INHOUSE_Commercial = val.WOI.LAS_INHOUSE_Commercial;

     this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;
      this.setOptions('AP', 'ANZ_INHOUSE', colors, echarts);
        });
     });
   }


    ngOnInit(): void {
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const echarts: any = config.variables.echarts;
      const colors: any = config.variables;
      this.setOptions('AP', 'ANZ_INHOUSE', colors, echarts);
    })
    }
    ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
    private onSelect(type: any): void {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const echarts: any = config.variables.echarts;
      const colors: any = config.variables;
      this.type = type;
      this.geo = type;
      this.sub = this.geo.subtitle[0];
      this.setOptions(this.type.title, this.sub, colors, echarts);
    })
  }
  private onSelect2(lt: any): void {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const echarts: any = config.variables.echarts;
      const colors: any = config.variables;
      this.sub = lt;
      this.setOptions(this.type.title, this.sub, colors, echarts);
    })
  }
  private setOptions(title: any, subtitle: any, colors: any, echarts: any): void {
    if(title == 'AP')
    {
      if(subtitle == 'ANZ_INHOUSE') this.data = this.AP_ANZ_INHOUSE;
      else if(subtitle == 'Asean_TTL') this.data = this.AP_Asean_TTL;
      else if(subtitle == 'India') this.data = this.AP_India;
      else if(subtitle == 'JP_INHOUSE') this.data = this.AP_JP_INHOUSE;
      else if(subtitle == 'Asean_MY_KR') this.data = this.AP_Asean_MY_KR;
      else this.data = this.AP_HTK_KR_HK_TW;
    } 
    else if(title == 'NA')
    {
      if(subtitle == 'INHOUSE_Consumer') this.data = this.NAG_INHOUSE_Consumer;
      else this.data = this.NAG_INHOUSE_Commercial;
    }
    else if(title == 'EMEA')
    {
      if(subtitle == 'L3_Consumer') this.data = this.EMEA_L3_Consumer;
      else this.data = this.EMEA_L3_Commercial;
    }
    else{
      if(subtitle == 'INHOUSE_Commercial') this.data = this.LAS_INHOUSE_Commercial;
      else this.data = this.data = this.LAS_INHOUSE_Consumer;
    }

        this.option = {
        backgroundColor: echarts.bg,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
        },
       grid: {
               left: '3%',
               right: '4%',
              bottom: '5%',
              top: '5%',
              containLabel: true,
            },
        xAxis: {
          data: this.date,
            axisLine: {
                lineStyle: {
                 color: echarts.axisLineColor,
                },
             },
            axisTick: {
                show: false,
            },
            z: 10,
        },
        yAxis: [ {
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
        }, 
        ],
        series: [
            { // For shadow
                type: 'line',
                itemStyle: {
                normal: {
                    barBorderRadius: 5,
                    color: colors.warningLight//colors.dangerLight,
                },
            },
                barGap: '-100%',
                barCategoryGap: '40%',
                data: this.data,
                animation: false,
            },
        ],
    };
  }
}
