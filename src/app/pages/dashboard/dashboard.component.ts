import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import {HttpClient} from "@angular/common/http";
import { computeMsgId } from '@angular/compiler';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: "app-dashboard", 
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {
  public canvas : any;
  public ctx;
  public datasets: any;
  public data: any; 
  public chartLabelSet:any;
  public currentChartLabel:any;
  public currentPrice:any;
  public currentCoronaCases:any;
  public myChartData;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;
  private tt_default_background= '#f3f3f3';
  private tt_default_title='black'
  private redChartConfig= {lineColor:"#ec250d", pointColor:"#ec250d", stroke1: 'rgba(233,32,16,0.2)', stroke2: 'rgba(233,32,16,0.0)', stroke3: 'rgba(233,32,16,0.0)'};
  private purpleChartConfig= {lineColor:"#a742f5", pointColor: "#a742f0", stroke1: "rgba(165, 55, 253, 0.2)", stroke2: "rgba(165, 55, 253, 0.0)", stroke3: "rgba(165, 55, 253, 0.0)"}
  coffee = faCoffee;

  constructor(private http: HttpClient) {}

ngOnInit() {
 
 var gradientChartOptionsConfigurationWithTooltipBlue: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: this.tt_default_background,
        titleFontColor: this.tt_default_title,
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#2380f7"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#2380f7"
          }
        }]
      }
    };

    var gradientChartOptionsConfigurationWithTooltipPurple: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: this.tt_default_background,
        titleFontColor: this.tt_default_title,
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#a742f5"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(225,78,202,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#a742f5"
          }
        }]
      }
    };

    var gradientChartOptionsConfigurationWithTooltipRed: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: this.tt_default_background,
        titleFontColor: this.tt_default_title,
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 25,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(233,32,16,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }]
      }
    };

    var gradientChartOptionsConfigurationWithTooltipOrange: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: this.tt_default_background,
        titleFontColor: this.tt_default_title,
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 50,
            suggestedMax: 110,
            padding: 20,
            fontColor: "#ff8a76"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(220,53,69,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#ff8a76"
          }
        }]
      }
    };

    var gradientChartOptionsConfigurationWithTooltipGreen: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: this.tt_default_background,
        titleFontColor: this.tt_default_title,
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 50,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(0,242,195,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }]
      }
    };


    var gradientBarChartConfiguration: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: this.tt_default_background,
        titleFontColor: this.tt_default_title,
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 120,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }],

        xAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }]
      }
    };

    /******** TOTOAL SHIPMENTS CHART *******/

    this.getCoronaDataPerPeriod(7).then(response=>{
      console.log(response)
      let dateList= response['dateList']
      let totalCases= response['totalCases']
      this.currentCoronaCases= totalCases[totalCases.length-1];
      console.log(this.currentPrice)

      this.canvas = document.getElementById("chartLineRed");
      this.ctx = this.canvas.getContext("2d");
      var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, this.redChartConfig.stroke1);
      gradientStroke.addColorStop(0.4, this.redChartConfig.stroke2);
      gradientStroke.addColorStop(0,  this.redChartConfig.stroke3); //red colors
      
      //Y-axis scale min
      gradientChartOptionsConfigurationWithTooltipRed.scales.yAxes[0].ticks.suggestedMin= this.currentCoronaCases

      var data = {
        labels: dateList,
        datasets: [{
          label: "Effected",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: '#ec250d',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#ec250d',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#ec250d',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: totalCases,
        }]
      };

      var myChart = new Chart(this.ctx, {
        type: 'line',
        data: data,
        options: gradientChartOptionsConfigurationWithTooltipRed
      });
    });

    /***************************************/



    /******** COMPLETED TASKS CHART *********/
    this.canvas = document.getElementById("chartLineGreen");
    this.ctx = this.canvas.getContext("2d");
    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
    gradientStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)'); //green colors
    gradientStroke.addColorStop(0, 'rgba(66,134,121,0)'); //green colors

    var data = {
      labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV'],
      datasets: [{
        label: "My First dataset",
        fill: true,
        backgroundColor: gradientStroke,
        borderColor: '#00d6b4',
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: '#00d6b4',
        pointBorderColor: 'rgba(255,255,255,0)',
        pointHoverBackgroundColor: '#00d6b4',
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: [90, 27, 60, 12, 80],
      }]
    };

    var myChart = new Chart(this.ctx, {
      type: 'line',
      data: data,
      options: gradientChartOptionsConfigurationWithTooltipRed
    });

    /********************************************/




    /***** BITCOIN CHART  ******/
    this.setBitcoinChartData().then(response=>{
      const sevenDays= response['sevenDays']
      const thirtyDays= response['thirtyDays']
      const ninetyDays= response['ninetyDays']

      this.datasets = [
        sevenDays['priceList'],
        thirtyDays['priceList'],
        ninetyDays['priceList']
      ];

      this.chartLabelSet=[
        sevenDays['dateList'],
        thirtyDays['dateList'],
        ninetyDays['dateList']
      ];

      console.log(this.chartLabelSet)
      console.log(this.datasets)

      this.data =this.datasets[0]
      this.currentChartLabel= this.chartLabelSet[0]
      this.currentPrice= this.datasets[0][sevenDays['priceList'].length-1];
      this.canvas = document.getElementById("chartBig1");
      this.ctx = this.canvas.getContext("2d");
      var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);
  
      gradientStroke.addColorStop(1,this.purpleChartConfig.stroke1 );
      gradientStroke.addColorStop(0.4, this.purpleChartConfig.stroke2);
      gradientStroke.addColorStop(0,  this.purpleChartConfig.stroke3); //purple colors

      //Y-axis scale min
      gradientChartOptionsConfigurationWithTooltipRed.scales.yAxes[0].ticks.suggestedMin= this.currentPrice

      var config = {
        type: 'line',
        data: {
          labels: this.currentChartLabel, 
          datasets: [{
            label: "Price ",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: this.purpleChartConfig.lineColor, //Line Color
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: this.purpleChartConfig.pointColor,//point color
            pointBorderColor: 'rgba(255,255,255,0)',//transparent
            pointHoverBackgroundColor: this.purpleChartConfig.pointColor,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.data,
          }
        ]
        },
        options: gradientChartOptionsConfigurationWithTooltipRed
      };
      this.myChartData = new Chart(this.ctx, config);
  
      
    })


    /*************************************************/



    /******* DAILY SALES CHART*******/
    this.canvas = document.getElementById("CountryChart");
    this.ctx  = this.canvas.getContext("2d");
    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
    gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
    gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors


    var myChart = new Chart(this.ctx, {
      type: 'bar',
      responsive: true,
      legend: {
        display: false
      },
      data: {
        labels: ['USA', 'GER', 'AUS', 'UK', 'RO', 'BR'],
        datasets: [{
          label: "Countries",
          fill: true,
          backgroundColor: gradientStroke,
          hoverBackgroundColor: gradientStroke,
          borderColor: '#1f8ef1',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: [53, 20, 10, 80, 100, 45],
        }]
      },
      options: gradientBarChartConfiguration
    });


  }
  
  public updateOptions() {
    this.myChartData.data.datasets[0].data = this.data;
    this.myChartData.data.labels= this.currentChartLabel;

    this.myChartData.update();
  }

  public async setBitcoinChartData(){
      let result:any= {}

      await this.getBitcoinDataPerPeriod(7).then(response=>{
        result["sevenDays"]= response
      })

      await this.getBitcoinDataPerPeriod(30).then(response=>{
        result["thirtyDays"]= response
      })

      await this.getBitcoinDataPerPeriod(90).then(response=>{
        result["ninetyDays"]= response
      })

      return result


  }


  public getBitcoinDataPerPeriod(days){
    let priceList:any=[]
    let dateList:any=[]

    return new Promise((resolve, reject)=>{
      this.http.get<any>(`http://localhost:3000/api/bitcoin/${days}`).subscribe(data => {

          for(let i=0; i<days;i++){
            let date=data[i]["Date"]
            let price=parseFloat(data[i]["Open"].replace(/,/g, ''));
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

  public getCoronaDataPerPeriod(days){

    let totalCases:any= []
    let dateList:any=[]

    return new Promise((resolve, reject)=>{
      this.http.get<any>(`http://localhost:3000/api/corona/${days}`).subscribe(data=>{

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

