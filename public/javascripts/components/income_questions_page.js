(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;
  var createEl = React.createElement.bind(React);
  var EmploymentQuestion = window.shared.EmploymentQuestion;
  var IncomeSourcesQuestion = window.shared.IncomeSourcesQuestion;

  window.shared.IncomeQuestionsPage = React.createClass({

    propTypes: {
      fetchDocumentsFromServer: React.PropTypes.func.isRequired,
      onCheckEmployee: React.PropTypes.func.isRequired,
      onCheckSelfEmployed: React.PropTypes.func.isRequired,
      onCheckRetired: React.PropTypes.func.isRequired,
      onCheckUnemployedYesBenefits: React.PropTypes.func.isRequired,
      onCheckDisabilityBenefits: React.PropTypes.func.isRequired,
      onCheckChildSupport: React.PropTypes.func.isRequired,
      onCheckRentalIncome: React.PropTypes.func.isRequired,
      singlePersonHousehold: React.PropTypes.bool.isRequired,
    },

    render: function () {
      return dom.div({},
        this.renderEmploymentQuestion(),
        this.renderIncomeSourcesQuestion(),
        dom.br({}),
        dom.input({
          type: 'submit',
          value: 'Done',
          style: window.shared.ButtonStyle,
          onClick: this.props.fetchDocumentsFromServer
        })
      );
    },

    renderEmploymentQuestion: function () {
      return createEl(EmploymentQuestion, {
        singlePersonHousehold: this.props.singlePersonHousehold,
        onCheckEmployee: this.props.onCheckEmployee,
        onCheckSelfEmployed: this.props.onCheckSelfEmployed,
        onCheckRetired: this.props.onCheckRetired,
        onCheckUnemployedYesBenefits: this.props.onCheckUnemployedYesBenefits,
      });
    },

    renderIncomeSourcesQuestion: function () {
      return createEl(IncomeSourcesQuestion, {
        singlePersonHousehold: this.props.singlePersonHousehold,
        onCheckDisabilityBenefits: this.props.onCheckDisabilityBenefits,
        onCheckChildSupport: this.props.onCheckChildSupport,
        onCheckRentalIncome: this.props.onCheckRentalIncome,
      });
    },

  });
})();
