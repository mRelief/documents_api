(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;

  window.shared.EmploymentQuestion = React.createClass({

    propTypes: {
      onCheckEmployee: React.PropTypes.func.isRequired,
      onCheckSelfEmployed: React.PropTypes.func.isRequired,
      onCheckRetired: React.PropTypes.func.isRequired,
      onCheckUnemployedYesBenefits: React.PropTypes.func.isRequired,
      onClickNextFromEmploymentQuestion: React.PropTypes.func.isRequired,
    },

    render: function () {
      return dom.div({},
        dom.p({}, 'Select all that apply to you:'),
        dom.input({ type: 'checkbox', onClick: this.props.onCheckEmployee }),
        dom.label({}, 'Employee or contractor'),
        dom.br({}),
        dom.input({ type: 'checkbox', onClick: this.props.onCheckSelfEmployed }),
        dom.label({}, 'Self-employed'),
        dom.br({}),
        dom.input({ type: 'checkbox', onClick: this.props.onCheckRetired }),
        dom.label({}, 'Retired'),
        dom.br({}),
        dom.input({ type: 'checkbox', onClick: this.props.onCheckUnemployed }),
        dom.label({}, 'Unemployed'),
        dom.br({}),
        dom.br({}),
        dom.input({
          type: 'submit',
          value: 'Next',
          onClick: this.props.onClickNextFromEmploymentQuestion,
          style: window.shared.ButtonStyle
        })
      );
    }

  });
})();
