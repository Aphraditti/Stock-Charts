let request="https:api.twelvedata.com/time_series?start_date=2021-05-07&end_date=2021-06-19&symbol=BNTX&interval=1day&apikey=b04ec727c54046c38ec78aceb3b1a56f"

async function main(){
    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
    async function getData(){
       let result1=await fetch("https:api.twelvedata.com/time_series?start_date=2021-05-07&end_date=2021-06-19&symbol=GME&interval=1day&apikey=b04ec727c54046c38ec78aceb3b1a56f")
       let result2=await fetch("https:api.twelvedata.com/time_series?start_date=2021-05-07&end_date=2021-06-19&symbol=MSFT&interval=1day&apikey=b04ec727c54046c38ec78aceb3b1a56f")
       let result3=await fetch("https:api.twelvedata.com/time_series?start_date=2021-05-07&end_date=2021-06-19&symbol=DIS&interval=1day&apikey=b04ec727c54046c38ec78aceb3b1a56f")
       let result4=await fetch("https:api.twelvedata.com/time_series?start_date=2021-05-07&end_date=2021-06-19&symbol=BNTX&interval=1day&apikey=b04ec727c54046c38ec78aceb3b1a56f")
       let GME=await result1.json()
       let MSFT=await result2.json()
       let DIS=await result3.json()
       let BNTX=await result4.json()
       console.log(GME)
       return [MSFT, GME, DIS, BNTX]
    }
    let stocks=await getData()
    console.log(stocks)
    stocks.forEach((stock) => stock.values.reverse());
    var myChart = new Chart(timeChartCanvas.getContext("2d"), {
        type: "line",
        data: {
          labels: stocks[0].values.map((value) => value.datetime),
          datasets: stocks.map((stock) => ({
            label: stock.meta.symbol,
            data: stock.values.map((value) => parseFloat(value.high)),
            backgroundColor: getColor(stock.meta.symbol),
            borderColor: getColor(stock.meta.symbol),
          })),
        },
      });
      function getColor(stock){                                   //If statements returns values
        if(stock === "GME"){
            return 'rgba(61, 161, 61, 0.7)'
        }
        if(stock === "MSFT"){
            return 'rgba(209, 4, 25, 0.7)'
        }
        if(stock === "DIS"){
            return 'rgba(18, 4, 209, 0.7)'
        }
        if(stock === "BNTX"){
            return 'rgba(166, 43, 158, 0.7)'
        }
    }let maxValues = [];

    stocks.map((stock) => {
      let max = -Infinity;
      stock.values.map((value) => {
        if (parseFloat(value.high) > max) {
          max = parseFloat(value.high);
        }
      });
      maxValues.push(max);
    });
  
    console.log(maxValues);
  
    //let highest = maxValues.indexOf(Math.max(...maxValues));
  
    //console.log(highest);
  
    var myChart2 = new Chart(highestPriceChartCanvas.getContext("2d"), {
      type: "bar",
      data: {
        labels: stocks.map((stock) => stock.meta.symbol),
        datasets: [
          {
            label: stocks[0].meta.symbol,
            data: maxValues,
            backgroundColor: stocks.map((stock) => getColor(stock.meta.symbol)),
            borderColor: stocks.map((stock) => getColor(stock.meta.symbol)),
          },
        ],
      },
    });
    let totalValues = [];

  stocks.map((stock) => {
    let total = [];
    stock.values.map((value) => {
      total.push(parseFloat(value.high));
      total.push(parseFloat(value.open));
      total.push(parseFloat(value.low));
    });
    totalValues.push(total);
  });

  let averageValues = [];

  totalValues.map((value) => {
    let average = 0;
    value.map((num) => {
      average += num;
    });
    average = average / value.length;
    averageValues.push(average);
  });
    var myChart3=new Chart(averagePriceChartCanvas.getContext("2d"), {
        type: "pie",
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                data: averageValues, 
                backgroundColor: stocks.map(stock => getColor(stock.meta.symbol)),
                borderColor: stocks.map(stock => getColor(stock.meta.symbol)),
            }

            ]
        }
    })
}
main()


