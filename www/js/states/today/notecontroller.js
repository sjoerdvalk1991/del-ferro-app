var app = angular.module('note.controller', []);

var noteController = function($scope, $rootScope, $state, params, $ionicModal, $ionicHistory){
	var _this = this;
	this.today = {};

	$ionicModal.fromTemplateUrl('js/states/today/add-note.html', function(modalnote) {
    $scope.addDialog = modalnote;
  }, {
    scope: $scope,
    animation: 'slide-in-up',
  });

  $scope.$on('$destroy', function() {
    $scope.addDialog.remove();
  });


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


	this.showAddChangeDialog = function(action) {
    $scope.action = action;
    $scope.addDialog.show();
  }

  this.addItem = function(form) {
    var newItem = {};
    // Add values from form to object
    newItem.note = form.content.$modelValue;
    newItem.date = _this.today;


    // If this is the first item it will be the default item
    if (newItem.note == 0) {
      newItem.useAsDefault = true;
    } else {
      _this.leaveAddChangeDialog(newItem);
      if (newItem.useAsDefault) {
          
      }
    }
  }

  this.leaveAddChangeDialog = function(newItem) {
    
  if(newItem != null){

    if(JSON.parse(localStorage.getItem('noteAr'))){
      var goalAr = JSON.parse(localStorage.getItem('noteAr'));
      if((goalAr[goalAr.length-1].date) == _this.today){
      	goalAr.splice(-1, 1);
      	goalAr.push(newItem);
      	localStorage.setItem('noteAr', JSON.stringify(goalAr));
      }else{ 
       goalAr.push(newItem);
       localStorage.setItem('noteAr', JSON.stringify(goalAr));
      } 

      
    }else{
      var goalAr = [];
      goalAr.push(newItem);
      localStorage.setItem('noteAr', JSON.stringify(goalAr));
    }

  }  

    $scope.addDialog.hide();
    $('.ion-edit').addClass('ion-checkmark');
    $('.ion-edit').removeClass('ion-edit');
    


  }
	
};

noteController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$ionicModal', '$ionicHistory'];
app.controller('NoteCtrl', noteController);