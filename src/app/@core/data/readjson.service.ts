import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
@Injectable()
export class ReadjsonService {
 constructor(private http: Http) { }

// private url= 'assets/jsonfiles/usage-ib.json';
  // 'https://api.github.com/users/ibuioli/repos';
  // 'jsonfiles/doublebar.json';
 getJson(url) {
  return this.http.get(url).map((res: Response) => res.json());
 }
 getJson2(url) {
   return this.http.get(url);
 }

 getObjectsFilterBy(data, key, val) {
  const objects = [];
  let index = -1;

  for (let i = 0; i < data.length; i++) {
    if (data[i][key] === val) {
      index = index + 1;
      objects[index] = data[i];
    }
  }

  if (objects.length > 0) {
    return objects;
  }else {
    return null;
  }
 }


 getDataFilterBy(data, key) {
   const datas = [];
   let index = -1;

   for (let i = 0; i < data.length; i++) {
    if (data[i][key] !== undefined) {
      index = index + 1;
      datas[index] = data[i][key];
    }
   }

   if (datas.length > 0) {
     return datas;
   }else {
     return null;
   }
 }

 getValuesFilterBy(data, key) {
    const datas = [];
    let index = -1;
    for (let i = 0; i < Object.keys(data).length; i++) {
      if (Object.keys(data)[i] !== undefined) {
        if (Object.keys(data)[i] === key) {
          index = index + 1;
          datas[index] = data[Object.keys(data)[i]];
        }
      }
    }
    if (datas.length > 0) {
     return datas;
    }else {
     return null;
    }
  }
}
