import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
  transform(value: any, searchText: any, status?: boolean, period?: any): any {

    if(!searchText && !status && !period) {
      return value;
    }
    let filteredData = value.filter((data) => this.matchValue(data,searchText));
    if (status != null) {
        console.log(status);
        filteredData = filteredData.filter(obj => obj.complete == status);
    }
    if (period) {
        let periodDate = new Date();
        if (period == 'month') {
            let monthFirst = new Date(periodDate.getFullYear(), periodDate.getMonth(), 1);
            let monthLast = new Date(periodDate.getFullYear(), periodDate.getMonth() + 1, 0);
            filteredData = filteredData.filter(obj => new Date(obj.date) >= monthFirst && new Date(obj.date) <= monthLast);
        } else if (period == 'week') {
            let first = periodDate.getDate() - periodDate.getDay();
            let last = first + 6;
            let weekFirst = new Date(periodDate.setDate(first));
            let weekLast = new Date();
            weekLast = new Date(weekLast.setDate(last));

            console.log(weekFirst);
            console.log(weekLast);
            filteredData = filteredData.filter(obj => new Date(obj.date) >= weekFirst && new Date(obj.date) <= weekLast);
        } else if (period == 'day') {
            let dayFirst = new Date(periodDate.setHours(0,0,0,0));
            let dayLast = new Date(periodDate.setHours(23,59,59,999));
            console.log(dayFirst);
            filteredData = filteredData.filter(obj => new Date(obj.date) >= dayFirst && new Date(obj.date) <= dayLast);
        }
    }
    console.log(filteredData);
    return filteredData; 
  }

 matchValue(data, value) {
   return Object.keys(data).map((key) => {
       return new RegExp(value, 'gi').test(data[key]);
   }).some(result => result);
 }

 firstDayWeek(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1);
    return new Date(d.setDate(diff));
  }
}