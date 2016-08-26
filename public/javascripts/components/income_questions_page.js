(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;
  var createEl = React.createElement.bind(React);
  var EmploymentQuestion = window.shared.EmploymentQuestion;
  var IncomeSourcesQuestion = window.shared.IncomeSourcesQuestion;
  var CitizenshipQuestion = window.shared.CitizenshipQuestion;
  var ProgressBar = window.shared.ProgressBar;

  window.shared.IncomeQuestionsPage = React.createClass({

    propTypes: {
      singlePersonHousehold: React.PropTypes.bool.isRequired,
      onUpdateDataField: React.PropTypes.func.isRequired,
      onCheckNotAllCitizens: React.PropTypes.func.isRequired,
      onCheckYesAllCitizens: React.PropTypes.func.isRequired,
      singlePersonHousehold: React.PropTypes.bool.isRequired,
      onClickNext: React.PropTypes.func.isRequired,
      onClickBackButton: React.PropTypes.func.isRequired,
      userSubmittedData: React.PropTypes.object.isRequired,
      userWentBack: React.PropTypes.bool.isRequired
    },

    getInitialState: function() {
      return {
        showPleaseAnswerEmploymentQuestion: false,
        showPleaseAnswerAdditionalIncomeQuestion: false
      };
    },

    render: function () {
      var showEmploymentQuestionWarning = this.state.showPleaseAnswerEmploymentQuestion;
      var showAdditionalIncomeQuestionWarning = this.state.showPleaseAnswerAdditionalIncomeQuestion;

      return dom.div({},
        this.renderProgressBar(),
        this.renderEmploymentQuestion(),
        this.requiredQuestionWarning(showEmploymentQuestionWarning),
        this.renderIncomeSourcesQuestion(),
        this.requiredQuestionWarning(showAdditionalIncomeQuestionWarning),
        this.renderCitizenshipQuestion(),
        dom.br({}),
        this.requiredQuestionWarning(),
        dom.input({
          type: 'submit',
          value: 'Back',
          style: window.shared.ButtonStyle,
          onClick: this.props.onClickBackButton
        }),
        dom.input({
          type: 'submit',
          value: 'Next',
          style: window.shared.ButtonStyle,
          onClick: this.onClickNext
        })
      );
    },

    renderProgressBar: function () {
      return createEl(ProgressBar, { step: 1 });
    },

    renderEmploymentQuestion: function () {
      return createEl(EmploymentQuestion, {
        singlePersonHousehold: this.props.singlePersonHousehold,
        onUpdateDataField: this.props.onUpdateDataField,
        userSubmittedData: this.props.userSubmittedData,
        userWentBack: this.props.userWentBack,
      });
    },

    renderIncomeSourcesQuestion: function () {
      return createEl(IncomeSourcesQuestion, {
        singlePersonHousehold: this.props.singlePersonHousehold,
        onUpdateDataField: this.props.onUpdateDataField,
        userSubmittedData: this.props.userSubmittedData,
        userWentBack: this.props.userWentBack,
      });
    },

    renderCitizenshipQuestion: function () {
      return createEl(CitizenshipQuestion, {
        onCheckNotAllCitizens: this.props.onCheckNotAllCitizens,
        onCheckYesAllCitizens: this.props.onCheckYesAllCitizens,
        singlePersonHousehold: this.props.singlePersonHousehold
      });
    },

    onClickNext: function () {
      if (this.bothQuestionsAnswered()) {
        this.props.onClickNext();
      } else {
        this.validateFirstQuestionAnswered();
        this.validateSecondQuestionAnswered();
      };
    },

    validateFirstQuestionAnswered: function () {
      if (!this.employmentQuestionAnswered()) {
        this.setState({ showPleaseAnswerEmploymentQuestion: true });
      } else {
        this.setState({ showPleaseAnswerEmploymentQuestion: false });
      };
    },

    validateSecondQuestionAnswered: function () {
      if (!this.additionalIncomeQuestionAnswered()) {
        this.setState({ showPleaseAnswerAdditionalIncomeQuestion: true });
      } else {
        this.setState({ showPleaseAnswerAdditionalIncomeQuestion: false });
      };
    },

    employmentQuestionAnswered: function () {
      return $('[type="checkbox"][name="employmentQuestion"').get().map(function(checkbox) {
        return checkbox.checked;
      }).reduce(function(a, b) {
        return (a || b);
      });
    },

    additionalIncomeQuestionAnswered: function () {
      return $('[type="checkbox"][name="additionalIncomeQuestion"').get().map(function(checkbox) {
        return checkbox.checked;
      }).reduce(function(a, b) {
        return (a || b);
      });
    },

    bothQuestionsAnswered: function () {
      return (this.employmentQuestionAnswered() && this.additionalIncomeQuestionAnswered());
    },

    requiredQuestionWarning: function (shouldShow) {
      if (!shouldShow) return null;

      return dom.div({},
        dom.div({
          style: {
            color: 'red',
            fontStyle: 'italic'
          }
        }, 'Please select a response.'),
        dom.br({})
      );
    },

  });
})();
