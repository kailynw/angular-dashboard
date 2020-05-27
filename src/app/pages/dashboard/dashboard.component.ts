import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import {HttpClient} from "@angular/common/http";
import { computeMsgId } from '@angular/compiler';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import {CryptoService} from './../../services/crypto.service';
@Component({
  selector: "app-dashboard", 
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  public canvas : any;
  public ctx;
  public datasets: any;
  public data: any; 
  public chartLabelSet:any;
  public currentChartLabel:any;
  public currentPrice:any;
  public currentCoronaCases:any;
  public currentFearGreedIndex:any;
  public myChartData;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;
  private tt_default_background= '#f3f3f3';
  private tt_default_title='black'
  private redChartConfig= {lineColor:"#ec250d", pointColor:"#ec250d", stroke1: 'rgba(233,32,16,0.2)', stroke2: 'rgba(233,32,16,0.0)', stroke3: 'rgba(233,32,16,0.0)'};
  private purpleChartConfig= {lineColor:"#a742f5", pointColor: "#a742f0", stroke1: "rgba(165, 55, 253, 0.2)", stroke2: "rgba(165, 55, 253, 0.0)", stroke3: "rgba(165, 55, 253, 0.0)"}
  // coffee = faCoffee;
  private API_HOST:String= this.getApiHost()
  constructor(private http: HttpClient, private cryptoService:CryptoService ) {}

ngOnInit() {
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

    this.cryptoService.getCoronaDataPerPeriod(7).then(response=>{
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
    this.setCurrencyChartData('bitcoin').then(response=>{
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
    this.cryptoService.getFearGreedDataPerPeriod(7).then(Response=>{
      console.log(Response)
      let dateList = Response['dateList']
      let fearGreedIndex = Response['fearGreedList']
      this.currentFearGreedIndex = fearGreedIndex[fearGreedIndex.length-1]
      console.log(this.currentFearGreedIndex)

      this.canvas = document.getElementById("CountryChart");
      this.ctx  = this.canvas.getContext("2d");
      var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);
  
      gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
      gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
      gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors
  
      gradientBarChartConfiguration.scales.yAxes[0].ticks.suggestedMax = 100
  
      var myChart = new Chart(this.ctx, {
        type: 'bar',
        responsive: true,
        legend: {
          display: false
        },
        data: {
          labels: dateList,
          datasets: [{
            label: 'Index',
            fill: true,
            backgroundColor: gradientStroke,
            hoverBackgroundColor: gradientStroke,
            borderColor: '#1f8ef1',
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: fearGreedIndex,
          }]
        },
        options: gradientBarChartConfiguration
      });
    })




  }

  public getApiHost(){
    const hostname= window.location.hostname
    return hostname
  }

  public updateOptions() {
    console.log("UPdate " +this.currentChartLabel)
    this.myChartData.data.datasets[0].data = this.data;
    this.myChartData.data.labels= this.currentChartLabel;
    this.myChartData.update();
  }

  public async setCurrencyChartData(currency){
      let result:any= {}

      await this.cryptoService.getCurrencyDataPerPeriod(currency,7).then(response=>{
        result["sevenDays"]= response
      })

      await this.cryptoService.getCurrencyDataPerPeriod(currency,30).then(response=>{
        result["thirtyDays"]= response
      })

      await this.cryptoService.getCurrencyDataPerPeriod(currency,90).then(response=>{
        result["ninetyDays"]= response
      })

      return result
  }

  public changeChartCurrency(currency){
    console.log("Dashboard: "+ currency)

    switch(currency){
      case "bitcoin":
        this.setCurrencyChartData('bitcoin').then(response=>{
          this.renderNewChart(response)
        })
        break;

      case "ethereum":
        this.setCurrencyChartData('ethereum').then(response=>{
          this.renderNewChart(response)
        })
        break;

      case "xrp":
        this.setCurrencyChartData('xrp').then(response=>{ 
          this.renderNewChart(response)
        })
        break;
    }
  }

  chartOptions(){
    return {
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

  }

  renderNewChart(response){

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
    
    this.data =this.datasets[0]
    this.currentChartLabel= this.chartLabelSet[0]
    this.currentPrice= this.datasets[0][sevenDays['priceList'].length-1];
    this.canvas = document.getElementById("chartBig1");
    this.ctx = this.canvas.getContext("2d");
    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    console.log(this.currentPrice)
    gradientStroke.addColorStop(1,this.purpleChartConfig.stroke1 );
    gradientStroke.addColorStop(0.4, this.purpleChartConfig.stroke2);
    gradientStroke.addColorStop(0,  this.purpleChartConfig.stroke3); //purple colors

    //Y-axis scale min
    let chartOptions= this.chartOptions()
    chartOptions.scales.yAxes[0].ticks.suggestedMin= this.currentPrice
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
      options: chartOptions
    };
    this.myChartData = new Chart(this.ctx, config);
    this.updateOptions();


  }
}




