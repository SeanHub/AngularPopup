#Angular Popup

AngularJS popup/modal directive. Provides an overlay of content which will drop in and out of view accompanied by a fading backdrop.  

##Installation

- Install using bower by adding to bower.json or installing manually.
```bash
bower install sm-angular-popup
```

##Usage

- Add sm.popup.css to your application and include sm.popup as a module dependency.
```bash
angular.module('app', ['sm.popup']);
``` 

- Within your controller, include popup as a dependency. You can then use the following to show a popup.
```bash
popup.create({ controller: 'popupCtrl', templateUrl: 'popup.html' }).open();
``` 

- To pass data to the popup controller, you can use the data key like so.
```bash
popup.create({ controller: 'popupCtrl', data: 'some data', templateUrl: 'popup.html' }).open();
``` 

##Methods

- The only method initially available to the popup directive is create, as used above. However, once created you can then open and close the popup. You should do this inside of a controller that you have referenced inside of the popup function. You can reference the popup by including the dependency popupInstance.  
```bash
angular.module('app').controller('popupCtrl', function ($scope, popupInstance) {
	$scope.closePopup = function () {
		popupInstance.close();
	};
});
``` 

- To access data passed to the popup you should include popupData as a dependecy  
```bash
angular.module('app').controller('popupCtrl', function ($scope, popupInstance, popupData) {
	$scope.closePopup = function () {
        console.log(popupData) //'some data';
		popupInstance.close();
	};
});
``` 

- By default the scope of the popup is private, however you can allow access to global scopes by setting global: true within the popup function configuration object.  
```bash
popup.create({ controller: 'popupCtrl', global: true, templateUrl: 'popup.html' }).open();
``` 

##To Do

- Allow toggling of opening and closing popup animation.
- Allow overriding of CSS classes.
- Seperate popup backdrop and popup into two completely separate directives to allow backdrop to load even when the popup has not yet loaded.
- Add test coverage.