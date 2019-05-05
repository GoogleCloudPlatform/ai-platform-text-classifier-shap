const bkg = chrome.extension.getBackgroundPage();

chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
      message.innerText = request.source;
      bkg.console.log(message.innerText);
    }
  });
  function onWindowLoad() {
  
    let message = document.querySelector('#mainPopup');

    chrome.tabs.executeScript(null, {
      file: "src/browser_action/getPagesSource.js"
    }, function() {
      if (chrome.runtime.lastError) {
        message.innerHTML = '<p>Navigate to a <a href="https://stackoverflow.com">Stack Overflow</a> question to use this extension';
      }
    });
  
  }
  
  window.onload = onWindowLoad;
$('#call-model').on('click', (e) => {
    let text = message.innerText;
    message.innerText = "";
    let doc = new DOMParser().parseFromString(text, 'text/html');
    let strippedHtml = doc.body.textContent.replace(/[|&;$%@".<>()+,]/g, " ").replace(/\n/g, " ");
    bkg.console.log(strippedHtml);
    let url = 'https://your-gcf-url.net/predict-func-name';
    let data = {
      "question": strippedHtml
    }
    bkg.console.log(data);
    $('#status').text('Sending question to model woot woot...');

    $.postJSON = function(url, data, callback) {
        return jQuery.ajax({
          'type': 'POST',
          'url': url,
          'contentType': 'application/json; charset=utf-8',
          'data': JSON.stringify(data),
          'dataType': 'json',
          'success': callback,
          'complete': function(data) {
              bkg.console.log('request completed', data);
          }
        });
      };

    $.postJSON(url, data, (res) => {
        bkg.console.log(res);
        $('#status').text('');
        $('#result').html(`Suggested tags: ${res['resp']}`);
    });
    
});