(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;
  var createEl = React.createElement.bind(React);
  var EmploymentQuestion = window.shared.EmploymentQuestion;
  var AdditionalIncomeQuestion = window.shared.AdditionalIncomeQuestion;
  var CitizenshipQuestion = window.shared.CitizenshipQuestion;
  var ProgressBar = window.shared.ProgressBar;

  window.shared.SecondPage = React.createClass({

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
        showPleaseAnswerAdditionalIncomeQuestion: false,
        showInvalidEmploymentResponse: false
      };
    },

    render: function () {
      var showEmploymentQuestionWarning = this.state.showPleaseAnswerEmploymentQuestion;
      var showAdditionalIncomeQuestionWarning = this.state.showPleaseAnswerAdditionalIncomeQuestion;
      var showInvalidEmploymentResponse = this.state.showInvalidEmploymentResponse;

      return dom.div({
          style: {
            position: 'relative',
            top: '160px',
            marginBottom: '80px'
          }
        },
        this.renderProgressBar(),
        this.renderEmploymentQuestion(),
        this.requiredQuestionWarning(showEmploymentQuestionWarning),
        this.invalidQuestionWarning(showInvalidEmploymentResponse),
        this.renderAdditionalIncomeQuestion(),
        this.requiredQuestionWarning(showAdditionalIncomeQuestionWarning),
        this.renderCitizenshipQuestion(),
        this.renderBirthCertificateQuestion(),
        this.renderSocialSecurityCardQuestion(),
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

    renderAdditionalIncomeQuestion: function () {
      return createEl(AdditionalIncomeQuestion, {
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

    renderBirthCertificateQuestion: function () {
      return dom.div({},
        dom.p({}, 'Do you have a birth certificate?'),
        dom.input({
          type: 'radio',
          name: 'birthCertificateQuestion',
          onClick: this.props.onUpdateDataField,
          data: 'has_birth_certificate',
          defaultChecked: (
            this.props.userWentBack &&
            this.props.userSubmittedData.has_birth_certificate === 'true'
          )
        }),
        dom.label({}, 'Yes'),
        dom.br({}),
        dom.input({
          type: 'radio',
          name: 'birthCertificateQuestion',
          data: 'has_birth_certificate',
          defaultChecked: (
            this.props.userWentBack &&
            this.props.userSubmittedData.has_birth_certificate === 'false'
          )
        }),
        dom.label({}, 'No'),
        dom.br({}),
        dom.br({})
      );
    },

    renderSocialSecurityCardQuestion: function () {
      return dom.div({},
        dom.p({}, 'Do you have a social security card?'),
        dom.input({
          type: 'radio',
          name: 'socialSecurityCardQuestion',
          data: 'has_social_security_card',
          onClick: this.props.onUpdateDataField,
          defaultChecked: (
            this.props.userWentBack &&
            this.props.userSubmittedData.has_social_security_card === 'true'
          )
        }),
        dom.label({}, 'Yes'),
        dom.br({}),
        dom.input({
          type: 'radio',
          name: 'socialSecurityCardQuestion',
          data: 'has_social_security_card',
          defaultChecked: (
            this.props.userWentBack &&
            this.props.userSubmittedData.has_social_security_card === 'false'
          )
        }),
        dom.label({}, 'No'),
        dom.br({}),
        dom.br({})
      );
    },

    onClickNext: function () {
      if (this.valid()) {
        this.props.onClickNext();
      } else {
        this.validateFirstQuestionAnswered();
        this.validateSecondQuestionAnswered();
        this.validateEmploymentAnswer();
      };
    },

    valid: function () {
      return (this.bothQuestionsAnswered() && this.employmentQuestionAnswerValid());
    },

    validateEmploymentAnswer: function () {
      if (!this.employmentQuestionAnswerValid()) {
        this.setState({ showInvalidEmploymentResponse: true });
      } else {
        this.setState({ showInvalidEmploymentResponse: false });
      };
    },

    employmentQuestionAnswerValid: function () {
      if (this.props.singlePersonHousehold) {
        if (this.employedAndUnemployed() || this.employedAndRetired()) {
          return false;
        } else {
          return true;
        };
      } else {
        return true;  // Multi-person household can include one person who is
                      // employed and another who is retired (for example)
      };
    },

    employedAndUnemployed: function () {
      return this.props.userSubmittedData.employee === 'true' &&
             this.props.userSubmittedData.unemployed === 'true';
    },

    employedAndRetired: function () {
      return this.props.userSubmittedData.employee === 'true' &&
             this.props.userSubmittedData.retired === 'true';
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

    invalidQuestionWarning: function (shouldShow) {
      if (!shouldShow) return null;

      return dom.div({},
        dom.div({
          style: {
            color: 'red',
            fontStyle: 'italic'
          }
        }, 'Please select a valid response. \
            For a single-person household, \
            choose between employed/self-employed, unemployed, and retired.'),
        dom.br({})
      );
    }

  });
})();
