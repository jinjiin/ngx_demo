import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';
import { ChartModule } from 'angular2-chartjs';
import { ThemeModule } from '../../@theme/theme.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { JsonpModule } from '@angular/http';

import { DashboardComponent } from './dashboard.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { ContactsComponent } from './contacts/contacts.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomSelectorComponent } from './rooms/room-selector/room-selector.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { TemperatureDraggerComponent } from './temperature/temperature-dragger/temperature-dragger.component';
import { TeamComponent } from './team/team.component';
import { KittenComponent } from './kitten/kitten.component';
import { SecurityCamerasComponent } from './security-cameras/security-cameras.component';
import { ElectricityComponent } from './electricity/electricity.component';
import { ElectricityChartComponent } from './electricity/electricity-chart/electricity-chart.component';
import { WeatherComponent } from './weather/weather.component';
import { SolarComponent } from './solar/solar.component';
import { PlayerComponent } from './rooms/player/player.component';
import { TrafficComponent } from './traffic/traffic.component';
import { TrafficChartComponent } from './traffic/traffic-chart.component';
import { RadarComponent } from './radar/radar.component';
import { MultiAxisComponent } from './multi-axis/multi-axis.component';
import { MultiAxisChartComponent } from './multi-axis/multi-axis-chart/multi-axis-chart.component';
import { CombinedChartComponent } from './combined-chart/combined-chart.component';
import { DoubleBarComponent } from './double-bar/double-bar.component';
import { ReadcsvComponent } from './readcsv/readcsv.component';
import { ReadjsonComponent } from './readjson/readjson.component';
import { InputPnComponent } from './input-pn/input-pn.component';
import { UsageIbChartComponent } from './usage-ib-chart/usage-ib-chart.component';
import { MapComponent } from './map/map.component';
import { Pie1Component } from './pie1/pie1.component';
import { BarComponent } from './bar/bar.component';
import { TableComponent } from './table/table.component';
import { Pie2Component } from './pie2/pie2.component';
import { Pie3Component } from './pie3/pie3.component';
import { Pie4Component } from './pie4/pie4.component';
import { Top5Component } from './top5/top5.component';
import { TopbarComponent } from './topbar/topbar.component';
import { CobarComponent } from './cobar/cobar.component';
import { StatusCard2Component } from './status-card2/status-card2.component';
import { GradientBarComponent } from './gradient-bar/gradient-bar.component';
import { GeosBarComponent } from './geos-bar/geos-bar.component';
import { SumGeoComponent } from './sum-geo/sum-geo.component';
import { ValBarComponent } from './val-bar/val-bar.component';

@NgModule({
  imports: [
    ThemeModule,
    AngularEchartsModule,
    ChartModule,
    NgxChartsModule,
    AmChartsModule,
    JsonpModule,
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,
    TemperatureDraggerComponent,
    ContactsComponent,
    RoomSelectorComponent,
    TemperatureComponent,
    RoomsComponent,
    TeamComponent,
    KittenComponent,
    SecurityCamerasComponent,
    ElectricityComponent,
    ElectricityChartComponent,
    WeatherComponent,
    PlayerComponent,
    SolarComponent,
    TrafficComponent,
    TrafficChartComponent,
    RadarComponent,
    MultiAxisComponent,
    MultiAxisChartComponent,
    CombinedChartComponent,
    DoubleBarComponent,
    ReadcsvComponent,
    ReadjsonComponent,
    InputPnComponent,
    UsageIbChartComponent,
    MapComponent,
    Pie1Component,
    BarComponent,
    TableComponent,
    Pie2Component,
    Pie3Component,
    Pie4Component,
    Top5Component,
    TopbarComponent,
    CobarComponent,
    StatusCard2Component,
    GradientBarComponent,
    GeosBarComponent,
    SumGeoComponent,
    ValBarComponent,
  ],
})
export class DashboardModule { }
