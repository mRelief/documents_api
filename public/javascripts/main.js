(function() {
  window.shared || (window.shared = {});
  var DocumentScreener = window.shared.DocumentScreener;
  var mainElement = document.getElementById("screener");
  ReactDOM.render(React.createElement(DocumentScreener), mainElement);
})();
