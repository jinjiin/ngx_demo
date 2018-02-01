import { Component} from '@angular/core';
import { PageToCrawlComponent } from './pageToCrawl.component';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'ngx-readcsv',
  template: `<h4>Please select csv file!</h4>
            <div>
             <input type="file" (change)="onChange($event)"/>
            </div>
            <div>
              <table border="1" class="demoTable">
                <tr *ngFor="let x of pagesToCrawl">
                  <td>{{ x.Url }}</td>
                </tr>
              </table>
            </div>
            `,
})
export class ReadcsvComponent {

 pagesToCrawl: PageToCrawlComponent[] = [];

  constructor (private http: Http) {}

  onChange(event) {
        const text = [];
        const files = event.srcElement.files;
        if (files[0].name.includes('.csv')) {
           const input = event.target;
           const reader = new FileReader();
           reader.onload = function(){
             const csvData = reader.result;
             const allTextLines = csvData.split(/\r\n|\n/);
             const headers = allTextLines[0].split(';');
             const lines = [];
             for (let i = 0; i < allTextLines.length; i++) {
              // split content based on comma
              const data = allTextLines[i].split(';');
              if (data.length === headers.length) {
                const tarr = [];
                for (let j = 0; j < headers.length; j++) {
                  tarr.push(data[j]);
                }
                const page = new PageToCrawlComponent();
                page.Url = 'https://www.google.ie/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#safe=active&q='
                  + tarr[0] + '+' + tarr[1] + '+' + tarr[2];
                text.push(page);
              }
            }
          };
          reader.readAsText(input.files[0]);
          this.pagesToCrawl = text;
          this.http.post('localhost:4200/setData', text);
      }
    }


}
