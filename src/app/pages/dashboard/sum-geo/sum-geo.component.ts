import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ReadjsonService } from '../../../@core/data/readjson.service';

@Component({
  selector: 'ngx-sum-geo',
  styleUrls: ['./sum-geo.component.scss'],
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
      <div class='tittle'>Inventory And Usage Consumption</div>
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
    <div class="row"><div class='tittle1'> Weeks Of Inventory(WOI)</div></div>
    <div echarts [options]="option1" class="echart"></div>
    </nb-card>
  `,
})
export class SumGeoComponent implements OnDestroy {
  option: any = {};
  themeSubscription: any;
  currentTheme: string;
  type = 'WorldWide';
  types = ['AP', 'EMEA', 'NA', 'LAS', 'WorldWide'];
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
  /*variables of option2*/
  option1: any = {};
  date = [];
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
  WW = [];
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
        this.WW = val.WOI.WW;
     this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;
      this.setMethod('WorldWide', 'Week', colors, echarts);
      });
     });
   }
  ngOnInit(): void {
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const echarts: any = config.variables.echarts;
      const colors: any = config.variables;
      this.setMethod('WorldWide', 'Week', colors, echarts);
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
  private setMethod(type: any, time:any, colors: any, echarts: any): void {
    if(time == 'Week'){
    	if(type == 'AP') 
    	{
    		this.setOptions(type, colors, echarts,this.WeekAxis,[],this.WeekAP,this.WeekAP_Usa, [0]);
    		this.setOptions2(type, colors, echarts, this.date, this.AP_ANZ_INHOUSE, this.AP_JP_INHOUSE, this.AP_India, this.AP_Asean_MY_KR, this.AP_HTK_KR_HK_TW, this.AP_Asean_TTL);
    	}
    	else if(type == 'EMEA')  {
    		this.setOptions(type, colors, echarts,this.WeekAxis,[],this.WeekEMEA,this.WeekEMEA_Usa, [0]);
    		this.setOptions2(type,colors, echarts, this.date, this.EMEA_L3_Consumer, this.EMEA_L3_Commercial, [0], [0], [0], [0]);
    	}
    	else if(type == 'LAS')  {
    		this.setOptions(type, colors, echarts,this.WeekAxis,[],this.WeekLAS,this.WeekLAS_Usa, [0]);
    		this.setOptions2(type, colors, echarts, this.date, this.LAS_INHOUSE_Consumer, this.LAS_INHOUSE_Commercial,[0], [0], [0], [0]);
    	}
    	else if(type == 'NA') {
    		this.setOptions(type, colors, echarts,this.WeekAxis,[],this.WeekNA,this.WeekNA_Usa, [0]);
    		this.setOptions2(type, colors, echarts, this.date, this.NAG_INHOUSE_Consumer, this.NAG_INHOUSE_Commercial, [0], [0], [0], [0]);
    	}
    	else if(type == 'WorldWide') {
    		this.setOptions(type, colors, echarts,this.WeekAxis,this.Week_Total,this.Week_Geo,this.Week_Usage,this.Week_WW);
    		this.option1 = {};
    		//this.setOptions2(colors, echarts, this.date, [], [], [], [], [], []);
    		this.setOptions2(type, colors, echarts, this.date, this.WW, [0], [0], [0], [0], [0]);
    	}
    }
    else if(time == 'Month')
    {
    	if(type == 'AP')  {
    		this.setOptions(type, colors, echarts,this.MonthAxis,[],this.MonthAP,this.MonthAP_Usa, [0]);
    		this.setOptions2(type, colors, echarts, this.date, this.AP_ANZ_INHOUSE, this.AP_JP_INHOUSE, this.AP_India, this.AP_Asean_MY_KR, this.AP_HTK_KR_HK_TW, this.AP_Asean_TTL);
    	}
    	else if(type == 'EMEA') {
    		this.setOptions(type, colors, echarts,this.MonthAxis,[],this.MonthEMEA,this.MonthEMEA_Usa, [0]);
    		this.setOptions2(type, colors, echarts, this.date, this.EMEA_L3_Consumer, this.EMEA_L3_Commercial, [0], [0], [0], [0]);
    	} 
    	else if(type == 'LAS') {
    		this.setOptions(type, colors, echarts,this.MonthAxis,[],this.MonthLAS,this.MonthLAS_Usa, [0]);
    		this.setOptions2(type, colors, echarts, this.date, this.LAS_INHOUSE_Consumer, this.LAS_INHOUSE_Commercial,[0], [0], [0], [0]);
    	} 
    	else if(type == 'NA') {
    		this.setOptions(type, colors, echarts,this.MonthAxis,[],this.MonthNA, this.MonthNA_Usa, [0]);
    		this.setOptions2(type, colors, echarts, this.date, this.NAG_INHOUSE_Consumer, this.NAG_INHOUSE_Commercial, [], [], [], []);
    	}
    	else if(type == 'WorldWide') {
    		this.setOptions(type, colors, echarts,this.MonthAxis,this.Month_Total,this.Month_Geo,this.Month_Usage,this.Week_WW);
    		this.option1 = {};
    		this.setOptions2(type, colors, echarts, this.date, this.WW, [0], [0], [0], [0], [0]);
    	} 
    }
  }
  private setOptions(type: any, colors: any, echarts: any, axis: any, inv_all: any, inv_geo: any, usage: any, inv_ww: any): void {
           this.option={};
           var legends=[];
           if(type == 'WorldWide') legends=['','Total Inv','Usage','Geo Inv'];
           else legends=['Usage','Geo Inv'];
            this.option = {

                backgroundColor: echarts.bg,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                    },
                },
                
                legend: {
                	show: true,
                    data: legends,
                    textStyle:{    //图例文字的样式
			        color:'#FFFFFF',
			    	},
                },
                 grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '20%',
                        top: '15%',
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
                	{
                    	type: 'bar',
                    	name: 'Worldwide Inv',
                    	yAxisIndex: 0,
                    	itemStyle: {
                            normal: {
                                color: colors.primary,
                            },
                        },
                    	data: inv_ww,
                    },
                    { // For shadow
                        type: 'bar',
                        name: 'Total Inv',
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
                        data: inv_all,
                        animation: false,
                    },
                    { // For shadow
                    	name: 'Usage',
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
                        name: 'Geo Inv',
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
  private setOptions2(type: any, colors: any,echarts: any, axis: any, data1: any, data2: any, data3: any, data4: any, data5: any, data6: any): void {
  	    var legends=[];
  	    if(type == 'AP') legends = ['ANZ_INHOUSE', 'JP_INHOUSE', 'India', 'Asean_MY_KR', 'HTK_KR_HK_TW', 'Asean_TTL'];
  	    else if(type == 'LAS') legends = ['INHOUSE_Consumer', 'INHOUSE_Commercial','','',''];
  	    else if(type == 'NA') legends = ['INHOUSE_Consumer', 'INHOUSE_Commercial','','',''];
  	    else if(type == 'EMEA') legends = ['L3_Consumer', 'L3_Commercial','','',''];
  	    else if(type == 'WorldWide') legends = ['','','','',''];
  	    this.option1 = {
  	    /*title:{
            	show: true,
            	text:'Weeks Of Inventory(WOI)',
            	padding: [5,10,5,10],
            	textStyle:{
            		color: '#FFFFFF',
            		fontSize: 15,
            		fontWeight: 'normal',
            		align:'center',
            		verticalAlign:'middle',
            	}
         },*/
        backgroundColor: echarts.bg,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
        },
        legend: {
        data:legends,
        
         textStyle:{    //图例文字的样式
			        color:'#FFFFFF',
			    },
       },
       grid: {
               left: '3%',
               right: '4%',
              bottom: '5%',
              top: '10%',
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
        ],
        series: [
            { 
                type: 'line',
                name: legends[0],
                
                data: data1,
                yAxisIndex: 0,
                itemStyle: {
                normal: {
                    barBorderRadius: 5,
                    color: colors.success//colors.dangerLight,
                },
              },
            },
            { 
                type: 'line',
                name: legends[1],
                
                data: data2,
                yAxisIndex: 0,
                itemStyle: {
                normal: {
                    barBorderRadius: 5,
                    color: colors.info//colors.dangerLight,
                },
            },
            },
            { // For shadow
                type: 'line',
                name: legends[2],
                
                data: data3,
                yAxisIndex: 0,
                itemStyle: {
                normal: {
                    barBorderRadius: 5,
                    color: colors.warningLight//colors.dangerLight,
                },
            },
            },
            { // For shadow
                type: 'line',
                name: legends[3],
                
                data: data4,
                yAxisIndex: 0,
               itemStyle: {
                normal: {
                    barBorderRadius: 5,
                    color: '#83FCD8'//colors.dangerLight,
                },
            },
            },
            { // For shadow
                type: 'line',
                name: legends[4],
                
                data: data5,
                yAxisIndex: 0,
              itemStyle: {
                normal: {
                    barBorderRadius: 5,
                    color:'#81C2D6'//colors.dangerLight,
                },
            },
            },
            { // For shadow
                type: 'line',
                name: legends[5],
                
                data: data6,
                yAxisIndex: 0,
                itemStyle: {
                normal: {
                    barBorderRadius: 5,
                    color: '#8192D6'//colors.dangerLight,
                },
            },
            },
        ],
    };
  }


}
