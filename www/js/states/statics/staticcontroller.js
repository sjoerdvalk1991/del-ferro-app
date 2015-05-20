var app = angular.module('static.controller', ['pickadate']);

var staticController = function($rootScope, $scope, $state, $ionicPopup, $ionicModal, $filter, $ionicSlideBoxDelegate, $state){
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

    $scope.datepicker = date;
    _this.date = date;
    _this.goalCheck();
    _this.noteCheck();
    var i = 0;
    var c = 0;
    for (; i < _this.results.length; i++) {
      if(_this.results[i].date == date){
        _this.result = _this.results[i];
        console.log(_this.results[i]);
        _this.showResult();

      }else{

      }
    }

  };

  $scope.slideChanged = function(index) {
    console.log(index);
    switch(index) {
    case 0:
      
    break;
    case 1:
      _this.progress();
       $('.result-score').hide();
       _this.score = _this.result.score; 
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
    if(JSON.parse(localStorage.getItem('goalAr'))){
      var goalAr = JSON.parse(localStorage.getItem('goalAr'));
      if((goalAr[goalAr.length-1].date) == _this.date){
        
          _this.goal = goalAr[goalAr.length-1].title; 
          _this.goalCount = goalAr[goalAr.length-1].goalCount;    
          _this.reachedCount = goalAr[goalAr.length-1].reachedCount;
          _this.percentage =  ((_this.reachedCount/_this.goalCount) * 100);
          _this.progress();

      } 
    }
  }

  this.noteCheck = function(){
    if(JSON.parse(localStorage.getItem('noteAr'))){
      var noteAr = JSON.parse(localStorage.getItem('noteAr'));
      if((noteAr[noteAr.length-1].date) == _this.date){
        console.log('test');
        console.log(noteAr[noteAr.length-1].note);
        _this.notes = noteAr[noteAr.length-1].note;
        
      }  
    }
  }


  this.showResult = function(){
    _this.stutter = _this.result.stutter;
    _this.stop =_this.result.stop;
    _this.challenge = _this.result.challenge;
    _this.telephone  = _this.result.telephone;
    $('.slidy').addClass('visib');
    $('.resultintro').hide();
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

 $rootScope.$on( "$ionicView.enter", function( scopes, states ) {
        if( states.fromCache && states.stateName == "tab.chats" ) {
          $scope.index = '';
          _this.newState();              
        }
    });
   
};

staticController.$inject = ['$rootScope', '$scope', '$state', '$ionicPopup', '$ionicModal', '$filter', '$ionicSlideBoxDelegate', '$state'];
app.controller('StaticCtrl', staticController);