(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;

  window.shared.IncomeSourcesQuestion = React.createClass({

    propTypes: {
      singlePersonHousehold: React.PropTypes.bool.isRequired,
      onCheckDisabilityBenefits: React.PropTypes.func.isRequired,
      onCheckChildSupport: React.PropTypes.func.isRequired,
      onCheckRentalIncome: React.PropTypes.func.isRequired,
    },

    render: function () {
      return dom.div({},
        dom.p({}, this.question()),
        dom.input({ type: 'checkbox', onClick: this.props.onCheckDisabilityBenefits }),
        dom.label({}, 'Disability benefits'),
        dom.br({}),
        dom.input({ type: 'checkbox', onClick: this.props.onCheckChildSupport }),
        dom.label({}, 'Child support'),
        dom.br({}),
        dom.input({ type: 'checkbox', onClick: this.props.onCheckRentalIncome }),
        dom.label({}, 'Rental income'),
        dom.br({}),
        dom.input({ type: 'checkbox'}),
        dom.label({}, 'None of the above'),
        dom.br({}),
        dom.br({})
      );
    },

    question: function () {
      return 'Which of the following ' + this.familyOrSinglePersonString() + ':'
    },

    familyOrSinglePersonString: function () {
      if (this.props.singlePersonHousehold) {
        return 'do you receive';
      } else {
        return 'does your family receive';
      };
    },

  });
})();
