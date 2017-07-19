(function(){
angular.module('jsonGenerator', [])
.controller('myController', function($filter){

    var vm = this;
    
    vm.generatedJson = {
        title: "Sample title"
    };
    vm.addKey = addKey;
    vm.saveFile = saveFile;

    function addKey(key, value) {
        vm.generatedJson[key] = value;
        vm.key=null;
        vm.value=null;
    }

    function saveFile(name) {
        var fileName = name;
        fileName = prompt("Enter file name:", fileName);
        if(!!fileName) {
            var file = new File([$filter('json')(vm.generatedJson, 4)], fileName, {type: "application/json;charset=utf-8"});
            saveAs(file);
        }
    }
});
})();
