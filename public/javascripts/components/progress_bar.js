(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;

  window.shared.ProgressBar = React.createClass({

    propTypes: {
      step: React.PropTypes.number.isRequired,
    },

    render: function () {
      return dom.div({
        style: {
          textAlign: 'right'
        }
      }, 'Page ' + String(this.props.step) + '/4');
    }

  });
})();
