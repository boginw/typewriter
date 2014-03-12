var adTime = new Stopwatch();
function refreshAd(){
	$.get("http://lysingar.tokni.fo/sampleImage.php", function(response){
		data = JSON.parse(response);
		$('.reklama').html('<a href="'+data['href']+'" target="_blank" ><img src="data:image/x-icon;base64,'+data['imgData']+'" /></a>');
	});
	console.log('Advert refreshed');
}
if(true){
	adTime.onTick =function(){
		if(adTime.getElapsed()['seconds'] >= 50){
			adTime.setElapsed(0,0,0);
			adTime.start();
			refreshAd();
		}
	};
	refreshAd();
	adTime.start();
}