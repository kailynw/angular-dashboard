import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(private http:HttpClient) { }

  /**
   * 
   * @param currency Bitcoin=bitcoin, Ethereum=ethereum, XRP=xrp
   * @param days 
   */
  public getCurrencyDataPerPeriod(currency, days){
    let priceList:any=[]
    let dateList:any=[]

    return new Promise((resolve, reject)=>{
      this.http.get<any>(`/api/${currency}/${days}`).subscribe(data => {

          for(let i=0; i<days;i++){
            let date=data[i]["Date"]
            let price=parseFloat(data[i]["Close"].replace(/,/g, ''));
            dateList.push(date)
            priceList.push(price)
          }

          //Earliest date to latest
          dateList.reverse()
          priceList.reverse()
          resolve({dateList,priceList})
        });
    });
  } 


  public getFearGreedDataPerPeriod(days){
    let fearGreedList:any=[]
    let dateList:any=[]

    return new Promise((resolve, reject)=>{
      this.http.get<any>(`/api/fearGreed/${days}`).subscribe(data => {
          console.log(data)
          for(let i=0; i<days;i++){
            let date=data[i]["Date"]
            let price=data[i]["value"];
            dateList.push(date)
            fearGreedList.push(price)
          }

          //Earliest date to latest
          dateList.reverse()
          fearGreedList.reverse()
          resolve({dateList,fearGreedList})
        });
    });
  } 

  public getCoronaDataPerPeriod(days){

    let totalCases:any= []
    let dateList:any=[]

    return new Promise((resolve, reject)=>{
      this.http.get<any>(`/api/corona/${days}`).subscribe(data=>{

        for(let i=0; i<days;i++){
          let cases= data[i]["cases"]
          let date= data[i]["date"]
          totalCases.push(cases)
          dateList.push(date)
        }

        totalCases.reverse()
        dateList.reverse()
        resolve({dateList,totalCases})

      });
    });
  }

}
