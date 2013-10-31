chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
   id: "TypeWriter",
    'bounds': {
      'width': 920,
      'height': 520
    }
  });
});