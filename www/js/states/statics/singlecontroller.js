var app = angular.module('single.controller', []);

var singleController = function(params, $state, $scope, $timeout){
  var _this = this;
  this.result = {};
  this.goalText = {};
  this.stutterHeight = 0;
  this.stopHeight = 0;
  this.telephoneHeight = 0;
  this.challengeHeight = 0;
  this.goalCount = {};
  this.results = JSON.parse(localStorage.getItem('dailyData'));

  this.resultCheck = function(params){
  	var results = JSON.parse(localStorage.getItem('dailyData'));
    var i = 0;
    for (; i < results.length; i++) {
      if(results[i].date == params.date){
        	return results[i];
      }
    }
    console.log(_this.result);
    

    
  }

  this.goalCheck = function(){
    if(JSON.parse(localStorage.getItem('goalAr'))){
      var goalAr = JSON.parse(localStorage.getItem('goalAr'));

      _this.goalText = goalAr[0].title;
      _this.goalCount = goalAr[0].count;


    }else{

    }
  }
  
  this.heightFor = function(){
    console.log('test');
   
      _this.stutterHeight = (_this.result.stutter * 10);
      _this.stopHeight =  (_this.result.stop * 10);
      _this.telephoneHeight =  (_this.result.telephone * 10);
      _this.challengeHeight = (_this.result.challenge * 10);
      
  
  }
  
    this.barChart = function(){
      var barOne = $('#bar-1');
      $(barOne).show();
      $(barOne).animo( {
        animation: 'fadeInLeft', duration: 0.5}, function() {
          progress(barOne);
          $('#bar-2').show();
          $('#bar-2').animo( {
            animation: 'fadeInLeft', duration: 0.5}, function() {
             $('#bar-3').show();
             $('#bar-3').animo( {
            animation: 'fadeInLeft', duration: 0.5}, function() {
              $('#bar-4').show();
              $('#bar-4').animo( {
            animation: 'fadeInLeft', duration: 0.5}, function() {
          })

    

   

      })
      })
      })

      function progress(barOne){
         
          $('.bar-percentage[data-percentage]').each(function () {
            var progress = $(this);
            var percentage = Math.ceil($(this).attr('data-percentage'));
            $({countNum: 0}).animate({countNum: percentage}, {
              duration: 1000,
              easing:'linear',

              step: function() {
                // What todo on every count
              var pct = '';
              if(percentage == 0){
                pct = Math.floor(this.countNum) + '%';
              }else{
                pct = Math.floor(this.countNum+1) + '%';
              }
               progress.siblings().children().css('width',pct);
              }
            });
          });
        }
      
    }
  

  this.result = _this.resultCheck(params);
  this.heightFor();
  this.barChart();
  

  


//   this.drawChart = function(){
//     d3.select("svg").remove();

//     var w = 300;
//     var h = 300;
//     var r = h/2;
//     var color = d3.scale.category20().range(["#d62728","#98df8a", "#2ca02c"]);
//     var data =[ 

//       {"label":"Stotteren "+_this.result.stutter, "value":_this.result.stutter}, 
//       {"label":"Stoppen "+_this.result.stop, "value":_this.result.stop}, 
//       {"label":"Uitdagingen "+_this.result.challenge, "value":_this.result.challenge}
    
//     ];

//     var vis = d3.select('#chart').append("svg:svg").data([data]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");
//     var pie = d3.layout.pie().value(function(d){return d.value;});

// // declare an arc generator function
//     var arc = d3.svg.arc().outerRadius(r);

    

//     // select paths, use arc generator to draw
//     var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
//     arcs.append("svg:path")
//       .attr("fill", function(d, i){
//           return color(i);
//       })
//       .attr("d", function (d) {
//           // log the result of the arc generator to show how cool it is :)
//           return arc(d);
//       })

//     // add the text
//     arcs.append("svg:text").attr("transform", function(d){
//       d.innerRadius = 0;
//       d.outerRadius = r;
//     return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) {
//     return data[i].label;}
//     );
    
//   }


  this.goalCheck();

  this.checkChange = function(){
    var date = _this.result.date;
    _this.changeState(date);
  }


  this.changeState = function(date){
    $state.go('app.overview', {date: date});
  }

  this.changeDate = function(type){
    var results = JSON.parse(localStorage.getItem('dailyData'));
    if (type == 'minus') {
      var i = 0;
      for (; i < results.length; i++) {
        if(results[i].date == _this.result.date){
            _this.result = results[i-1];
            _this.drawChart();
        }
      }
    }else if(type == 'plus') {
      var i = 0;
      var newResult;
      for (; i < results.length; i++) {
        if(results[i].date == _this.result.date){
          newResult = i;
        }
      }
      plusDate(newResult);
      function plusDate(i){
        _this.result = results[i+1];
        _this.heightFor();
      }  
    }
  }

  
  // this.drawChart();
};  


singleController.$inject = ['$stateParams', '$state', '$scope', '$timeout'];
app.controller('SingleCtrl', singleController);