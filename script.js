(function(){
angular.module('jsonGenerator', [])
.controller('myController', function($filter, fileService){

    var vm = this;
    
    vm.generatedJson = {
        title: "Sample title"
    };
    vm.addKey = addKey;
    vm.saveFile = fileService.saveFile;
    vm.loadFile = loadFile;

    function addKey(key, value) {
        vm.generatedJson[key] = value;
        vm.key=null;
        vm.value=null;
    }

    function loadFile() {
        var name = "file";
        file = prompt("Enter name of file: ", name);
        fileService.loadFile(name)
            .then(function(data) {
                vm.generatedJson = data;
            }, function() {});
    }
})
.service('fileService', function($http){
    this.loadFile = function(name){
        if(name.slice(-5) !== ".json") {
            name = name + ".json";
        }
        return $http.get(name)
            .then(function(response) {
                return response.data;
            }, function() {});
    }

    this.saveFile = function(name) {
        var fileName = name;
        fileName = prompt("Enter file name:", fileName);
        if(!!fileName) {
            var file = new File([$filter('json')(vm.generatedJson, 4)], fileName, {type: "application/json;charset=utf-8"});
            saveAs(file);
        }
    }
});
})();
