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
import { TextOutputComponent } from './text-output/text-output.component';
import { AccChartComponent } from './acc-chart/acc-chart.component';
import { CardComponent } from './card/card.component';
import { BaseInfoComponent } from './base-info/base-info.component';
import { ShortTermComponent } from './short-term/short-term.component';
import { LongTermComponent } from './long-term/long-term.component';
import { WarningComponent } from './warning/warning.component';
import { ForecastComponent } from './forecast/forecast.component';
import { LtfComponent } from './ltf/ltf.component';
import { MltfComponent } from './mltf/mltf.component';
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
    TextOutputComponent,
    AccChartComponent,
    CardComponent,
    BaseInfoComponent,
    ShortTermComponent,
    LongTermComponent,
    WarningComponent,
    ForecastComponent,
    LtfComponent,
    MltfComponent,

  ],
})
export class DashboardModule { }
