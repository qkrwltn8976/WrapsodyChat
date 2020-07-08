// angular.module('wrapmsgrComponents', [])
// .controller('userProfileController', function($scope, $document) {
// 	$scope.isShowProfile = false;

// 	$scope.hideOnClick = function(e) {
// 		var offset = $scope.element.offset();
// 		if ((offset.left > e.pageX || e.pageX > (offset.left + $scope.element.width()))
// 				|| (offset.top > e.pageY || e.pageY > (offset.top + $scope.element.height()))) {
			
// 			$scope.$apply(function() {
// 				$scope.isShowProfile = false;
// 				$document.off('mousedown', $scope.hideOnClick);
// 	    	});
// 		}
// 	};

// 	$scope.show = function(e) {
//     	var width = window.innerWidth;
//     	var height = window.innerHeight;
    	
//     	var left = e.pageX + $scope.element.width() > width ? e.pageX - $scope.element.width() : e.pageX;
//     	var top = e.pageY + $scope.element.height() > height ? e.pageY - $scope.element.height() : e.pageY;
    	
//     	$scope.element.css({'left': left, 'top': top});
    	
// 		if (!$scope.isShowProfile) {
// 			$scope.isShowProfile = true;
//     		$document.on('mousedown', $scope.hideOnClick);
// 		}
//     };
// })
// .directive('wrapmsgrUserProfile', ['$document', '$compile', '$rootScope', '$http', '$httpParamSerializerJQLike', function($document, $compile, $rootScope, $http, $httpParamSerializerJQLike) {

// 	var profileElement, profileScope;
	
// 	$http.get(window.wrapmsgrWidgetParameters['url'] + '/component/userProfile')
// 	.then(function(response) {
// 		profileElement = angular.element(response.data);
		
// 		$compile(profileElement)($rootScope.$new(true));
// 		$document.find('.wrapmsgr_container').append(profileElement);
		    
// 		profileScope = profileElement.scope();
// 		profileScope.element = profileElement;
// 	});
	
// 	return {
// 		restrict: 'A',
// 		scope: {
// 			profile: '=wrapmsgrUserProfile',
// 			disabled: '=userProfileDisabled'
// 		},
// 		link: function(scope, elem, attrs) {
// 			elem.on('click', function(event) {
// 				event.preventDefault();
				
// 				if (!scope.disabled) {
// 					if (typeof scope.profile === 'string') {
// 						$http({
// 							method: 'POST',
// 							url: window.wrapmsgrWidgetParameters['host'] + '/user/getInfo.do',
// 							headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
// 							transformRequest: $httpParamSerializerJQLike,
// 							data: {userId: scope.profile}
// 						}).then(function(response) {
// 							showProfile(event, response.data);
// 						});
// 					} else {
// 						profileScope.$apply(function() {
// 							showProfile(event, scope.profile);
// 						});
// 					}
// 				}
// 			});
// 		}
// 	};
	
// 	function showProfile(event, profile) {
// 		profileScope.profile = profile;
// 		profileScope.show(event);
// 	}
// }])
// .controller('fullscreenViewController', function($scope, $document) {
// 	isShowFullscreenView = false;
	
// 	$scope.show = function() {
// 		$scope.$apply(function() {
// 			$scope.isShowFullscreenView = true;
// 			$document.on('keydown', hideOnESC);
// 		});
// 	};
	
// 	$scope.hide = function() {
// 		$scope.isShowFullscreenView = false;
// 		$document.off('keydown', hideOnESC);
// 	};
	
// 	function hideOnESC(e) {
// 		if (e.keyCode == 27) {
// 			$scope.hide();
// 		}
// 	};
// })
// .directive('fullscreenView', ['$document', '$compile', '$rootScope', function($document, $compile, $rootScope) {
// 	var fullscreenViewElement = angular.element('\
// 			<div class="fullscreen-view_div" ng-controller="fullscreenViewController" ng-show="isShowFullscreenView" ng-click="hide()">\
// 				<img class="fullscreen-view_img" ng-src="{{ imgSrc }}" />\
// 			</div>');
		
// 	$compile(fullscreenViewElement)($rootScope.$new(true));
// 	$document.find('.wrapmsgr_container').append(fullscreenViewElement);
	
// 	return {
// 		restrict: 'A',
// 		link: function(scope, elem, attrs) {
// 			elem.addClass('fullscreen-view-element');
// 			elem.on('click', function(event) {
// 				event.preventDefault();
				
// 				if (elem.context.src) {
// 					fullscreenViewElement.scope().imgSrc = elem.context.src;
// 					fullscreenViewElement.scope().show();
// 				}
// 			});
// 		}
// 	};
	
// }])
// .directive('dropdown', ['$document', '$compile', '$rootScope', function($document, $compile, $rootScope) {
// 	return {
// 		restrict: 'A',
// 		scope: {},
// 		controller: function($scope) {
// 			var scope = this;
// 			this.isVisible = false; 
// 			this.toggle = function (e) {
// 				scope.isVisible = !scope.isVisible;
// 				if (scope.dropdownMenu) {
// 					var parentElem = scope.dropdownMenu.parent();
// 					var display = scope.isVisible ? 'block' : 'none';
// 					scope.dropdownMenu.css({'left': parentElem.width() - scope.dropdownMenu.width(), 'top': parentElem.height(), 'position': 'absolute', 'display': display});
// 				}
				
// 				if (scope.isVisible) {
// 					$document.on('mouseup', hideDropdownMenu);
// 				}
// 			}
			
// 			function hideDropdownMenu() {
// 				scope.isVisible = false;
// 				scope.dropdownMenu.css('display', 'none');
// 				$document.off('mouseup', hideDropdownMenu);
// 			}			
// 		},
// 		link: function(scope, elem, attrs, ctrl) {
// 			ctrl.element = elem;
// 			elem.on('click', ctrl.toggle);
// 		}
// 	};
// }])
// .directive('dropdownMenu', ['$timeout', function($timeout) {
// 	return {
// 		restrict: 'A',
// 		require: '^dropdown',
// 		link: function(scope, elem, attrs, ctrl) {
// 			elem.css('display', 'none');
// 			ctrl.dropdownMenu = elem;
// 		}
// 	};
// }])
// .directive('avatar', function() {
// 	function hashCode(src) {
// 		return src.charCodeAt(0) + src.charCodeAt(src.length-1);
// 	}
	
// 	var colors = ['green', 'red', 'orange', 'purple', 'cyan', 'blue', 'yellow'];
	
// 	return {
// 		restrict: 'EA',
// 		template: '<span class="user-photo">{{getDisplayName() | shortName}}</span>',
// 		replace: true,
// 		scope: {
// 			user: '='
// 		},
// 		link: function(scope, elem, attrs) {
// 			scope.getDisplayName = function() {
// 				if (scope.user) {
// 					return scope.user.photo? '' : scope.user.userName;
// 				} else {
// 					return '';
// 				}
// 			};
			
// 			scope.$watch('user', function(newValue, oldValue) {
// 				var user = newValue || {userName: ''};
				
// 				attrs.$removeClass(colors.join(' ') + ' no-photo');
				
// 				if (user.type === 'dept') {
// 					attrs.$addClass('group');
// 				} else {
// 					attrs.$removeClass('group');
// 				}
				
// 				if (user.photo) {
// 					elem.css({'background-image':'url(' + user.photo + ')'});
// 				} else {
// 					attrs.$addClass('no-photo');
					
// 					if (user.userId) {
// 						var index = Math.abs(hashCode(user.userId)) % colors.length;
// 						attrs.$addClass(colors[index]);
// 					}
// 				}
// 			});
// 		}
// 	}
// })
// .directive('documentIcon', function() {
	
// 	return {
// 		restrict: 'EA',
// 		template: '<i ng-class="docIcon">\
// 			<span class="path1"></span>\
// 			<span class="path2"></span>\
// 			<span class="path3"></span>\
// 			<span class="path4"></span>\
// 			<span class="path5"></span>\
// 			<span class="path6"></span>\
// 			<span class="path7"></span>\
// 			<span class="path8"></span>\
// 			<span class="path9"></span>\
// 			<span path10"></span>\
// 			<span class="path11"></span>\
// 			</i>',
// 		scope: {
// 			docName: '=name'
// 		},
// 		link: function(scope, elem, attrs) {
// 			scope.$watch('docName', function(newValue, oldValue) {
				
				
// 				var className = 'icon_document';
				
// 				if (scope.docName) {
// 					var dotIdx = scope.docName.lastIndexOf('.');
// 					var ext = scope.docName.substring(dotIdx+1, dotIdx+4).toLowerCase();
					
// 					switch(ext) {
// 					case 'doc':
// 					case 'ppt':
// 					case 'xls':
// 					case 'hwp':
// 					case 'pdf':
// 					case 'txt':
// 						className = 'icon_' + ext;
// 						break;
						
// 					case 'zip':
// 					case 'rar':
// 					case 'tar':
// 					case 'gz':
// 					case '7z':
// 					case 'alz':
// 						className = 'icon_compressed';
// 						break;
						
// 					case 'bmp':
// 					case 'jpg':
// 					case 'jpe':
// 					case 'png':
// 					case 'gif':
// 					case 'tif':
// 					case 'svg':
// 						className = 'icon_image';
// 						break;
						
// 					case 'avi':
// 					case 'wmv':
// 					case 'mpg':
// 					case 'mpe':
// 					case 'mp2':
// 					case 'mp4':
// 					case 'flv':
// 					case 'mkv':
// 					case 'mov':
// 					case 'ogg':
// 						className = 'icon_video';
// 						break;
						
// 					default:
// 						className = 'icon_document';
// 						break;
// 					}
// 				}
				
// 				scope.docIcon = className;				
// 			});
// 		}
// 	}
// })
// .filter('capitalize', function() {
// 	return function(input, type) {
// 		if (input) {
// 			if (type === 'user' && input.match(/[a-zA-Z]/)) {
// 				var idx = input.lastIndexOf(" ");
// 				if (idx >= 0) {
// 					return input.substr(idx+1,1).toUpperCase();
// 				}
// 			}
			
// 			return input.substr(0,1).toUpperCase();
// 		}
// 	};
// })
// .filter('shortName', function() {
// 	return function(name) {
// 		if (name) {
// 			if (name.match(/[a-zA-Z]/)) {
// 				var idx = name.lastIndexOf(" ");
// 				if (idx > -1) {
// 					return name.substring(0, 1) + name.substring(idx +1, idx +2);
// 				} else {
// 					return name.substring(0, 2);
// 				}
// 			} else {
// 				if (name.length < 3) {
// 					return name.substring(0, 1);
// 				} else if (name.length == 3) {
// 					return name.substring(1, 3);
// 				} else if (name.length == 4) {
// 					return name.substring(2, 4);
// 				} else {
// 					return name.substring(0, 2);
// 				}
// 			}
// 		}
		
// 		return "";
// 	}
// });
import React, { Component, Fragment } from 'react';