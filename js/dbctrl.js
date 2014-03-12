var rounds = [];
var idbSupported = false;
var db;
 
if("indexedDB" in window) {
	idbSupported = true;
}

if(idbSupported) {
	var openRequest = indexedDB.open("typeWriter",1);

	openRequest.onupgradeneeded = function(e) {
		console.log("running onupgradeneeded");
		var thisDB = e.target.result;

		if(!thisDB.objectStoreNames.contains("wpmRounds")) {
			thisDB.createObjectStore("wpmRounds", {autoIncrement:true});
		}

	}

	openRequest.onsuccess = function(e) {
		console.log("Success!");
		db = e.target.result;
	}

	openRequest.onerror = function(e) {
		console.log("Error");
		console.dir(e);
	}

}
 
function addWPM(wpm,percentage,points,e) {
    var transaction = db.transaction(["wpmRounds"],"readwrite");
    var store = transaction.objectStore("wpmRounds");
 
    //Define a person
    var wpm = {
        wpm:wpm,
        percentage:percentage,
        points:points,
        created:new Date()
    }
 
    //Perform the add
    var request = store.add(wpm);
 
    request.onerror = function(e) {
        console.log("Error",e.target.error.name);
        //some type of error handler
    }
 
    request.onsuccess = function(e) {
        console.log("Added to DB");
    }
}
function getWPMs(callback,e) {
	window.rounds = [];
	var transaction = db.transaction(["wpmRounds"], "readonly");
	var objectStore = transaction.objectStore("wpmRounds");
	var cursor = objectStore.openCursor();
	cursor.onsuccess = function(e){
		var values = [];
		var res = e.target.result;
		if(res){
			values.push(res.value);
			res.continue();
			window.rounds.push(values);
		}
		callback();
	}
	cursor.onerror = function(e) {
        console.log("Error",e.target.error.name);
    }
	return;
}