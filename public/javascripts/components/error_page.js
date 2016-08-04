(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;

  window.shared.ErrorPage = React.createClass({

    propTypes: {
      onClickStartOver: React.PropTypes.func.isRequired
    },

    render: function () {
      return dom.div({},
        dom.p({}, 'Ooops, something went wrong. We apologize.'),
        dom.input({
          type: 'submit',
          value: 'Start Over',
          onClick: this.props.onClickStartOver,
          style: window.shared.ButtonStyle
        })
      );
    }

  });
})();
