function DOMtoString(document_root) {
    let html;

    // question draft
    if(window.location.href.indexOf("questions/ask") > -1) {
      html  = document_root.querySelector('#title').value + ' ' + document_root.querySelector(".wmd-preview").innerHTML;
    
    // published question
    } else if (window.location.href.indexOf("stackoverflow.com" > -1)) {
      html  = document_root.querySelector(".post-text").innerHTML;
    } else {
      html = "please go to stackoverflow web page to ask a question"
    }
    return html;
  }
  
  chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
  });