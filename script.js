var cities;
var filtered;




 /*Scatter Plot*/
var margin = {top: 20, right: 20, bottom: 30, left: 40},
   width = 1500 - margin.left - margin.right
   height = 500 - margin.top - margin.bottom;
var x2 = d3.scaleBand()
 .range([0, width])
 .padding(0.1);
var y2 = d3.scaleLinear()
 .range([height, 0]);
var svg2 = d3.select(".population-plot").append("svg2").text("Population Plot")
 .attr("width", width + margin.left + margin.right)
 .attr("height", height + margin.top + margin.bottom)
 .append("g")
 .attr("transform", 
    "translate(" + margin.left + "," + margin.top + ")");

d3.csv('cities.csv').then(data=>{
       console.log('cities', data);
       

 d3.csv('cities.csv', data=>{
    return {
    ...filtered, // spread operator
        
         eu: data.eu==='true', // convert to boolean
         population: +data.population,
         x2: +data.x,
         y2: +data.y,
    }
 }).then(data=>{
    console.log('cities', data);
    
    
    filtered = data.filter(data => data.eu === true);
    
    console.log('filter', filtered)
        
   });
x2.domain(data.map(function(filtered) { return filtered.city; }));
y2.domain([0, d3.max(filtered, function(filtered) { return filtered.population; })]);
svg2.selectAll(".circle")
    .data(filtered)
    .enter().append("circle")
    .attr("class", "circle")
    .attr("cx", function(filtered) { return x2(filtered.city); })
    .attr("width", x2.bandwidth())
    .attr("cy", function(filtered) { return y2(filtered.population); })
    .attr("r", 4);

// Add x axis
svg2.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x2));

// Add y axis
svg2.append("g")
    .call(d3.axisLeft(y2));

});
   

 



//BAR CHART 
var sorted;
var data2;
 
//var margin = {top: 20, right: 20, bottom: 30, left: 40},
var width2 = 1500 - margin.left - margin.right;
  //var height2 = 500 - margin.top - margin.bottom;
var x = d3.scaleBand()
   .range([0, width2])
   .padding(0.1);
var y = d3.scaleLinear()
   .range([height, 0]);
var svg = d3.select(".building").append("svg").text("Building Heights")
   .attr("width", width2 + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
   .append("g")
   .attr("transform", 
      "translate(" + margin.left + "," + margin.top + ")");

d3.csv('buildings.csv').then(data2=>{
         console.log('buildings', data2);
         sorted = data2;//.sort();
         console.log('sort', sorted)

   d3.csv('buildings.csv', sorted=>{
      return {
      ...filtered, // spread operator
           //height: filtered.eu==='true', // convert to boolean
      height: +sorted.height_ft,
      x: +sorted.x,
      y: +sorted.y,
      }
   }).then(data2=>{
      console.log('buildings', data2);
        // filtered = data.filter(data2 => data2.eu === true);
      console.log('sort', sorted)
          
   });
x.domain(sorted.map(function(sorted) { return sorted.building; }));
y.domain([0, d3.max(sorted, function(sorted) { return sorted.height_ft; })]);
svg.selectAll(".bar")
      .data(sorted)
      .enter().append("rect")
      .attr("class", "bar")
      .on("click", function(d) {
         // Do something after clicking a bar
         this.style.backgroundColor = "red";
         return false;
       })
      .attr("x", function(sorted) { return x(sorted.building); })
      .attr("width", x.bandwidth())
      .attr("y", function(sorted) { return y(sorted.height_ft); })
      .attr("height", function(sorted) { return height - y(sorted.height_ft); });

  // Add x axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add y axis
  svg.append("g")
      .call(d3.axisLeft(y));
  
});



