angular.module('DreamCars', [])
	.controller('SelectionController', ['$scope', function ($scope) {
		Array.prototype.carIndexOf = function (obj) {
			for (var i = this.length - 1; i >= 0; i--) {
				if (this[i].make === obj.make && this[i].model === obj.model) {
					return i;
				}
			};
			return -1;
		};

		function dreamCarsCompare (a,b) {
			var base_sort = a.make > b.make ? 1 : -1;
			return a.make === b.make ? (a.model > b.model ? 1 : -1) : base_sort;
		};

		function firstFromOrDefault (make) {
			for(var i = 0; i < $scope.dreamCars.length; i++) {
				if($scope.dreamCars[i].make === make)
					return $scope.dreamCars[i];
			}
			return $scope.dreamCars[0];
		};

		function removeCar (arr, car) {
			arr.splice(arr.carIndexOf(car),1);
		};

		$scope.select = function select () {
			$scope.selectedCars.push($scope.selected);
			removeCar($scope.dreamCars, $scope.selected);
			$scope.selected = firstFromOrDefault($scope.selected.make);
		};

		$scope.remove = function remove (car) {
			$scope.dreamCars.push(car);
			$scope.dreamCars.sort(dreamCarsCompare);
			removeCar ($scope.selectedCars, car);
			$scope.selected = car;
		};

		$scope.dreamCars = dreamCars.sort(dreamCarsCompare);
		$scope.selectedCars = [];
		$scope.selected = $scope.dreamCars[0];
	}]);