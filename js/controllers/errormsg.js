exports.showErrorMsg = function(errorLevel, errorMsg, closeDelay) {
  exports.closeErrorMsg();
  var alertClass = "";
  var alertMsg = "";
  var errorHtml = "";

  if (errorLevel == "error") {
    alertClass = "alert-danger";
    alertMsg = "ERROR: ";
  } else if (errorLevel == "success") {
    alertClass = "alert-success";
    alertMsg = "SUCCESS: ";
  } else {
    alertClass = "alert-warning";
    alertMsg = "WARNING: ";
  }
  var errorHtml = '<div id="errorMsgContainer" class="container"><div class="alert ' + alertClass + '"><strong>' + alertMsg + errorMsg + '</strong></div></div>';
  console.log(errorHtml);
  document.body.insertAdjacentHTML('afterbegin', errorHtml);

  if (closeDelay != null && !isNaN(closeDelay)) {
    setTimeout(function() {
      exports.closeErrorMsg();
    }, closeDelay * 1000);
  }
}

exports.closeErrorMsg = function() {
  errorBlock = document.getElementById("errorMsgContainer");
  if (typeof(errorBlock) != 'undefined' && errorBlock != null) {
    errorBlock.remove();
  }
}
