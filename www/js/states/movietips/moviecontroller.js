var app = angular.module('movie.controller', []);

var movieController = function($scope, $rootScope, $state, params, $ionicModal, $ionicViewService){
  var _this = this;
  this.sort = params.value;
  this.clipSrc = '../img/coffee.MOV';
 
	$ionicModal.fromTemplateUrl('js/states/movietips/video.html', function(modal) {
	  $scope.openMovie = modal;
	}, {
	  scope: $scope,
	  animation: 'slide-in-up',
	});

	this.showVideoPopup = function(action) {
    $scope.action = action;
    $scope.openMovie.show();
  }

  this.closeModal = function(){
  	$scope.openMovie.hide();
  	$state.go($state.current, {}, {reload: true});
  }

};

movieController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$ionicModal', '$ionicViewService'];
app.controller('MovieCtrl', movieController);