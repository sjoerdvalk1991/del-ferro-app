var app = angular.module('today.controller', []);

var todayController = function($rootScope, $scope, $state, $ionicPopup, $ionicModal, $ionicHistory, $filter){
  var _this = this;
  this.stutter = 0;
  this.stop = 0;
  this.stopPoint = 0;
  this.dailyGoal = {};
  this.goalCount = 0;
  this.barWidth = 0;
  this.templateCount = {};
  this.reachedCount = 0;
  this.reachedGoalCount = 0;
  this.challengePoint = 0;
  this.telephonePoint = 0;
  this.challenge = 0;
  this.points = 0;
  this.goal = '';
  this.telephone = 0;
  this.today = {};
  this.items = '';
  this.item = '';
  this.lastPhoto = [];
  this.goals = JSON.parse(localStorage.getItem('goalAr'));
  this.photo = false;

  $ionicModal.fromTemplateUrl('js/states/today/add-goal.html', function(modalform) {
    $scope.addDialog = modalform;
  }, {
    scope: $scope,
    animation: 'slide-in-up',
  });

  $scope.$on('$destroy', function() {
    $scope.addDialog.remove();
  });

  this.loaded = function(){
    $('.all-content').fadeIn();
    $('.all-content').animo( { animation: 'fadeInRight', duration: 0.4 });
  }

  this.showAddChangeDialog = function(action) {
    $scope.action = action;
    $scope.addDialog.show();
  }

  this.leaveAddChangeDialog = function(newItem) {
    
    if(newItem != null){

      if(JSON.parse(localStorage.getItem('goalAr'))){
        var goalAr = JSON.parse(localStorage.getItem('goalAr'));
         goalAr.push(newItem);
         localStorage.setItem('goalAr', JSON.stringify(goalAr));


        
      }else{
        var goalAr = [];
        goalAr.push(newItem);
        localStorage.setItem('goalAr', JSON.stringify(goalAr));
      }
      $scope.addDialog.hide();
      _this.goals = JSON.parse(localStorage.getItem('goalAr'));
      _this.getGoal();
      $state.go($state.current, {}, {reload: true});
      $('.goal-isthere').show();
      $('.set-goal').hide();


    }else{
      $state.go($state.current, {}, {reload: true});
      $('.goal-isthere').hide();
      $('.set-goal').show();
    }  

    


  }

  this.addItem = function(form) {
    var newItem = {};
    // Add values from form to object
    newItem.count = form.count.$modelValue;
    newItem.title = form.title.$modelValue;
    newItem.date = _this.today;
    newItem.goalCount = form.count.$modelValue;
    newItem.reachedCount = 0;

    // If this is the first item it will be the default item
    if (newItem.title.length == null) {
      newItem.useAsDefault = true;
    } else {
      _this.leaveAddChangeDialog(newItem);
      if (newItem.useAsDefault) {
          
      }
    }
  }
 

  this.practise = [
    { text: "Oefeningen gedaan", checked: false }
  ];
  this.consequent = [
    { text: "Consequent geweest", checked: false }
  ];

  this.theDate = function(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    today = dd+'-'+mm+'-'+yyyy;
    return today;
  }

  this.today = this.theDate();

  if(localStorage.getItem('dailyData')){
    dailySession = JSON.parse(localStorage.getItem('dailyData'));
    var count = dailySession.length;
    dailyData = dailySession[count-1];
    if(dailyData.date == _this.today){
      _this.stutter = dailyData.stutter;
      _this.stop = dailyData.stop;
      _this.points = dailyData.points;
      _this.telephone = dailyData.telephone;
      _this.challenge = dailyData.challenge;
      _this.practise[0].checked = dailyData.practise;
      _this.consequent[0].checked = dailyData.consequent;
      _this.points = dailyData.points;
    }else{

    }
  }else{

  }

  $scope.showPractise = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Zet hem op!',
     template: 'Heb je de oefeningen al gedaan?'
   });
   alertPopup.then(function(res) {
     console.log('Warning 0');
   });
  };

  if(localStorage.getItem('practisewarning')){
    $scope.showPractise();
  }

  $scope.showAlertSaved = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Opgeslagen',
     template: 'De resultaten zijn succesvol opgeslagen'
   });
   alertPopup.then(function(res) {
     console.log('warning 1');
   });
  };

  $scope.showAlertPractise = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Super',
     template: 'Je bent op de goede weg'
   });
   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
  };

  this.openApp = function(){

  }


  this.dateFix = function(){
    dateArray = [];
    dailySession = JSON.parse(localStorage.getItem('dailyData'));
    j = 0;
    for (; j < dailySession.length; j++) {
      var date = dailySession[j].date;
      dateFormat(date);
    }
    function dateFormat(date){
      var year = date.substr(6,4);
      var month = date.substr(3,2);
      var day = date.substr(0,2);
      dailyDate = {
        date: year+'-'+month+'-'+day
      }
      var day = dailyDate.date;
        console.log(day);
      dateArray.push(day);
    }
    
      // console.log(dateArray);
      localStorage.setItem('calenderData', JSON.stringify(dateArray));
    
  }




  this.increase = function(type){
    if(type == 'stotteren'){
      _this.stutter++;
      stutterIncrease();

         

      function stutterIncrease(){
       
       // enable vibration support
        navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
         
        if (navigator.vibrate) {
            navigator.vibrate([500, 300, 100]);
            console.log('test');
        }
      
        

       
        _this.dayresultSaver();
      }




    }else if(type == 'stoppen'){
      _this.stop++;
      
       _this.stopPoint = (_this.stopPoint + 10);
      $('.pt-10').show();
      $('.pt-10').animo( {
        animation: 'fadeInUp', duration: 1.5}, function() {
        $('.pt-10').animo( { animation: 'fadeOutUpBig', duration: 1.3 }, function(){
        		
          $('.pt-10').hide();

        }, pointIncrease());
      });

      function pointIncrease(){
        $('.score-points').css("font-size", "2.5em");
        $scope.$apply(function () {
          _this.points = (_this.points + 10);
          _this.dayresultSaver();
        });

          $('.score').animo( {  animation: 'tada', duration: 0.8 });
          $('.score-points').css("font-size", "1.5em");

          _this.stopPoint = 0;
      }


      }else if(type == 'telefoneren'){
      _this.telephone++;
       _this.telephonePoint = (_this.telephonePoint + 10);
      $('.pt-tel').show();
      $('.pt-tel').animo( {
        animation: 'fadeInUp', duration: 1.5}, function() {
        $('.pt-tel').animo( { animation: 'fadeOutUpBig', duration: 1.3 }, function(){
          $('.pt-tel').hide();

        }, telephoneIncrease());
      });

      function telephoneIncrease(){
        $('.score-points').css("font-size", "2.5em");
        $scope.$apply(function () {
          _this.points = (_this.points + 10);
          _this.dayresultSaver();
        });

          $('.score').animo( {  animation: 'tada', duration: 0.8 });
          $('.score-points').css("font-size", "1.5em");

          _this.telephonePoint = 0;
      }





    }else if(type == 'uitdaging'){
      _this.challenge++;
      
      _this.challengePoint = (_this.challengePoint + 25);
      $('.ch-10').show();
      $('.ch-10').animo( {
        animation: 'fadeInUp', duration: 1.5}, function() {
        $('.ch-10').animo( { animation: 'fadeOutUpBig', duration: 1.3 }, function(){
          $('.ch-10').hide();

        }, challengeIncrease());
      });

      function challengeIncrease(){
        $('.score-points').css("font-size", "2.5em");
        $scope.$apply(function () {
          _this.points = (_this.points + 25);
          _this.dayresultSaver();
        });

          $('.score').animo( {  animation: 'tada', duration: 0.8 });
          $('.score-points').css("font-size", "1.5em");

        _this.challengePoint = 0;
      }


    }else{

    }
  }

  this.decrease = function(type){
    if((type == 'stotteren') && (_this.stutter > 0)){
  	 _this.stutter--;

     $('.pt-stutter-10').show();
      $('.pt-stutter-10').animo( {
        animation: 'fadeInUp', duration: 1.4}, function() {
        $('.pt-stutter-10').animo( { animation: 'fadeOutUpBig', duration: 1.3 }, function(){
          $('.pt-stutter-10').hide();

        }, stutterDecrease());
      });

      function stutterDecrease(){
        $scope.$apply(function () {
          _this.points = (_this.points*2);
        });
          $('.score-points').css("font-size", "3.5em");
          $('.score').animo( {  animation: 'shake', duration: 0.8 });
          $('.score-points').css("font-size", "1.5em");

      }



    }else if((type == 'stoppen')&&(_this.stop > 0)){
      _this.stop--;
      $('.pt--10').show();
      $('.pt--10').animo( {
        animation: 'fadeInUp', duration: 1.4}, function() {
        $('.pt--10').animo( { animation: 'fadeOutUpBig', duration: 1.3 }, function(){
          $('.pt--10').hide();

        }, pointDecrease());
      });

      function pointDecrease(){
        $scope.$apply(function () {
          _this.points = (_this.points + 10);
        });
          $('.score-points').css("font-size", "3.5em");
          $('.score').animo( {  animation: 'shake', duration: 0.8 });
          $('.score-points').css("font-size", "1.5em");

      }


      }else if((type == 'telefoneren')&&(_this.telephone > 0)){
     _this.telephone--;
      $('.pt-tel-10').show();
      $('.pt-tel-10').animo( {
        animation: 'fadeInUp', duration: 1.4}, function() {
        $('.pt-tel-10').animo( { animation: 'fadeOutUpBig', duration: 1.3 }, function(){
          $('.pt-tel-10').hide();

        }, telephoneDecrease());
      });

      function telephoneDecrease(){
        $scope.$apply(function () {
          _this.points = (_this.points - 10);
        });
          $('.score-points').css("font-size", "3.5em");
          $('.score').animo( {  animation: 'shake', duration: 0.8 });
          $('.score-points').css("font-size", "1.5em");

      }




    }else if((type == 'uitdaging')&&(_this.challenge > 0)){
      _this.challenge--;
      _this.dayresultSaver();
      $('.ch--10').show();
      $('.ch--10').animo( {
        animation: 'fadeInUp', duration: 1.4}, function() {
        $('.ch--10').animo( { animation: 'fadeOutUpBig', duration: 1.3 }, function(){
          $('.ch--10').hide();

        }, challengeDecrease());
      });

      function challengeDecrease(){
        $scope.$apply(function () {
          _this.points = (_this.points - 25);
        });
          $('.score-points').css("font-size", "3.5em");
          $('.score').animo( {  animation: 'shake', duration: 0.8 });
          $('.score-points').css("font-size", "1.5em");

      }


    }else{

    }
  }

  this.practiseChecker = function(){
    var checkValue = _this.practise[0].checked;
    if(checkValue == true){
      $('.pt-practise').show();
      $('.pt-practise').animo( {
        animation: 'fadeInUp', duration: 1.4}, function() {
        $('.pt-practise').animo( { animation: 'fadeOutUpBig', duration: 1.3 }, function(){
          $('.pt-practise').hide();

        }, pointPractise());
      });
    }

    function pointPractise(){
      $scope.$apply(function () {
        _this.points = (_this.points + 100);
      });
        $('.score-points').css("font-size", "3.5em");
        $('.score').animo( {  animation: 'tada', duration: 0.8 });
        $('.score-points').css("font-size", "1.5em");
    }
  }

  this.consequentChecker = function(){
    var checkValue = _this.consequent[0].checked;
    if(checkValue == true){
      $('.pt-consequent').show();
      $('.pt-consequent').animo( {
        animation: 'fadeInUp', duration: 1.4}, function() {
        $('.pt-consequent').animo( { animation: 'fadeOutUpBig', duration: 1.3 }, function(){
          $('.pt-consequent').hide();

        }, pointConsequent());
      });
    }

    function pointConsequent(){
      $scope.$apply(function () {
        _this.points = (_this.points + 200);
      });
        $('.score-points').css("font-size", "3.5em");
        $('.score').animo( {  animation: 'tada', duration: 0.8 });
        $('.score-points').css("font-size", "1.5em");
    }
  }

  this.dayresultSaver = function(){
    if(!localStorage.getItem('dailyData')){
      var savedData = [];

      var dailyData = {
        'date': _this.today,
        'stutter' : _this.stutter,
        'stop': _this.stop,
        'challenge': _this.challenge,
        'practise': _this.practise[0].checked,
        'consequent': _this.consequent[0].checked,
        'points': _this.points
      }

      savedData.push(dailyData); 
      localStorage.setItem('dailyPoints', JSON.stringify(_this.points));
      localStorage.setItem('dailyData', JSON.stringify(savedData));
      this.dateFix();
      
    }else{
      var dailySession = JSON.parse(localStorage.getItem('dailyData'));
      var dailyCount = dailySession[(dailySession.length -1)];
      console.log(dailyCount.date, _this.today);
      if(dailyCount.date === _this.today){
        dailySession.splice(-1, 1);

        var dailyData = {
          'date': _this.today,
          'stutter' : _this.stutter,
          'stop': _this.stop,
          'challenge': _this.challenge,
          'telephone': _this.telephone,
          'practise': _this.practise[0].checked,
          'consequent': _this.consequent[0].checked,
          'points': _this.points
        }

        dailySession.push(dailyData);
        localStorage.setItem('dailyPoints', JSON.stringify(_this.points));
        localStorage.setItem('dailyData', JSON.stringify(dailySession));
        this.dateFix(); 

      }else{

        var dailyData = {
          'date': _this.today,
          'stutter' : _this.stutter,
          'stop': _this.stop,
          'challenge': _this.challenge,
          'telephone': _this.telephone,
          'practise': _this.practise[0].checked,
          'consequent': _this.consequent[0].checked,
          'points': _this.points
        }

        dailySession.push(dailyData);
        localStorage.setItem('dailyPoints', JSON.stringify(_this.points));
        localStorage.setItem('dailyData', JSON.stringify(dailySession));
        this.dateFix();
      }
    }
  }

  this.getGoal = function(){
    if(JSON.parse(localStorage.getItem('goalAr'))){
      var goalAr = JSON.parse(localStorage.getItem('goalAr'));

      _this.goal = goalAr[goalAr.length-1].title;
      var count = goalAr[goalAr.length-1].count;

      _this.goalCount = goalAr[goalAr.length-1].goalCount;
      _this.reachedGoalCount = goalAr[goalAr.length-1].reachedCount;
      _this.templateCount = (_this.goalCount - _this.reachedGoalCount);

    }
  }

  this.goalIncrease = function(){
    _this.reachedGoalCount = _this.reachedGoalCount + 1;
    var count =_this.goalCount;
    var reached = count;
    _this.goalCount = reached;
    console.log(reached)
    var percentage = (_this.reachedGoalCount /  _this.goalCount);
    console.log(percentage);
    width = percentage * 100;
    $('.goalbar').animate({width: width+'%'});
    var goalAr = JSON.parse(localStorage.getItem('goalAr'));
    goalAr.splice(-1, 1);
    var newItem = {
      'count' : _this.goalCount,
      'title' : _this.goal,
      'date' : _this.today,
      'goalCount' : _this.goalCount,
      'reachedCount' : _this.reachedGoalCount  
    }

    goalAr.push(newItem);
    localStorage.setItem('goalAr', JSON.stringify(goalAr)); 
    _this.calcGoal();

    

  }

  this.calcGoal = function(){
    if(JSON.parse(localStorage.getItem('goalAr'))){
      var goalAr = JSON.parse(localStorage.getItem('goalAr'));
      console.log('test');

      _this.goal = goalAr[goalAr.length-1].title;
      var count = goalAr[goalAr.length-1].count;

      _this.goalCount = goalAr[goalAr.length-1].goalCount;
      _this.reachedGoalCount = goalAr[goalAr.length-1].reachedCount;
      _this.templateCount = (_this.goalCount - _this.reachedGoalCount);
      var count =_this.goalCount;
      var reached = count;
      _this.goalCount = reached;
      console.log(reached)
      var percentage = (_this.reachedGoalCount /  _this.goalCount);
      console.log(percentage);
      width = percentage * 100;
        _this.barWidth = width;
        if(width == 100){
          $('.goal-isthere').hide();
          this.goalCompleted(); 
          if(!localStorage.getItem('goalReached')){
            localStorage.setItem('goalReached', JSON.stringify(goalAr));
            _this.goalCompleted();
          }
        }
    }
  }


  this.goalChecker = function(){
    if(JSON.parse(localStorage.getItem('goalAr'))){
      var goalAr = JSON.parse(localStorage.getItem('goalAr'));
      var date = goalAr[goalAr.length-1].date;
      if(_this.today == date){
        $('.goal-isthere').show();
        $('.set-goal').hide();
        _this.calcGoal();
      }
    }else{
      $('.goal-isthere').hide();
    }  
  }


  this.goalCompleted = function(){
    console.log('test');
    
    $('.goal-isthere').hide(); 
    $('.set-goal').show();
    $('.goal-10').show();
    $('.goal-10').animo( {
          animation: 'fadeInUp', duration: 1.0}, function() {
            $('.goal-10').animo( { animation: 'fadeOutUpBig', duration: 1.3 }, function(){
            $('.goal-10').hide();

            }, addGoalPoints());
        });       
  
    function addGoalPoints(){
      var goalAr = '';
      localStorage.setItem('goalAr', JSON.stringify(goalAr));
      $scope.$apply(function () {
        _this.points = (_this.points + 250);
      });
        $('.score-points').css("font-size", "3.5em");
        $('.score').animo( {  animation: 'tada', duration: 0.8 });
        $('.score-points').css("font-size", "1.5em");


    } 
  }
  if(JSON.parse(localStorage.getItem('dailyData'))){
    _this.dateFix();
    
    
  }
  this.dayresultSaver();  
  this.goalChecker();
};



todayController.$inject = ['$rootScope', '$scope', '$state', '$ionicPopup', '$ionicModal', '$ionicHistory', '$filter'];
app.controller('TodayCtrl', todayController);