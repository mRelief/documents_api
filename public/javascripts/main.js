(function() {
  window.shared || (window.shared = {});
  var Screener = window.shared.Screener;
  var mainElement = document.getElementById("screener");
  ReactDOM.render(React.createElement(Screener), mainElement);
})();
