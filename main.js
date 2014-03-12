let string = "";
let counter = 0;
let input = document.getElementById("text");
let newQuote;
let ordatak = string;
let reference = string;
let skrivad;
let ordatok;
let pasted = false;
let quotes = false;
let sessionCount = 0;
let tempsessionCount = 0;
let stopped = true;
let w = new Stopwatch();

window.onload = function () {
  let text_input = document.getElementById("text");
  text_input.focus();
  text_input.select();
  $(".stats").animate({ width: "30%", display: "block", left: "0px" });
};

window.addEventListener("load", function () {
  let status = document.getElementById("status");

  function updateOnlineStatus(event) {
    let condition = navigator.onLine ? "online" : "offline";

    status.className = condition;
    status.innerHTML = condition.toUpperCase();
    console.log(condition);
    log.insertAdjacentHTML(
      "beforeend",
      "Event: " + event.type + "; Status: " + condition
    );
  }

  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);
});

function getWPM(time) {
  text = reference.join("");
  words = text.replace(/(^\s*)|(\s*$)/gi, "");
  words = words.replace(/[ ]{2,}/gi, " ");
  words = words.replace(/\n /, "\n");
  words = words.split(" ").length;
  return Math.round((words / (time / 60)) * 1000);
}

function keyFunk() {
  skrivad = document.getElementById("text").value.split("");
  longdin = parseInt(skrivad.length);
  if (longdin == 1) {
    w.reset();
    w.start();
    resize();
  }
  //console.log("skrivad length: "+skrivad.length + "; reference.length:" + reference.length + "; curr skrivad: "+skrivad[longdin -1]+" : "+reference[longdin -1]);
  if (longdin <= reference.length) {
    $("#progressbar").css({
      width:
        (document.getElementsByClassName("inputter")[0].value.length /
          reference.length) *
          100 +
        "%",
    });
    if ($(".selected").html() != "undefined") {
      ordatak[longdin] =
        "<strong class='selected'>" + reference[longdin] + "</strong>";
    } else {
      $(".selected").html("");
    }
    if (
      skrivad[longdin - 1] == reference[longdin - 1] &&
      $(".selected").html() != "undefined"
    ) {
      ordatak[longdin - 1] =
        "<strong class='right'>" + reference[longdin - 1] + "</strong>";
    } else if (
      skrivad[longdin - 1] != reference[longdin - 1] &&
      $(".selected").html() != "undefined"
    ) {
      if (reference[longdin - 1] == " ") {
        ordatak[longdin - 1] =
          "<strong class='wrong' id='space'>" +
          reference[longdin - 1] +
          "</strong>";
      } else {
        ordatak[longdin - 1] =
          "<strong class='wrong'>" + reference[longdin - 1] + "</strong>";
      }
    } else {
      $(".selected").html("");
    }
  }
  if (longdin == reference.length && longdin != 0) {
    stopped = true;
    w.stop();
    generateStats();
  }
  if (skrivad[longdin + 1] != reference[longdin + 1]) {
    ordatak[longdin + 1] = reference[longdin + 1];
    $(".selected").html("");
  }
  if (text.length != ordatak.length) {
    $(".selected").html("");
  }
  document.getElementById("ordatak").innerHTML = ordatak.join("");
  //document.getElementById('written').innerHTML = skrivad.join("");
  counter += 1;
  for (let i = 0; i < document.getElementsByClassName("selected").length; i++) {
    if (
      document.getElementsByClassName("selected")[i].innerHTML == "undefined"
    ) {
      document.getElementsByClassName("selected")[i].innerHTML = "";
    }
  }
  for (let i = 0; i < document.getElementsByClassName("wrong").length; i++) {
    if (document.getElementsByClassName("wrong")[i].innerHTML == "undefined") {
      document.getElementsByClassName("wrong")[i].innerHTML = "";
    }
  }
}

function generateStats() {
  $("#stats").show();
  $("#welcome").hide();
  $("#progressbar").css({ display: "none" });
  $(".wpm").css({ display: "block" });
  $(".stats").show();
  $(".stats").animate(
    { width: "30%", display: "block", left: "0px" },
    function () {}
  );
  $(".typer").animate({ width: "70%" });
  let WPM =
    getWPM(w.stopTime - w.startTime) == Infinity
      ? 0
      : getWPM(w.stopTime - w.startTime);
  let wrong =
    100 -
    Math.round(
      (document.getElementsByClassName("wrong").length / reference.length) * 100
    );
  let points = pasted ? -100 : Math.round(WPM * (wrong / 100));

  document.getElementsByClassName("statsWPM")[0].innerHTML = WPM + " WPM";
  document.getElementsByClassName("statsFailRate")[0].innerHTML = wrong + "%";
  document.getElementsByClassName("statsPoints")[0].innerHTML =
    points + " stig";
  pasted = false;
  if ((stopped = true)) addWPM(WPM, wrong, points);
}
function newOrdatak() {
  //resize();
  stopped = false;
  $("#progressbar").css({ display: "block", width: "0%" });
  $(".wpm").css({ display: "none" });
  $(".stats").animate(
    { width: "30%", display: "none", left: "-40%" },
    function () {
      $(".stats").hide();
    }
  );
  $(".typer").animate({ width: "100%" });
  if (quotes) {
    document.getElementById("text").value = "♥";
    let xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      "http://www.iheartquotes.com/api/v1/random?format=json&max_characters=60",
      true
    );
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        window.newQuote = xhr.responseText;
        window.newQuote = JSON.parse(newQuote);
        window.newQuote = newQuote.quote;
        window.ordatak = window.newQuote;
        reference = ordatak.split("");
        ordatak = ordatak.split("");
        document.getElementById("text").value = "";
        document.getElementById("ordatak").innerHTML = ordatak.join("");
        document.getElementById("text").value = "";
      }
    };
    xhr.send();
  } else {
    ordatak = ordatok[Math.floor(Math.random() * ordatok.length)];
    reference = ordatak.split("");
    ordatak = ordatak.split("");
    document.getElementById("text").value = "";
    document.getElementById("ordatak").innerHTML = ordatak.join("");
  }
}

document.addEventListener(
  "onfocus",
  function (e) {
    document.getElementById("text").value =
      document.getElementById("text").value;
  },
  false
);

document.addEventListener(
  "keyup",
  function (e) {
    if (!$(".stats").is(":visible") && !stopped) keyFunk();
  },
  false
);
document.addEventListener(
  "keydown",
  function (e) {
    if (e.keyCode == 13 && !w.started && $(".stats").is(":visible")) {
      newOrdatak();
      let text_input = document.getElementById("text");
      text_input.focus();
      text_input.select();
    } else {
      if (!$(".stats").is(":visible") && !stopped) keyFunk();
    }
  },
  false
);

document.addEventListener(
  "click",
  function (e) {
    switch (e.toElement.className) {
      case "settings":
        break;
      case "fullscreen":
        if (chrome.app.window.current().isFullscreen()) {
          chrome.app.window.current().restore();
        } else {
          chrome.app.window.current().fullscreen();
        }
        break;
      case "next":
        newOrdatak();
        break;
      default:
        console.log(e.target.className);
        break;
    }
  },
  false
);

$(document).click(function (event) {
  if ($(event.target).attr("class") == "settings") {
    if ($(".settingsView").is(":visible")) {
      $(".settingsView").hide();
    } else {
      $(".settingsView").show();
    }
  } else if (
    $(event.target).attr("class") != "settingsView" &&
    $(event.target).attr("class") != "settingsOption"
  ) {
    $(".settingsView").hide();
  } else {
    switch ($(event.target).attr("id")) {
      case "wpmStat":
        chrome.app.window.create("stats.html", { id: "wpm" }, function () {});
        break;
      case "pntStat":
        chrome.app.window.create(
          "stats.html",
          { id: "points" },
          function () {}
        );
        break;
      case "engrish":
        if (quotes) {
          quotes = false;
          w.stop();
          newOrdatak();
        } else {
          quotes = true;
          w.stop();
          newOrdatak();
        }
        break;
      default:
        $(".settingsView").hide();
        break;
    }
  }
});

$(".inputter").bind("paste", function (event) {
  let _this = this;
  setTimeout(function () {
    pasted = true;
  }, 100);
});

Array.prototype.compare = function (array) {
  // if the other array is a falsy value, return
  if (!array) return false;

  // compare lengths - can save a lot of time
  if (this.length != array.length) return false;

  for (let i = 0; i < this.length; i++) {
    // Check if we have nested arrays
    if (this[i] instanceof Array && array[i] instanceof Array) {
      // recurse into the nested arrays
      if (!this[i].compare(array[i])) return false;
    } else if (this[i] != array[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
};
function looper() {
  setTimeout(looper, 1);
}
$(".startAgain").click(function () {
  newOrdatak();
});

function resize() {
  if ($("#ordatak").width != "70%") {
    $("#ordatak").flowtype({
      fontRatio: 10,
      lineRatio: 1.45,
    });
  }
  $(".stats").flowtype({
    fontRatio: 10,
    lineRatio: 1.45,
  });
  $(".info").flowtype({
    fontRatio: 15,
    lineRatio: 1,
  });
  $(".bar").css({ left: $(window).width() / 2 - $(".bar").width() / 2 + "px" });
}
resize();
$(window).resize(function () {
  resize();
});
$.get("assets/ordatok.txt", function (list) {
  ordatok = list;
  ordatok = ordatok.split(/[\n]/);
  looper();
});
