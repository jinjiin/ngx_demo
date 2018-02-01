import {Component, Input, OnInit, OnChanges, OnDestroy, ChangeDetectionStrategy, ElementRef, SimpleChanges} from '@angular/core';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { NbThemeService } from '@nebular/theme';
import { ForecastService } from '../../../@core/data/forecast.service';
import { ReadjsonService } from '../../../@core/data/readjson.service';
import { AngularCompilerOptions } from '@angular/compiler-cli';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-short-term',
  
  styleUrls: ['./short-term.component.scss'],
  templateUrl: './short-term.component.html',
})
export class ShortTermComponent implements OnChanges, OnDestroy {

  options: any;
  themeSubscription: any;
  jsondata:any;
  initialized=false;
  methods=[
              { id: 1, name: 'IB_M' },
              { id: 2, name: 'Com_M' },
              { id: 3, name: 'MA_W' },
              { id: 4, name: 'MA_4' },
              { id: 5, name: 'MA_8' },
              { id: 6, name: 'MA_16' }];
  bestM:any;
 @Input() selectPN: string;
  constructor(private http: HttpClient, private dataProvider: ForecastService, private theme: NbThemeService, private readjsonService: ReadjsonService) {
       
  }

   ngOnChanges(changes:SimpleChanges) {
    if(!this.initialized){
      
        this.bestM="IB_M";
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.setOptions(this.dataProvider.getData(),colors,this.bestM);
  });
            
    this.initialized=true;

   }else{
    this.jsondata=[];
    //this.setJsonData(changes['selectPN'].currentValue);
    this.setJsonData(this.selectPN);
    
    //this.http.get('assets/jsonfiles/'+this.selectPN+'.json').subscribe(val => {
     // const subjsondata = val;
      //this.jsondata=subjsondata;});
    if(typeof this.jsondata === "undefined"){
      this.jsondata=[];
    }
   
   //this.jsondata=[];
    this.bestM=this.readjsonService.getDataFilterBy(this.jsondata,'BestM');
    //const colors={"success":"#00d977",
    //"info":"#0088ff","primary":"#7659ff","warning":"#ffa100"};
    //this.setOptions(this.jsondata,colors,this.bestM);
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.setOptions(this.jsondata,colors,this.bestM);
    });
   }  
   

  }

 private onCertain():void{
  this.bestM=this.readjsonService.getDataFilterBy(this.jsondata,'BestM');
    //const colors={"success":"#00d977",
    //"info":"#0088ff","primary":"#7659ff","warning":"#ffa100"};
    //this.setOptions(this.jsondata,colors,this.bestM);
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.setOptions(this.jsondata,colors,this.bestM);
      });

 }


  //onChange(event){
  //  //this.jsondata=this.dataProvider.getData();
  //  this.setJsonData(this.selectPN);
  //  this.bestM=this.readjsonService.getDataFilterBy(this.jsondata,'BestM');
  //   this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
  //    const colors: any = config.variables;
  //    this.setOptions(this.jsondata,colors,this.bestM);
  //  });
 // }


   private  onSelect(method:any): void {
    //this.setJsonData(this.selectPN);
        this.bestM=this.readjsonService.getDataFilterBy(this.jsondata,'BestM');

        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.setOptions(this.jsondata,colors,method.name);
    });
  }
 
 private setJsonData(pn:any):void{
  
   this.readjsonService.getJson('assets/jsonfiles/'+pn+'.json').subscribe(val => this.jsondata = val);
    //this.http.get('assets/jsonfiles/'+pn+'.json').subscribe(val => {this.jsondata = val});
    //this.http.get('assets/jsonfiles/'+pn+'.json').subscribe(
      //function(val){this.jsondata=val},
      //function(error){this.jsondata=[]});

 }
 private setOptions(data: any,colors: any,bestmethod: any): void{
    this.options = {'type': 'serial',
                      'theme': 'light',
                      'dataDateFormat': 'YYYY-MM-DD',
                      'precision': 2,
                      'dataProvider': data,
                      'valueAxes': [{
                                     'id': 'v1',
                                     'title': 'Short-Term-Prediction',
                                     'position': 'left',
                                     'autoGridCount': false,
                                     'color': '#AAAAAA',
                                     'labelFunction': function(value) {
                                              return Math.round(value) ;
                                     },
                                  }],
                        'graphs': [{
                        'id': 'g1',
                        'valueAxis': 'v1',
                        'bullet': 'round',
                        'bulletBorderAlpha': 1,
                        'bulletColor': '#FFFFFF',
                        'bulletSize': 5,
                        'hideBulletsCount': 50,
                        'lineThickness': 2,
                        'lineColor': colors.danger,
                        'type': 'smoothedLine',
                        'title': 'Usage',
                        'useLineColorForBulletBorder': true,
                        'valueField': 'usage',
                        'balloonText': '[[title]]<br /><b style="font-size: 130%">[[value]]</b>',
                        }, {
                        'id': 'g2',
                        'valueAxis': 'v1',
                        'bullet': 'round',
                        'bulletBorderAlpha': 1,
                        'bulletColor': '#FFFFFF',
                        'bulletSize': 5,
                        'hideBulletsCount': 50,
                        'lineThickness': 2,
                        'lineColor': colors.defaultText,
                        'type': 'smoothedLine',
                        'dashLength': 5,
                        'title': 'IB',
                        'useLineColorForBulletBorder': true,
                        'valueField': 'IB_Trans',
                        'balloonText': '[[title]]<br /><b style="font-size: 130%">[[value]]</b>',
                        },{
                        'id': 'g3',
                        'valueAxis': 'v1',
                        'bullet': 'round',
                        'bulletBorderAlpha': 1,
                        'bulletColor': '#FFFFFF',
                        'bulletSize': 5,
                        'hideBulletsCount': 50,
                        'lineThickness': 2,
                        'lineColor': colors.info,
                        'type': 'smoothedLine',
                        'dashLength': 5,
                        'title': 'IB_Shift',
                        'useLineColorForBulletBorder': true,
                        'valueField': 'IB_Trans_Shift',
                        'balloonText': '[[title]]<br /><b style="font-size: 130%">[[value]]</b>',
                        },{
                        "id": "g4",
                        "title": bestmethod,
                        "valueField": bestmethod,
                        "lineAlpha": 0.5,
                        "lineColor": colors.warning,
                        "bullet": "round",
                        "dashLength": 2,
                        "bulletBorderAlpha": 1,
                        "bulletAlpha": 1,
                        "bulletSize": 2,
                        "stackable": false,
                        "bulletColor": "#FFFFFF",
                        "bulletBorderColor":colors.warning,
                        "bulletBorderThickness": 3,
                        "balloonText": '[[title]]<br /><b style="font-size: 130%">[[value]]</b>',
                        }],
                         'chartScrollbar': {
                         'graph': 'g2',
                         'oppositeAxis': false,
                         'offset': 30,
                         'scrollbarHeight': 50,
                         'backgroundAlpha': 0,
                         'selectedBackgroundAlpha': 0.1,
                         'selectedBackgroundColor': '#888888',
                         'graphFillAlpha': 0,
                         'graphLineAlpha': 0.5,
                         'selectedGraphFillAlpha': 0,
                         'selectedGraphLineAlpha': 1,
                         'autoGridCount': true,
                         'color': '#AAAAAA',
                         },
                         'chartCursor': {
                         'pan': true,
                         'valueLineEnabled': true,
                         'valueLineBalloonEnabled': true,
                         'cursorAlpha': 0,
                         'valueLineAlpha': 0.2,
                         },
                         'categoryField': 'date',
                         'categoryAxis': {
                         'parseDates': true,
                         'dashLength': 1,
                         'minorGridEnabled': true,
                         },
                         'legend': {
                         'useGraphSettings': true,
                         'position': 'top',
                         'color': '#AAAAAA',
                         'font-size': '200%',
                         },
                         'balloon': {
                         'borderThickness': 1,
                         'shadowAlpha': 0,
                         },
                         'export': {
                         'enabled': true,
                         },
                      };


  }
   ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }


}
