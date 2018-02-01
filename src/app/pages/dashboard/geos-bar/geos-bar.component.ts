import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ReadjsonService } from '../../../@core/data/readjson.service';

@Component({
  selector: 'ngx-geos-bar',
  styleUrls: ['./geos-bar.component.scss'],
   template: `
   <nb-card>

   <div class="chart-header">

    <div class="dropdown ghost-dropdown" ngbDropdown>
        <button type="button" ngbDropdownToggle class="btn btn-outline-primary">
          {{ type }}
        </button>
        <ul class="dropdown-menu" ngbDropdownMenu>
          <li class="dropdown-item" *ngFor="let t of types" (click)="onSelect(t)">{{t}} </li>
        </ul>
      </div>
      <p>Usage Inventory And Usage Consumption</p>
         <div class="dropdown ghost-dropdown" ngbDropdown>
        <button type="button" ngbDropdownToggle class="btn btn-outline-primary">
          {{ time }}
        </button>
        <ul class="dropdown-menu" ngbDropdownMenu>
          <li class="dropdown-item" *ngFor="let t of times" (click)="onSelect2(t)">{{t}} </li>
        </ul>
      </div>
    </div>
    <div echarts [options]="option" class="echart"></div>
    </nb-card>
  `,
})
export class GeosBarComponent implements OnDestroy {
  option: any = {};
  themeSubscription: any;
  currentTheme: string;
  type = 'World';
  types = ['AP', 'EMEA', 'NA', 'LAS', 'World'];
  time = 'Week';
  times = ['Week', 'Month'];
  // dataAxis = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
  // data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
  // yMax = 500;
  // dataShadow = [1000, 400, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
  MonthAxis = [];
  MonthAP = [];
  MonthNA = [];
  MonthEMEA = [];
  MonthLAS = [];
  MonthAP_Usa = [];
  MonthNA_Usa = [];
  MonthEMEA_Usa = [];
  MonthLAS_Usa = [];
  Month_Geo = [];
  Month_WW = [];
  Month_Usage = [];
  Month_Total = [];

  Week_Geo = [];
  Week_WW = [];
  Week_Usage = [];
  Week_Total = [];
  WeekAxis = [];
  WeekAP = [];
  WeekNA = [];
  WeekEMEA = [];
  WeekLAS = [];
  WeekAP_Usa = [];
  WeekNA_Usa = [];
  WeekEMEA_Usa = [];
  WeekLAS_Usa = [];

  data = [];
  Usa = [];
  dataAxis = [];
  dataGeo = [];
  dataWW = [];
  dataUsage = [];
  dataTotal = [];
  constructor(private readjsonService: ReadjsonService, private theme: NbThemeService) {
     readjsonService.getJson('assets/jsonfiles/dashboard1.json').subscribe(val => {
        this.MonthAxis = val.month.date;
        this.MonthAP = val.month.AP_Geo;
        this.MonthNA = val.month.NA_Geo;
        this.MonthEMEA = val.month.EMEA_Geo;
        this.MonthLAS = val.month.LAS_Geo;
        this.MonthAP_Usa = val.month.AP_Usa;
        this.MonthNA_Usa = val.month.NA_Usa;
        this.MonthEMEA_Usa = val.month.EMEA_Usa;
        this.MonthLAS_Usa = val.month.LAS_Usa;
        this.Month_Geo = val.month.Geo;
        this.Month_WW = val.month.WW;
        this.Month_Usage = val.month.usage;
         for (let i = 0; i < this.Month_Geo.length; i++)
         {
           this.Month_Total.push(this.Month_Geo[i] + this.Month_WW[i]);
         }

        this.WeekAxis = val.week.date;
        this.WeekAP = val.week.AP_Geo;
        this.WeekNA = val.week.NA_Geo;
        this.WeekEMEA = val.week.EMEA_Geo;
        this.WeekLAS = val.week.LAS_Geo;
        this.WeekAP_Usa = val.week.AP_Usa;
        this.WeekNA_Usa = val.week.NA_Usa;
        this.WeekEMEA_Usa = val.week.EMEA_Usa;
        this.WeekLAS_Usa = val.week.LAS_Usa;
        this.Week_Geo = val.week.Geo;
        this.Week_WW = val.week.WW;
        this.Week_Usage = val.week.usage;
         for (let i = 0; i < this.Week_Geo.length; i++)
         {
           this.Week_Total.push(this.Week_Geo[i] + this.Week_WW[i]);
         }

     this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;
      this.setMethod('World', 'Week', colors, echarts);
      });
     });
   }
  ngOnInit(): void {
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const echarts: any = config.variables.echarts;
      const colors: any = config.variables;
      this.setMethod('World', 'Week', colors, echarts);
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
      this.setMethod(type, this.time, colors, echarts);
    })
  }
  private onSelect2(time: any): void {
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
        const echarts: any = config.variables.echarts;
        const colors: any = config.variables;
        this.time = time;
        this.setMethod(this.type, time, colors, echarts);
      })
  }
  private setMethod(type: any, time:any, colors: any, echarts: any): void{
    this.option = {};
    
    if (type == 'AP' && time == 'Week')
    {
      //this.dataAxis = this.WeekAxis;
      //this.data = this.WeekAP;
      //this.Usa = this.WeekAP_Usa;
      this.setOptions(colors, echarts,this.WeekAxis,[],this.WeekAP,this.WeekAP_Usa);
    }  
    else if (type == 'EMEA' && time == 'Week')
    {
      /*this.dataAxis = this.WeekAxis;
      this.data = this.WeekEMEA;
      this.Usa = this.WeekEMEA_Usa;
      this.setOptions(colors, echarts);*/
      this.setOptions(colors, echarts,this.WeekAxis,[],this.WeekEMEA,this.WeekEMEA_Usa);
    }
    else if (type == 'LAS' && time == 'Week')
    {
      /*this.dataAxis = this.WeekAxis;
      this.data = this.WeekLAS;
      this.Usa = this.WeekLAS_Usa;
      this.setOptions(colors, echarts);*/
      this.setOptions(colors, echarts,this.WeekAxis,[],this.WeekLAS,this.WeekLAS_Usa);
    }
    else if (type == 'NA' && time == 'Week')
    {
      /*this.dataAxis = this.WeekAxis;
      this.data = this.WeekNA;
      this.Usa = this.WeekNA_Usa;
      this.setOptions(colors, echarts);*/
      this.setOptions(colors, echarts,this.WeekAxis,[],this.WeekNA,this.WeekNA_Usa);
    }
    if (type == 'AP' && time == 'Month')
    {
      /*this.dataAxis = this.MonthAxis;
      this.data = this.MonthAP;
      this.Usa = this.MonthAP_Usa;
      this.setOptions(colors, echarts);*/
      this.setOptions(colors, echarts,this.MonthAxis,[],this.MonthAP,this.MonthAP_Usa);
    }  
    else if (type == 'EMEA' && time == 'Month')
    {
      /*this.dataAxis = this.MonthAxis;
      this.data = this.MonthEMEA;
      this.Usa = this.MonthEMEA_Usa;
      this.setOptions(colors, echarts);*/
      this.setOptions(colors, echarts,this.MonthAxis,[],this.MonthEMEA,this.MonthEMEA_Usa);
    }
    else if (type == 'LAS' && time == 'Month')
    {
      /*this.dataAxis = this.MonthAxis;
      this.data = this.MonthLAS;
      this.Usa = this.MonthLAS_Usa;
      this.setOptions(colors, echarts);*/
      this.setOptions(colors, echarts,this.MonthAxis,[],this.MonthLAS,this.MonthLAS_Usa);
    }
    else if (type == 'NA' && time == 'Month')
    {
      /*this.dataAxis = this.MonthAxis;
      this.data = this.MonthNA;
      this.Usa = this.MonthNA_Usa;
      this.setOptions(colors, echarts);*/
      this.setOptions(colors, echarts,this.MonthAxis,[],this.MonthNA, this.MonthNA_Usa);
    }
    else if(type == 'World' && time == 'Week')
    {
      /*this.dataAxis = this.WeekAxis;
      this.dataGeo = this.Week_Geo;
      this.Usa=this.Week_Usage;
      this.data = this.Week_Total;
      //this.dataUsage = this.Week_Usage;
      //this.dataTotal = this.Week_Total;
      this.setOptions2(colors, echarts);*/
      this.setOptions(colors, echarts,this.WeekAxis,this.Week_Total,this.Week_Geo,this.Week_Usage);
    }
    else if(type == 'World' && time == 'Month')
    {
      /*this.dataAxis = this.MonthAxis;
      this.dataGeo = this.Month_Geo;
      this.Usa=this.Month_Usage;
      this.data = this.Month_Total;*/
      //this.dataUsage = this.Month_Usage;
      //this.dataTotal = this.Month_Total;
      this.setOptions(colors, echarts,this.MonthAxis,this.Month_Total,this.Month_Geo,this.Month_Usage);
    }
  }
  private setOptions(colors: any, echarts: any,axis:any,inv_ww:any,inv_geo:any,usage:any): void {
           this.option={};
            this.option = {
                backgroundColor: echarts.bg,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                    },
                },
                
                legend: {
                    data: ['Geo_Total', 'WW_Hub'],
                    
                },
                 grid: {
                         left: '3%',
                         right: '4%',
                        bottom: '20%',
                        top: '5%',
                        containLabel: true,
                },
                xAxis: {
                  data: axis,
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
                {
                   type: 'value',
                   axisLine: {
                        lineStyle: {
                         color: echarts.axisLineColor,
                        },
                     },     
                       
                }],
                 dataZoom: [
                    {
                        /*start:10,
                        end:90,*/
                        backgroundColor: echarts.axisLineColor,
                    },
                    {
                        
                        type: 'inside',
                    }
                ],
                series: [
                    { // For shadow
                        type: 'bar',
                        yAxisIndex: 0,
                        /* itemStyle: {
                            normal: {color: 'rgba(0,0,0,0.05)'},
                        },*/
                        itemStyle: {
                        normal: {
                            barBorderRadius: 5,
                            color: '#83FCD8',//'#DCF7A1',
                            /*new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#14c8d4'},
                                    {offset: 1, color: '#43eec6'},
                                ],
                            ),*/
                        },
                    },
                        barGap: '-100%',
                        barCategoryGap: '40%',
                        data: inv_ww,
                        animation: false,
                    },
                    { // For shadow
                        type: 'line',
                        yAxisIndex: 1,
                        /* itemStyle: {
                            normal: {color: 'rgba(0,0,0,0.05)'},
                        },*/
                        itemStyle: {
                        normal: {
                            barBorderRadius: 5,
                            color: colors.warningLight,//colors.dangerLight,
                        },
                    },
                        barGap: '-100%',
                        barCategoryGap: '40%',
                        data: usage,
                        animation: false,
                    },
                    {
                        type: 'bar',
                        yAxisIndex: 0,
                        itemStyle: {
                            normal: {
                                color: colors.infoLight,//'#8192D6',
                                /*new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#83bff6'},
                                        {offset: 0.5, color: '#188df0'},
                                        {offset: 1, color: '#188df0'},
                                    ],
                                ),*/
                            },
                            emphasis: {
                                color: '#81C2D6',
                                /*new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#2378f7'},
                                        {offset: 0.7, color: '#2378f7'},
                                        {offset: 1, color: '#83bff6'},
                                    ],
                                ),*/
                            },
                        },
                        data: inv_geo,
                    },
                    
                ],
            };
      }
    


}
