import { Injectable } from '@angular/core';

@Injectable()
export class UsageIbService {

  private usage= [ 3, 9, 17, 6, 6, 2, 4, 4, 14, 11, 4, 5, 1, 5, 8, 4, 4, 10, 4, 9, 3, 1, 4, 10, 6, 5, 5, 4, 3, 5, 7,
                   7, 5, 2, 10, 2, 8, 3, 3, 3, 10, 2, 1, 3, 8, 3, 6, 6, 21, 10, 2, 1];
  private ib = [20000, 25000, 30000, 32000, 40000, 41000, 32000, 30000, 24000, 20000, 15000, 10000];
  private ib_label= [
              '2015-1',
              '2015-2',
              '2015-3',
              '2015-4',
              '2015-5',
              '2015-6',
              '2015-7',
              '2015-8',
              '2015-9',
              '2015-10',
              '2015-11',
              '2015-12',
            ];
  private usage_label= [
              '2016-1',
              '2016-2',
              '2016-3',
              '2016-4',
              '2016-5',
              '2016-6',
              '2016-7',
              '2016-8',
              '2016-9',
              '2016-10',
              '2016-11',
              '2016-12',
              '2017-1',
            ];

  constructor() { }
  getUsage() {
    return this.usage;
  }
  getIB() {
    return this.ib;
  }
  getUsageLabel() {
    return this.usage_label;
  }
  getIBLabel() {
    return this.ib_label;
  }

}
