// From: http://gsferreira.com/archive/2014/05/angularjs-smart-float-directive/

angular
    .module('strichliste.directives.smartFloat', [])
    .directive('smartFloat', function ($filter) {

        var FLOAT_REGEXP_1 = /^\$?\d+.(\d{3})*(\,\d*)$/; //Numbers like: 1.123,56
        var FLOAT_REGEXP_2 = /^\$?\d+,(\d{3})*(\.\d*)$/; //Numbers like: 1,123.56
        var FLOAT_REGEXP_3 = /^\$?\d+(\.\d*)?$/; //Numbers like: 1123.56
        var FLOAT_REGEXP_4 = /^\$?\d+(\,\d*)?$/; //Numbers like: 1123,56

        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {

                    if (FLOAT_REGEXP_1.test(viewValue)) {
                        ctrl.$setValidity('float', true);
                        return parseFloat(viewValue.replace('.', '').replace(',', '.'));
                    } else if (FLOAT_REGEXP_2.test(viewValue)) {
                        ctrl.$setValidity('float', true);
                        return parseFloat(viewValue.replace(',', ''));
                    } else if (FLOAT_REGEXP_3.test(viewValue)) {
                        ctrl.$setValidity('float', true);
                        return parseFloat(viewValue);
                    } else if (FLOAT_REGEXP_4.test(viewValue)) {
                        ctrl.$setValidity('float', true);
                        return parseFloat(viewValue.replace(',', '.'));
                    } else {
                        ctrl.$setValidity('float', false);
                        return undefined;
                    }
                });

                ctrl.$formatters.unshift(
                    function (modelValue) {
                        return $filter('number')(parseFloat(modelValue), 2);
                    }
                );
            }
        };
    });
