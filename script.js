(function(){
angular.module('jsonGenerator', [])
.controller('myController', function(fileService){

    var vm = this;
    
    vm.generatedJson = {
        title: "Sample title",
        rows: []
    };
    vm.fileName = null;
    vm.selectedRowIndex = null;
    vm.addKey = addKey;
    vm.saveFile = saveFile;
    vm.loadFile = loadFile;
    vm.checkValue = checkValue;
    vm.resetJson = resetJson;
    vm.editTitle = editTitle;
    vm.deleteRow = deleteRow;

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
        var name = vm.fileName || "file";
        name = prompt("Enter name of file: ", name);
        if(!!name) {
            fileService.loadFile(name)
                .then(function(data) {
                    vm.generatedJson = data;
                    vm.fileName = name;
                }, function() {});
        }
    }
    
    function resetJson() {
        vm.generatedJson = {
            title: "Sample title",
            rows: []
        };
    }

    function deleteRow(index) {
        if(confirm("Do you really want to delete the selected row? The row number is " + (index + 1) + ".")) {
            vm.generatedJson.rows.splice(vm.selectedRowIndex, 1);
        }
        vm.selectedRowIndex = null;

    }
    
    function saveFile(name) {
        if(!!vm.fileName) name = vm.fileName;
        // if user changes name in prompt, save it
        var returnedName = fileService.saveFile(name, vm.generatedJson);
        // avoid overwriting name with empty/null value
        if(!!returnedName) vm.fileName = returnedName;

    }
})
.service('fileService', function($http, $filter){
    this.loadFile = function(name){
        if(name.slice(-5) !== ".json") {
            name = name + ".json";
        }
        return $http.get(name)
            .then(function(response) {
                // set title of window
                document.title = name + " - jsonGenerator";
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
            // set title of window
            document.title = fileName + " - jsonGenerator";
            // return full fileName
            return fileName;
        }
        // if fileName is invalid, return nothing
        return null;
    }
});
})();
