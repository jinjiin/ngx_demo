import {Component, Input, OnInit, OnChanges, OnDestroy, ChangeDetectionStrategy, ElementRef} from '@angular/core';

@Component({
  selector: 'ngx-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.scss'],
})
export class WarningComponent implements OnInit, OnChanges {
  messinfo="";
  flag = false;
  initialized=false;
  @Input() selectPN: string;
  constructor() { 

  
   }

 ngOnInit(){
 	

 }
  ngOnChanges() {
  	if(!this.initialized){
	  	this.initialized=true;
  	}else{
  		this.messinfo="";
	  	if(this.messinfo==""){
	  		this.flag=false;
	  	}else{
	  		this.flag=true;
	  	}
  	}
  }
  

}
