(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;

  window.shared.IncomeSourcesQuestion = React.createClass({

    propTypes: {
      onCheckDisabilityBenefits: React.PropTypes.func.isRequired,
      onCheckChildSupport: React.PropTypes.func.isRequired,
      onCheckRentalIncome: React.PropTypes.func.isRequired,
      onClickNextFromIncomeSourcesQuestion: React.PropTypes.func.isRequired,
    },

    render: function () {
      return dom.div({},
        dom.p({}, 'Which of the following do you receive:'),
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
        dom.br({}),
        dom.input({
          type: 'submit',
          value: 'Next',
          onClick: this.props.onClickNextFromIncomeSourcesQuestion,
          style: window.shared.ButtonStyle
        })
      );
    },

  });
})();
