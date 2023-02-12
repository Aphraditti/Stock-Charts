async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
    const { GME, MSFT, DIS, BNTX } = mockData;               //Ojbect destructring 

const stocks = [GME, MSFT, DIS, BNTX];
console.log(stocks)                                                  
stocks.map(stock => stock.values.reverse())
new Chart(timeChartCanvas.getContext('2d'), {
    type: 'line',
    data: {
        labels: stocks[0].values.map(value => value.datetime),
        datasets: stocks.map( stock => ({
           label: stock.meta.symbol,
            data: stock.values.map(value => parseFloat(value.high)),
            backgroundColor:  getColor (stock.meta.symbol),
            borderColor: getColor (stock.meta.symbol),
        }))
    }
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
}
let firstMax = stocks[0].values                            //maxValue for our first object
.map((val) => {
    let arr= []
    arr.push(parseInt(val.high))
    return arr;
})
.sort()
.reverse()[0];
console.log(firstMax)
let secondMax = stocks[1].values  
.map((val) => {

  let arr= []
  arr.push(parseInt(val.high))                            //Created empty array pushed values from values array
  return arr;
})
.sort()
.reverse()[0];
console.log(secondMax)
let thirdMax = stocks[2].values
.map((val) => {
    let arr= []
    arr.push(parseInt(val.high))
    return arr;
})
.sort()
.reverse()[0];

let fourthMax = stocks[3].values
.map((val) => {
    let arr= []
    arr.push(parseInt(val.high))
    return arr;
})
.sort()
.reverse()[0];

let maxValues = [firstMax, secondMax, thirdMax, fourthMax];
console.log(maxValues)
  new Chart(highestPriceChartCanvas.getContext('2d'), {      //Bar chart source code: https://www.w3schools.com/js/js_graphics_chartjs.asp
    type: "bar",
    data: {
        labels: stocks.map(stock => stock.meta.symbol),          
        datasets: [{
            label: "Highest", 
            backgroundColor:  stocks.map(stock => getColor(stock.meta.symbol)),
            borderColor: stocks.map(stock => getColor(stock.meta.symbol)),
            data: maxValues,

        }]
    }
  })
  function maxValue(arr){
    let max= -Infinity
    for (let item of arr){
        for (let number in item.high){
            if(parseInt(number) >max){
                max=parseInt(number)
            }
        }
    }
    
    console.log(max)
    return max
  }
} 

main()
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
}