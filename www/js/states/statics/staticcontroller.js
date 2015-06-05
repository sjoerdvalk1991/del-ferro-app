var app = angular.module('static.controller', ['pickadate']);

var staticController = function($rootScope, $scope, $state, $ionicHistory, $ionicPopup, $ionicModal, $filter, $ionicSlideBoxDelegate, $state, $timeout){
  var _this = this;
  this.results = {};
  this.date = {};
  this.goal = {};
  this.percentage = {};
  this.result = {};
  this.goalCount = {};
  this.reachedCount = {};
  this.notes = {};
  this.score = 0;
  this.stutter = 2;
  this.stop = 7;
  this.challenge = 3;
  this.telephone = 4;
  

  this.closedateModal = function(modal) {
    var day = modal.substr(8,2);
    var month = modal.substr(5, 2);
    var year = modal.substr(0, 4);

    var date = day+'-'+month+'-'+year;
    _this.date = date;
    localStorage.setItem('showdate', JSON.stringify(date));
    $scope.datepicker = date;
    _this.date = date;
    _this.goalCheck();
    _this.noteCheck();
    var i = 0;
    var c = 0;
    for (; i < _this.results.length; i++) {
      if(_this.results[i].date == date){
        _this.result = _this.results[i];
        _this.score =  _this.results[i].points;
        console.log(_this.results[i]);
        _this.showResult();

      }else{

      }
    }

  };



  this.slideChanged = function(index) {
    console.log(index);
    switch(index) {
    case 0:

    break;
    case 1:
      _this.progress();
       $('.result-score').hide();

    break;
    case 2:

    $('.result-score').hide();
    $('.result-score').show();

    $('.result-score').animo( { animation: 'fadeInUp', duration: 0.8 });
    break;
    }
  }
   




  this.progress = function(){
         
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

  this.equalHeight = function(){
    var height = $('.equal-1').height();
    console.log(height);
  }
      
  this.newState = function(){
    $('.slidy').removeClass('visib');

    $('.resultintro').show();
  }

  this.goalCheck = function(){
    if(JSON.parse(localStorage.getItem('goalReached'))){
      var goalAr = JSON.parse(localStorage.getItem('goalReached'));
      var i = 0;
      var j = 0;
      for (; i < goalAr.length; i++) {
        if(goalAr[i].date == _this.date){
           $('.no-goal-text').hide();
           $('.goal-is').show();
          _this.goal = goalAr[i].title; 
          _this.goalCount = goalAr[i].goalCount;    
          _this.reachedCount = goalAr[i].reachedCount;
          _this.percentage =  ((_this.reachedCount/_this.goalCount) * 100);
          _this.progress();
        }else{
          $('.goal-is').hide();
          $('.no-goal-text').show();
        }

      } 
      if(j === goalAr.length){
        console.log('text');
        
      }
    }else{  
      $('.goal-is').hide();
      $('.no-goal-text').show();
    }
  }

  this.noteCheck = function(){
    if(JSON.parse(localStorage.getItem('noteAr'))){
      var noteAr = JSON.parse(localStorage.getItem('noteAr'));
      var i = 0;
      for (; i < noteAr.length; i++) {
        if(noteAr[i].date == _this.date){
        console.log('test');
        console.log(noteAr[i].note);
        _this.notes = noteAr[i].note;
        }else{
          _this.notes = "Er zijn geen notities voor vandaag";
        }
      }  
    }
  }


  this.showResult = function(){
    _this.stutter = _this.result.stutter;
    _this.stop =_this.result.stop;
    _this.challenge = _this.result.challenge;
    _this.telephone  = _this.result.telephone;
    _this.score = _this.result.points;
    $('.slidy').addClass('visib');
    $('.resultintro').hide();
    _this.slideChanged(console.log('dd'));
    _this.goalCheck();
    _this.equalHeight();
  }

    $rootScope.$on('getDate',function(event, args){
      var modal = args.date;
      _this.closedateModal(modal);

    });


  //   var modal = d.date;
  //   _this.date = modal;
  //   console.log('test');
  //   _this.closedateModal(modal);
  // }

  if(JSON.parse(localStorage.getItem('dailyData'))){
    _this.results = JSON.parse(localStorage.getItem('dailyData')).reverse();
  }  


  ($scope.clearHistory = function() {
    $ionicHistory.clearHistory();
    $scope.showHistory();

    _this.date = JSON.parse(localStorage.getItem('showdate'));
    _this.results = JSON.parse(localStorage.getItem('dailyData')).reverse();
    console.log(_this.results);
    var i = 0;
    for (; i < _this.results.length; i++) {
      if(_this.results[i].date == _this.date){
          _this.result = _this.results[i];
          _this.score =  _this.results[i].points;
          _this.stutter = _this.results[i].stutter;
          _this.stop = _this.results[i].stop;
        _this.goalCheck();
      }
    }      
  });

 // $rootScope.$on( "$ionicView.enter", function( scopes, states ) {
 //      if( states.fromCache && states.stateName == "tab.chats" ) {
 //        $scope.index = '';
 //        _this.newState();              
 //      }
 //  });
   
};

staticController.$inject = ['$rootScope', '$scope', '$state', '$ionicHistory', '$ionicPopup', '$ionicModal', '$filter', '$ionicSlideBoxDelegate', '$state'];
app.controller('StaticCtrl', staticController);