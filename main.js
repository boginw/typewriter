var string = "";
var counter = 0;
var input = document.getElementById('text');
var newQuote;
var ordatak = string;
var reference = string;
var skrivad;
var ordatok;
var quotes = false;
var w = new Stopwatch(); 
window.onload = function(){
  var text_input = document.getElementById ('text');
  text_input.focus ();
  text_input.select ();
}
$('#ordatak').flowtype({
 fontRatio : 10,
 lineRatio : 1.45
});

function getWPM(time)
{
	text = reference.join("");
	words = text.replace(/(^\s*)|(\s*$)/gi,"");
	words = words.replace(/[ ]{2,}/gi," ");
	words = words.replace(/\n /,"\n");
	words = words.split(' ').length;
	return Math.round((words / (time/60))*1000);
}




function keyFunk(){
	skrivad = document.getElementById("text").value.split("");
	longdin = parseInt(skrivad.length);
	if(longdin == 1){
		w.reset();
		w.start();
	}
	//console.log("skrivad length: "+skrivad.length + "; reference.length:" + reference.length + "; curr skrivad: "+skrivad[longdin -1]+" : "+reference[longdin -1]);
	ordatak[longdin] = "<strong class='selected'>"+reference[longdin]+"</strong>";
	
	if(skrivad[longdin -1] == reference[longdin -1])
	{
		ordatak[longdin -1] = "<strong class='right'>"+reference[longdin -1]+"</strong>";
		console.log('true');
	}else if(skrivad[longdin -1] != reference[longdin -1])
	{
		ordatak[longdin -1] = "<strong class='wrong'>"+reference[longdin -1]+"</strong>"
		console.log('false');
	}
	if(longdin ==reference.length){
		w.stop(); 
		document.getElementById('wpm').innerHTML = getWPM(w.stopTime - w.startTime) + " WPM";
		newOrdatak();
	}
	if(skrivad[longdin+1] != reference[longdin+1])
	{
		ordatak[longdin +1] = reference[longdin +1];
		console.log('maybe');
	}
	document.getElementById('ordatak').innerHTML = ordatak.join("");
	//document.getElementById('written').innerHTML = skrivad.join("");
	counter += 1;
}
function newOrdatak(){
	if(quotes){
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "http://www.iheartquotes.com/api/v1/random?format=json&max_characters=60", true);
		xhr.onreadystatechange = function() {
		  if (xhr.readyState == 4) {
			window.newQuote = xhr.responseText;
			window.newQuote = JSON.parse(newQuote);
			window.newQuote = newQuote.quote;
			window.ordatak = window.newQuote;
			reference = ordatak.split("");
			ordatak   = ordatak.split("");
			document.getElementById("text").value = "";
			document.getElementById('ordatak').innerHTML = ordatak.join("");
		  }
		}
		xhr.send();  
		
		
	}else{
			ordatak   = ordatok[Math.floor(Math.random() * ordatok.length)]; 
			reference = ordatak.split("");
			ordatak   = ordatak.split("");
			document.getElementById("text").value = "";
			document.getElementById('ordatak').innerHTML = ordatak.join("");
		}
}

document.addEventListener('onfocus', function(e) {
	document.getElementById ('text').value = document.getElementById ('text').value;
}, false);

document.addEventListener('keyup', function(e) {
	keyFunk();
	
}, false);
document.addEventListener('keydown', function(e) {
	
	if(e.keyCode == 13 && !w.started){
		console.log('do stuff');
	}else
	{
		keyFunk();
	}
}, false);


document.addEventListener('click', function(e) {
	switch(e.toElement.className)
	{
		case "settings":
			if(quotes)
			{
				quotes = false;
				w.stop(); 
				newOrdatak();
				
			}else
			{
				quotes = true;
				w.stop(); 
				newOrdatak();
			}
			break;
		case "next":
			newOrdatak();
			break;
		default:
			console.log(e.target.className);
			break;
	}
}, false);




 /* Array.prototype.removeItem = function(a) {
	for (i = 0; i < this.length; i++) {
		if (this[i] == a) {
			for (i2 = i; i2 < this.length - 1; i2++) {
				this[i2] = this[i2 + 1];
			}
			this.length = this.length - 1
			return;
		}
	}
}
*/
Array.prototype.compare = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0; i < this.length; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].compare(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}
function looper() {
	setTimeout(looper, 1);
}


$.get('assets/ordatok.txt', function (list) {
	window.ordatok = list;
	window.ordatok = window.ordatok.split(/[\n]/);
	looper();
	newOrdatak();
});



