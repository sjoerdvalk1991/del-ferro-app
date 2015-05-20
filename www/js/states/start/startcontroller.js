var app = angular.module('start.controller', []);

var startController = function($scope, $ionicSlideBoxDelegate, $state){
	var _this = this;

	$scope.slideChanged = function(index) {
		switch(index) {
		case 0:
		$('.lay-over').hide();
		$('.fade-in-1 > .lay-over').show();
		$('.fade-in-1 > .lay-over').animo( { animation: 'fadeInUp', duration: 0.8 });
		break;
		case 1:
		$('.lay-over').hide();
		$('.fade-in-2 > .lay-over').show();
		$('.fade-in-2 > .lay-over').animo( { animation: 'fadeInUp', duration: 0.8 });
		break;
		case 2:
		$('.lay-over').hide();
		$('.fade-in-3 > .lay-over').show();
		$('.fade-in-3 > .lay-over').animo( { animation: 'fadeInUp', duration: 0.8 });
		break;
		}
	};

	this.stateChange = function(value){
		$state.go('app.movie', {value: value});
	}

};

startController.$inject = ['$scope', '$ionicSlideBoxDelegate', '$state'];
app.controller('StartCtrl', startController);