angular.module('sm.popup.tpl.html', []).run(['$templateCache',
	function ($templateCache) {
		var template = '<div class="sm-popup"><div class="sm-popup-backdrop" ng-class="{visible: !opening, invisible: hideWindow}" ng-show="active"><div class="sm-popup-container"><div class="sm-popup-window"><div class="sm-popup-content" ng-class="{visible: !opening, invisible: closing}" ng-transclude></div></div></div></div></div>';
		$templateCache.put('sm.popup.tpl.html', template);
}]);

angular.module('sm.popup', ['sm.popup.tpl.html'])

.directive('sm.popup', [
	function () {
		return {
			restrict: 'E',
			templateUrl: 'sm.popup.tpl.html',
			transclude: true
		};
}])

.factory('popup', ['$compile', '$controller', '$document', '$http', '$rootScope', '$timeout',
	function ($compile, $controller, $document, $http, $rootScope, $timeout) {
		var create = function (config) {
			if (!config.templateUrl) {
				throw new Error('You must provide a templateUrl');
			};

			var $scope = config.global ? $rootScope.$new() : $rootScope.$new(true);

			if (config.templateUrl) {
				$http.get(config.templateUrl).then(function (data) {
					$document.find('body').eq(0).append($compile(angular.element('<sm.popup data-sm-popup-id="' + numberOfPopups++ + '">' + data.data + '</sm.popup>'))($scope));
				});
			}

			var close = function () {
				$scope.closing = true;
				$timeout(function () {
					$scope.hideWindow = true;
				}, 500);
				$timeout(function () {
					$scope.active = false;
					$scope.closing = false;
					$scope.hideWindow = false;
					destroy();
				}, 800);
			};

			var destroy = function () {
				var popupArray = $document.find('sm.popup');
				for (var i = 0; i < popupArray.length; i++) {
                    var popup = popupArray[i];
					if (Number(popup.getAttribute('data-sm-popup-id')) === numberOfPopups-1) {
						numberOfPopups--;
                        popup.parentNode.removeChild(popup);
						$scope.$destroy();
					};
				};
			};

			var open = function () {
				$scope.active = true;
				$scope.opening = true;
				$timeout(function () {
					$scope.opening = false;
				}, 100);
			};

			if (config.controller) {
                var instance = {
					$scope: $scope,
                    popupData: null,
					popupInstance: {
						close: close
					}
				};
                config.data ? instance.popupData = config.data : null;
				$scope[config.controller] = $controller(config.controller, instance);
			};

			return {
				close: close,
				open: open
			}
		};
		
		var numberOfPopups = 0;

		return {
			create: create
		};
}]);