(function(){
angular.module('jsonGenerator', [])
.controller('myController', function(fileService){

    var vm = this;
    
    vm.generatedJson = {
        title: "Sample title",
        rows: []
    };
    vm.addKey = addKey;
    vm.saveFile = function(name){ fileService.saveFile(name, vm.generatedJson); };
    vm.loadFile = loadFile;
    vm.checkValue = checkValue;
    vm.resetJson = resetJson;
    vm.editTitle = editTitle;

    function addKey(key, value) {
        vm.generatedJson.rows.push({
            key: key,
            value: value
        });
        vm.key=null;
        vm.value=null;
    }
    
    function checkValue(key) {
        if(!!vm.generatedJson) {
            var returnedArray = vm.generatedJson.rows.filter(function(element) { return element.key === key; });
            if(returnedArray.length) vm.value = returnedArray[0].value;
        }
    }
    
    function editTitle() {
        var title = prompt("Enter title: ", vm.generatedJson.title);
        if(!!title) vm.generatedJson.title = title;
    }

    function loadFile() {
        var name = "file";
        name = prompt("Enter name of file: ", name);
        if(!!name) {
            fileService.loadFile(name)
                .then(function(data) {
                    vm.generatedJson = data;
                }, function() {});
        }
    }
    
    function resetJson() {
        vm.generatedJson = {
            title: "Sample title",
            rows: []
        };
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
        if(!!fileName) {
            if(fileName.slice(-5) !== ".json") {
                fileName = fileName + ".json";
            }
            var file = new File([$filter('json')(input, 4)], fileName, {type: "application/json;charset=utf-8"});
            saveAs(file);
        }
    }
});
})();
