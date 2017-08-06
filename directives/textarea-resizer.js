/* Resizes text fields as the user types */
angular.module('jsonGenerator')
.directive('autoResize', function() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            var iElement = element[0];
            iElement.setAttribute('style', 'height:' + (iElement.scrollHeight) + 'px;overflow-y:hidden;');
            element.on('input', function() {
                iElement.style.height = 'auto';
                iElement.style.height = iElement.scrollHeight + 'px';
            })
        }
    }
});
