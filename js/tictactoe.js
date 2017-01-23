var ticTacToe = angular.module('ticTacToe', ['ngSanitize','ngRoute']);
ticTacToe.controller('TicTacToe', 
function FoodServiceRebatesController($scope, $location) {
	$scope.has_won = '';

	$scope.buttonPress = function buttonPress(quadrant) {
		var button = quadrant.currentTarget,
			position = $(button).prop('classList')[1]
			do_nothing = false;

		if ($scope[position] != '' || $scope.has_winner) {do_nothing = true;return;}

		$scope[position] = $scope.current_player;

		changePlayer();
		setTimeout(function() {
			checkForWinner();
		}, 100);
	}

	$scope.showModal = function($event) {
		$('#gameFinished').modal();
	}

	function changePlayer() {
		if ($scope.current_player == 'X') {
			$scope.current_player = 'O';
		} else {
			$scope.current_player = 'X';
		}
	}

	function checkForWinner() {
		if (($scope.top_left == $scope.top_middle && $scope.top_middle == $scope.top_right && $scope.top_right != '') ||
			($scope.top_left == $scope.middle_middle && $scope.middle_middle == $scope.bottom_right && $scope.bottom_right != '') ||
			($scope.top_left == $scope.middle_left && $scope.middle_left == $scope.bottom_left && $scope.bottom_left != '') ||
			($scope.top_middle == $scope.middle_middle && $scope.middle_middle == $scope.bottom_middle && $scope.bottom_middle != '') ||
			($scope.top_right == $scope.middle_right && $scope.middle_right == $scope.bottom_right && $scope.bottom_right != '') ||
			($scope.top_right == $scope.middle_middle && $scope.middle_middle == $scope.bottom_left && $scope.bottom_left != '') ||
			($scope.middle_middle == $scope.middle_left && $scope.middle_middle == $scope.middle_right && $scope.middle_right != '') ||
			($scope.bottom_left == $scope.bottom_middle && $scope.bottom_middle == $scope.bottom_right && $scope.bottom_right != '')) {

			$scope.has_winner = true;
			changePlayer();
			$scope.has_won = $scope.current_player+" has won!";
			$scope.$apply();
			$scope.showModal();
		} else if ($scope.top_left != '' &&
			$scope.middle_left != '' &&
			$scope.bottom_left != '' &&
			$scope.top_middle != '' &&
			$scope.middle_middle != '' &&
			$scope.bottom_middle != '' &&
			$scope.top_right != '' &&
			$scope.middle_right != '' &&
			$scope.bottom_right != '') {

			$scope.has_won = "The Cat has won!"; 
			$scope.$apply();
			$scope.showModal();
		}
	}

	function resetBoard() {
		$scope.has_won = '';

		$scope.top_left = '';
		$scope.top_middle = '';
		$scope.top_right = '';

		$scope.middle_left = '';
		$scope.middle_middle = '';
		$scope.middle_right = '';

		$scope.bottom_left = '';
		$scope.bottom_middle = '';
		$scope.bottom_right = '';

		$scope.current_player = 'X';
		$scope.has_winner = false;

		$scope.$apply();
	}

	angular.element(document).ready(function () {
		resetBoard();

		$('#delModal_ok').on('click', function(e) {
			resetBoard();
		});
	});

});
