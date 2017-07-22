(function(){
angular.module('jsonGenerator', [])
.controller('myController', function(fileService){

    var vm = this;
    
    vm.generatedJson = {
        Title: "Sample title"
    };
    vm.addKey = addKey;
    vm.saveFile = function(name){ fileService.saveFile(name, vm.generatedJson); };
    vm.loadFile = loadFile;

    function addKey(key, value) {
        vm.generatedJson[key] = value;
        vm.key=null;
        vm.value=null;
    }

    function loadFile() {
        var name = "file";
        name = prompt("Enter name of file: ", name);
        fileService.loadFile(name)
            .then(function(data) {
                vm.generatedJson = data;
            }, function() {});
    }
})
.service('fileService', function($http, $filter){
    this.loadFile = function(name){
        if(name.slice(-5) !== ".json") {
            name = name + ".json";
        }
        return $http.get(name)
            .then(function(response) {
                return response.data;
            }, function() {});
    }

    this.saveFile = function(name, input) {
        var fileName = name;
        fileName = prompt("Enter file name:", fileName);
        if(fileName.slice(-5) !== ".json") {
            fileName = fileName + ".json";
        }
        if(!!fileName) {
            var file = new File([$filter('json')(input, 4)], fileName, {type: "application/json;charset=utf-8"});
            saveAs(file);
        }
    }
});
})();
