(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;

  window.shared.InitialIncomeQuestion = React.createClass({

    propTypes: {
      onClickYesIncome: React.PropTypes.func.isRequired,
      onClickNoIncome: React.PropTypes.func.isRequired
    },

    render: function () {
      return dom.div({},
        dom.h1({}, 'See what documents you need for Food Stamps'),
        dom.p({}, 'Are you currently receiving any income through employment, public aid, or some other means?'),
        dom.input({ type: 'radio', onClick: this.props.onClickYesIncome }),
        dom.label({}, 'Yes'),
        dom.br({}),
        dom.input({ type: 'radio', onClick: this.props.onClickNoIncome }),
        dom.label({}, 'No')
      );
    },

  });
})();
