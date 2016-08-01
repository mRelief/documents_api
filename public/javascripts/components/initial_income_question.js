(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;

  window.shared.InitialIncomeQuestion = React.createClass({

    propTypes: {
      singlePersonHousehold: React.PropTypes.bool.isRequired,
      onClickYesIncome: React.PropTypes.func.isRequired,
      onClickNoIncome: React.PropTypes.func.isRequired
    },

    render: function () {
      return dom.div({},
        dom.p({}, this.question()),
        dom.input({ type: 'radio', onClick: this.props.onClickYesIncome }),
        dom.label({}, 'Yes'),
        dom.br({}),
        dom.input({ type: 'radio', onClick: this.props.onClickNoIncome }),
        dom.label({}, 'No')
      );
    },

    question: function () {
      return ('Are you ' + this.familyParenthetical() + ' currently receiving ' +
              'any income through employment, public aid, or some other means?');
    },

    familyParenthetical: function () {
      if (this.props.singlePersonHousehold) {
        return '';
      } else {
        return '(or anyone in your family)';
      };
    }

  });
})();
