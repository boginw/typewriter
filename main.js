var string = "";
var counter = 0;
var input = document.getElementById('text');

var ordatak = string;
var reference = string;
var skrivad;
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
	/* var xhr = new XMLHttpRequest();
	xhr.open("GET", "/ordatok.txt", true);
	xhr.onreadystatechange = function() {
	  if (xhr.readyState == 4) {
		ordatok = xhr.responseText.split("\n");
	  }
	}
	xhr.send();  */
	
	ordatak   = ordatok[Math.floor(Math.random() * ordatok.length)]; 
	reference = ordatak.split("");
	ordatak   = ordatak.split("");
	document.getElementById("text").value = "";
	document.getElementById('ordatak').innerHTML = ordatak.join("");
}

document.addEventListener('onfocus', function(e) {
	document.getElementById ('text').value = document.getElementById ('text').value;
}, false);

document.addEventListener('keyup', function(e) {
	keyFunk();
	
}, false);
document.addEventListener('keydown', function(e) {
	keyFunk();
	
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








var ordatok = ['Alinin er av og sponnin eftir.',
'Allir draga sín bát væl omaneftir.',
'Allur bati bøtir.',
'Alt er hinum svanga søtt.',
'Alt sodnar í sveins maga.',
'Altíð bagir illum barni okkurt.',
'Amari kemur aftan á sparara.',
'Ársgrøði er ársføði.',
'Ást fjalir lýti.',
'Átari goymir sær eftirbita.',
'Barnamóðir vil bæði eta og heim bera.',
'Bert er bróðurleyst bak.',
'Best er at binda um heilan fingur.',
'Best er heim at aka, meðan vagnurin er heilur.',
'Betri er at flýggja enn at falla.',
'Betri er at vera góðs mans frilla enn gift illa.',
'Betri er at verja borg enn at herja borg.',
'Betri er bøtandi hond enn spillandi tunga.',
'Betri er ill hurð fyri gátt enn eingin.',
'Betri er ill hurð fyri smáttuni enn eingin.',
'Betri er sjálvur at eiga enn bróður at biðja.',
'Betri er sund millum vinir og fjørður millum brøður.',
'Betri eru smáir fiskar enn tómir diskar.',
'Betri lítið leivt, enn ovmikið etið.',
'Blindar eru ókunnar gøtur.',
'Blindur er bókleysur maður.',
'Bráð er barna lund.',
'Brent barn ræðist eld.',
'Bundin er barnamóðir.',
'Bundin er bátleysur maður.',
'Bøndur skulu bóndum bjóða.',
'Deyður ert tú høvuðleysur.',
'Djúpt má hann níga, ið kyssa skal hønureyvina.',
'Drúgt er tað, ið drýpur.',
'Dugandi maður veit sær altíð vákn.',
'Dúglig móðir elur lata dóttur.',
'Eftir látur kemur grátur.',
'Eina ferð lúgvast kúgv í mýri.',
'Einar eru seinar hendur.',
'Eingin biskupur er ovlærdur og eingin skúladrongur ovbardur.',
'Eingin fer so við eikini, at hon ikki flýtur.',
'Eingin fer so við trænum, at tað ikki flýtur.',
'Eingin kann allar dyr at goyma.',
'Eingin kann allar gáttir røkja.',
'Eingin kennir mannin longri enn at tonnunum.',
'Eingin kennir mein í annans bein.',
'Eingin kvøður betur, enn hann kann.',
'Eingin metir einbýli við tað, tað er vert.',
'Eingin setur inn á einum streymtanga.',
'Eingin skal kanna sær bitan, fyrr enn hann er svølgdur.',
'Eingin toyggir seg longri, enn armarnir røkka.',
'Eingin veit av søtum at siga, fyrr enn hann á beiskum bítur.',
'Eingin veit á morgni at siga, hvar hann á kvøldi gistir.',
'Eingin veit, hvar feigur flakkar.',
'Einki er so balt, at tað verður ikki eina ferð alt.',
'Einki er so ringt, at tað ikki er gott fyri okkurt.',
'Eitil er í øllum feitum.',
'Eitt brákar, annað brýtur.',
'Eitt eyga er skjótt at bregða.',
'Eitt fór í horn, annað í sorn.',
'Eitt løstar, og annað brýtur.',
'Eitt lúgvar, annað brýtur.',
'Eitt toyggir, annað slítur og triðja brýtur.',
'Endurgerð og viðurgerð eru longstir vinir.',
'Eyðkendur er úlvur í roði.',
'Eydnan hjálpir tí reysta.',
'Eygað er betri enn ársgerðin.',
'Eymur er maður, ið agn sparir.',
'Fara upp á tjólegg og detta niður á langlegg.',
'Fátt er betri enn á orði havt.',
'Fátt er sum faðir, einki sum móðir.',
'Fátt man feigum forða.',
'Fáur kann eitt barn at eiga.',
'Fáur leikar so í sjey ár sum í sjey dagar.',
'Fáur vurðar einbýli tað, ið tað er vert.',
'Feigdin dregur mannin.',
'Fingin er fest kona.',
'Fjálgur er móður andi.',
'Fót setur eingin fyri annan, uttan fallkomin er sjálvur.',
'Frá høvdinum skalt tú hvalin skera, og frá kjølinum skalt tú bátin gera.',
'Fram kemur hann, ið hóvliga fer.',
'Fremmandur fuglur verður altíð happaður.',
'Frítt er Eystfelli frá at fara.',
'Frótt er høvur á fullum maga.',
'Fult er, áðrenn yvir flýtur.',
'Fyrr brestur enn bognar.',
'Fyrr er fult, enn yvir flýtur.',
'Fyrr trýtur lív enn leistar.',
'Fyrr trýtur streymur í á, enn kvinnu trótar ráð.',
'Galnir hundar fáa rivið skinn.',
'Gamal ravnur er ikki góður at narra.',
'Gamal ravnur er illur at narra.',
'Ger skálkinum gott, hann lønir tær aftur við háð og spott.',
'Gjørd gerð fær onga vend.',
'Gløgt er gestsins eyga.',
'Gott er at rista breiðar álir av annans mans húð.',
'Gott er at verja borg, so leingi eingin søkir.',
'Gott er mettum manni at bjóða.',
'Gott er óføddum at bæsa.',
'Góðar eru fátækra náðir.',
'Góðar gløður eftir góðan eld.',
'Góður er gamal í ráðum.',
'Góðvarin maður kemur seinastur í himmiríki.',
'Grør um gangandi fót, heima situr svøltandi kráka.',
'Gullið ger lítið uttan glitrar, matin vil eingin missa.',
'Gætt er um eitt eyga.',
'Hann doyr ikki, ið dýrt keypir.',
'Hann eigur ferðina, ið fyri ríður.',
'Hann eigur reiðina, ið fyri ríður.',
'Hann er ikki óður, ið ilt ræðist.',
'Hann er ikki ræddur, ið ilt ræðist.',
'Hann er ikki so haltur, sum hann hinkar.',
'Hann er ikki so ræddur sum illa klæddur.',
'Hann fær byr, ið bíðar, og havn, ið rør.',
'Hann fellur, ið feigur er.',
'Hann fiskar, ið heim rør.',
'Hann grætur ikki eftir gulli, ið ikki hevur sæð tað.',
'Hann missir ikki, ið fyrst fær.',
'Hann tekur at sær, ið sekaður er.',
'Hann verður ikki fiskaður við ongum agni.',
'Hann, á morgni rýtur, á kvøldi drítur.',
'Hann, ið einki vágar, hann einki vinnur.',
'Hann, ið er sekur, inn at sær tekur.',
'Hann, ið fer reinur til vás, fer ofta skitin til stás.',
'Hann, ið fer uppskrýddur í flór, fer onkuntíð skitin í kór.',
'Hann, ið nógvum skal bjóða, má hava mikið at sjóða.',
'Hann, sum býr millum úlvar, má ýla við teimum.',
'Hansara kvørn melur ikki altíð hveiti.',
'Har sum ein skriðan er lopin, er onnur væntandi.',
'Har sum tú ert ikki sjálvur, ert tú ikki meiri enn hálvur.',
'Har var hond happi hollari.',
'Hatta er ikki hveiti á hansara kvørn.',
'Heilt er nýtt sár.',
'Heima alin er burtur galin.',
'Her er sama tógvið á snælduni.',
'Hin ríki traðkar skógvarnar á hol, men hin fátæki kagar teir á hol.',
'Hundar reka annans ørindi.',
'Hundur veit húsbóndans vilja.',
'Hundurin er sum húsbóndin.',
'Hvat skal heiðin hundur á kirkjugrund?',
'Hvat skal hveiti í hunds búk?',
'Hvønndagsskrúðir eru ikki hátíðisprúðar.',
'Hvør er sínum knúti kunnigastur.',
'Hvør fuglur letur við sínum nevi.',
'Hvør kelling livir til jóla.',
'Hvør rakar brandin at sínari køku.',
'Høgt er heimakeyp.',
'Høgt kall gevur høgt fall.',
'Ikki eigur at smíða nøgluna fyrr enn bátin.',
'Ikki er alt gull, ið glitrar.',
'Ikki er gott at stjala, har tjóvur er húsbóndi.',
'Ikki er hundur ovbardur.',
'Ikki fiskast við ongum agni.',
'Ikki kemur í kór tað, ið sjálvt vil fara í flór.',
'Ikki taka bátin eftir støvnunum ella píkuna eftir hárinum.',
'Ikki tekst kúgv av kúleysum manni.',
'Illur brandur liggur longst á eldinum.',
'Ilt er at binda hund við smørleyp.',
'Ilt er at byggja borð fyri báru.',
'Ilt er at læra gamlan hund uppi at sita.',
'Ilt er at skilja latan drong úr heitari song.',
'Ilt er at vera bæði fátækur og tykkin.',
'Ilt er barndømi at kasta.',
'Ilt er kynið í kettu, og so er alt slagið úteftir.',
'Ilt er svart skinn hvítt at tváa.',
'Ilt nýtst av bráðræsi.',
'Ilt nýtst av illum.',
'Jú fleiri hundar, jú tynri soðið.',
'Kallur er tí kollutur, at hann er ofta hárroyttur.',
'Kemur fyrst ein danskur maður í stovuna, koma væl fleiri eftir.',
'Knívleysur maður er lívleysur.',
'Kráka flýgur best einsamøll.',
'Kráku tykir best um unga sín.',
'Kúrur kemur eftir kæti og tramin eftir marglæti.',
'Køld eru konuráð.',
'Latur er hann, ið lognina lastar.',
'Lágt má hann lúta, ið høsnareyv skal kyssa.',
'Lágt skal hann lúta, ið hundsrassin skal kyssa.',
'Lán skal koma læandi aftur.',
'Legg lítt til lítt og ger tað títt, so verður tað mikið.',
'Leingi skal góðum kannast.',
'Leingi stendur mansevni til bata.',
'Leti ger einki uttan last.',
'Leys er kúgv á annans bási.',
'Lítið batar at breiða reint lak á skitna song.',
'Lítið hjálpa góð orð við slættibøku.',
'Lítið krevur til, at kellingarnev bløðir.',
'Lítil byrði er um langan veg tung.',
'Lítil er barnsins uggi.',
'Lítil neisti kann birta stóran eld.',
'Livandi maður er góður at vænta.',
'Lóðrið fylgir fóðri.    ',
'Maður eigur at verða føddur og ikki gøddur.',
'Maður er ikki fjarskotnari frá góðum enn ravnur.',
'Maður er mans gaman.',
'Maður kemur í mans stað.',
'Mangir løkir smáir gera stórar áir.',
'Mangt er dagsins eyga.',
'Mangt er dugandi manni til vápn.',
'Mangt er í neyðini nýtt, sum ikki er í armóðini gitið.',
'Mangt man feigum granda.',
'Mangur dansar og dansar av neyð.',
'Mangur er á orði, ið ikki er á borði.',
'Mangur er deyðs mans arvingi og ikki er deyðs mans bróðir.',
'Mangur er málvinur, sum ikki er alvinur.',
'Mangur fær tað, ið øðrum er ætlað, men eingin fær tað, ið øðrum er lagað.',
'Mangur fæst við boga, ið er ikki mentur upp at toga.',
'Mangur hevur valið og tekur skalið.',
'Mangur sigur frá Ólavi kongi og hevur ikki sæð hann.',
'Mangur slítur silki av armóð.',
'Maturin er undir manningini.',
'Meðan tað ringa er, tá bryggjast tað góða.',
'Meira er um skjól enn um skart.',
'Menniskjan kann spáa, Gud man ráða.',
'Mikið má um miklar menn.',
'Mong er geitin aðrari lík.',
'Nakað er betri enn einki.',
'Neyð er ikki nógv breyð.',
'Neyð ger nasadjarvan.',
'Neyð lærir nakna kvinnu at spinna.',
'Neyðin drívur vargin av skóginum.',
'Nógv fyri at hoyra lús hosta og loppu goyggja.',
'Nú er alinin av og sponnin eftir.',
'Ofta býr fals undir fríðum skinni.',
'Ofta býr flagd undir fríðum skinni.',
'Ofta eigur svørt ær hvítt lamb.',
'Ofta er ljótur dreymur fyri lítlum.',
'Ofta etur hundur tað, hann havnar, og ketta tað, hon spýr.',
'Ofta kemur fjól í bóndans stól og bikkja í bóndans sæti.',
'Ofta lýtst happ av hundi.',
'Ofta mælir muður, og fylgir ikki eftir hugur.',
'Ofta nýtst ilt av bræði.',
'Ofta skríður knørrur móti forboð.',
'Ofta taka trøll góða manna børn.',
'Okkurt fær dugandi maður til vápn.',
'Ódrúgvur er posamatur.',
'Ólukkan kemur sjáldan einsumøll.',
'Purkan droymir um dravið og kellingin um stavin.',
'Ravnur drepur ikki, har hann byggir.',
'Ravnur er feitastur rakár.',
'Rignir á prestin, dryppar á deknin.   ',
'Ring er tann kvørn, ið mjølið ikki veksur á.',
'Ríkir bøndur oksar keypa, mangt má feitt um fátækan leypa.',
'Rotið er snart brotið.',
'Rødd er hond í annans fati.',
'Samt er tógvið á snælduni.',
'Sannleikin er illa lýddur.',
'Sárt bítur sekan.',
'Sárt bítur soltin lús.',
'Seigar eru gamlar sinar.',
'Seigur er gamal siður.',
'Seinar eru einar hendur.',
'Sekur at sær tekur.',
'Sit vini tínum nær, men sit ikki av hans lær.',
'Sjáldan batnar moyggj, ið heiman fer.',
'Sjáldan er berskakin bestur.',
'Sjáldan er ein báran støk.',
'Sjáldan er síðari betri.',
'Sjáldan er trællur í treytum góður.',
'Sjáldan gongur roykur av brandi, og ikki eldur er í honum.',
'Sjáldan hevur góður kvistur sprottið av illum runni.',
'Sjáldan kemur dúvuungi úr ravnseggi.',
'Sjáldan kemur eitt óløgi einsamalt.',
'Sjáldan kemur fluga í feiga manna fat.',
'Sjáldan rýkur av ongum brandi.',
'Sjáldan sita heimakonur javnar.',
'Sjáldan verður forvitin fegin.',
'Sjálvgjørt er væl gjørt.',
'Skaði ger mannin klókan, men ikki ríkan.',
'Skeri eg teg her, so missi eg teg har.',
'Skjótari bera tveir fuglar í reiður enn ein.',
'Skjótt bløðir kellingarnøs.',
'Skjótt er at tippa einar hendur.',
'Skjótt er óføddum at bæsa.',
'Skjótt er skitið verk.',
'Slíkt kann vattarbakið vera sum skølingurin. ',
'Smáir fuglar verpa smá egg.',
'Snakidagar koma eftir bakidagar.',
'So argast hvør, sum hann eldist.',
'So látast bátar sum skip.',
'So mangt er tykki sum maðurin.',
'So mætur fuglur er veiddur sum kráka.',
'Spottið kemur í spottarans hús og brennir spottaran inni.',
'Sprongd er ikki gongd.',
'Stevning fellir ongan mann.',
'Sum byttan so lokið.',
'Sum maður røkir knívin, so røkir hann vívið. ',
'Sum tú reiðir, skalt tú liggja.',
'Svartur verður hann, sum við bik fæst.',
'Sær er hond hollast.',
'Sær er siður á landi.',
'Søtt tykist tí svanga.',
'Søtur er sjálvgivin biti.',
'Tað bata eingi føgur orð við slættibøku.',
'Tað bata so lítið føgur orð við brugdu.',
'Tað blíðkar fyri hugaðum monnum.',
'Tað er átari, ið ger mun á eggi.',
'Tað er betri at spara á kjaftinum enn á botninum.',
'Tað er eisini eitil í válgara.',
'Tað er gott at hava tógva sveinar, tá ið annar er úti, er annar heima.',
'Tað er ikki altíð, matbruður stendur opin.',
'Tað er ikki hvør dagur bakudagur.',
'Tað er ikki hvørt orð, tú skalt svara til, og ikki hvørt gildi, tú skalt fara til.',
'Tað er ikki oftari enn so, at Páll fær røtur.',
'Tað er ikki svínum líkt, ið er sínum líkt.',
'Tað er mangur leikur í longum talvi.',
'Tað er mætari fuglur veiddur enn kráka.',
'Tað er ringur fuglur, ið drítur í egið reiður.',
'Tað er tvætt í hvørjari ætt.',
'Tað er vamm á hvørjum góðgripi.',
'Tað grør ikki undir tí steini, sum altíð verður rassaður.',
'Tað hanga ikki allir lyklar við eitt konubelti.',
'Tað lívir ikki meira enn Ísland lívir Føroyum.',
'Tað livir longst, ið øllum er leiðast.',
'Tað skal meira til hestin enn bokslið.',
'Tað skjýtst ikki alt, ið upp rennur.',
'Tað verður ikki alt fleytir, ið tyril kemur í.',
'Tað, ið illa er yrkt, verður illa kvøðið.',
'Tað, ið ungur nemur, hann gamal fremur.',
'Tað, sum eygað ikki sær og oyrað ikki hoyrir, tað virkir ikki hjartað.',
'Tað, sum heima er alið, er burtur galið.',
'Tann sum tíðum rør út, hann fiskar umsíðir.',
'Tann, ið Gud vil fløva, batar ongum at køva.',
'Tann, sum er úti stongdur, er inni gloymdur.',
'Tann, sum fær barnið, fær skarnið.',
'Tann, sum ikki etur seg mettan, sleikir seg ikki mettan.',
'Tá ið armur kropnast, tá muður opnast.',
'Tá ið maður ger, sum hann vil, ger hann, sum hann er til.',
'Tá ið ravnurin legst í fjøruna, veit hann sær lítið.',
'Tá ið tann skitni ber vitni, er illa vorðið.',
'Tá ið tvey ynnast, tey væl finnast.',
'Tá ið vesalamaður fær vald, kann hann sær ikki afturhald.',
'Tá ið ølið fer inn, fer vitið út.',
'Tá veit hin svarti sær lítið, tá ið hann legst í fjøruna.',
'Teir byggja land, ið liva.',
'Tey mugu gjalda, sum ikki valda.',
'Tí er ikki sætið rótt, at komin er á banasótt.',
'Tí er kallur kollutur, tí hann er ofta hárruskaður.',
'Tíðliga skal krøkjast, ið góður krókur skal verða.',
'Tiga skal millum tveggja vina.',
'Tjóvur trýr, at hvør maður stjelur.',
'Tolin trívst og treiskin vinnur.',
'Tráður lívir trevli.',
'Trøllabørnini gráta eftir hvonnum á jólum.',
'Tung er takkarleys gerð.',
'Tungt er at hoyra lús hosta og loppu goyggja.',
'Tungt er gamla manna fall.',
'Tungur er tigandi róður.',
'Tunn eru móður oyra.',
'Turvin býður mangt.',
'Tveir harðir steinar mala ikki væl.',
'Tvey eru eyguni og triði er muðurin.',
'Tyngst slitin er søtasti bitin.',
'Tøgn kemur ikki á ting.',
'Umsíðir lúgvast kúgv í mýri.',
'Ungur nemur, gamal fremur.',
'Út kemur innispunnið lín.',
'Út kemur innispunnið tógv. ',
'Vamm er í hvørjum góðgripi.',
'Vandi er í hvørjari vælferð.',
'Vani bítur best.',
'Vatn kemur aftur, har vatn hevur verið.',
'Vágan vinnur, og vágan tapir.',
'Vágin vinnur.',
'Vágur millum vinir og fjørður millum frændur.',
'Vánt er at sova hjá sprundi.',
'Veðrið blíðkar fyri hugaðum monnum.',
'Verstur brandur liggur longst á eldi.',
'Vinur er hann, ið vomm sær.',
'Vís mær at garði, og eg skal siga tær, hvør inni býr.',
'Vís mær mannin og ikki matkeraldið.',
'Ymiskt er mansins tykki.',
'Ymiss er mansins eydna.',
'Øl er annar maður.',
'Øllum er ovboðið.'];








looper();
newOrdatak();