var app = angular.module('movietips.controller', []);

var movietipController = function($scope, $state, $rootScope, $ionicModal, $ionicHistory, $ionicLoading, $timeout){
  var _this = this;
  // _this.images = [];
  this.items = '';
  this.item = '';
  this.lastPhoto = [];
  this.photo = false;

	$ionicModal.fromTemplateUrl('js/states/movietips/add-change-tip.html', function(modal) {
	  $scope.addDialog = modal;
	}, {
	  scope: $scope,
	  animation: 'slide-in-up',
	});

  $scope.$on('$destroy', function() {
    $scope.addDialog.remove();
  });

  this.stateChange = function(value){
    $state.go('app.movie', {value: value});
  }

  this.catch = function(){
    console.log('no worry');
  }


  this.loaded = function(){
    $('.all-content').fadeIn();
    $('.all-content').animo( { animation: 'fadeInRight', duration: 0.4 });
  }

  this.getItemsSuccess = function(data){
    _this.items = data;
      // http://jimhoskins.com/2012/12/17/angularjs-and-apply.html 
    $scope.$apply(); 
  };

  this.getItems = function(){
    dataStore.getAll(_this.getItemsSuccess,_this.errorCallback);
    console.log('getItems'); 
  };

  this.errorCallback = function(){
    console.log('error'); 
  };

  this.initCallback = function(){
    _this.getItems();
  };

  this.showAddChangeDialog = function(action) {
    $scope.action = action;
    $scope.addDialog.show();
  }

  this.leaveAddChangeDialog = function() {
    $scope.addDialog.hide();
    $state.go($state.current, {}, {reload: true});
  }

  this.stateChange = function(value){
    $state.go('tab.movie-detail', {value: value});
  }


  this.addItem = function(form) {
    var newItem = {};
    // Add values from form to object
    newItem.title = form.title.$modelValue;
    newItem.description = form.description.$modelValue;
    // If this is the first item it will be the default item
    if (newItem.title.length == 0) {
      newItem.useAsDefault = true;
    } else {
      // Remove old default entry from list 
      if (newItem.useAsDefault) {
        
      }
    }
    
    dataStore.put({'timeStamp': new Date().getTime(),'title' : form.title.$modelValue, 'text' : form.description.$modelValue, 'url' : _this.lastPhoto[_this.lastPhoto.length-1] });
    $scope.addDialog.remove();
    _this.leaveAddChangeDialog();
    _this.photo = false;
  };

  var dataStore = new IDBStore('todos', _this.initCallback);   

  this.getStored = function(){
    var dataStore = new IDBStore('todos', _this.initCallback); 
  }

 

};

movietipController.$inject = ['$scope', '$state', '$rootScope', '$ionicModal', '$ionicHistory', '$ionicLoading', '$timeout'];
app.controller('MovietipCtrl', movietipController);