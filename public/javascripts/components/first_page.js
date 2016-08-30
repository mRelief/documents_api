(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;
  var createEl = React.createElement.bind(React);

  var NumberOfPeopleQuestion = window.shared.NumberOfPeopleQuestion;
  var HousingQuestion = window.shared.HousingQuestion;
  var ProgressBar = window.shared.ProgressBar;

  window.shared.FirstPage = React.createClass({

    propTypes: {
      onClickNext: React.PropTypes.func.isRequired,
      onClickMyFamily: React.PropTypes.func.isRequired,
      onUpdateLivingSituationField: React.PropTypes.func.isRequired,
      userWentBack: React.PropTypes.bool.isRequired,
      singlePersonHousehold: React.PropTypes.bool.isRequired,
      userSubmittedData: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
      return {
        showPleaseAnswerNumberOfPeople: false,
        showPleaseAnswerHousing: false
      };
    },

    render: function () {
      var showNumberOfPeopleWarning = this.state.showPleaseAnswerNumberOfPeople;
      var showHosuingQuestionWarning = this.state.showPleaseAnswerHousing;

      return dom.div({
          style: {
            position: 'relative',
            top: '160px'
          }
        },
        this.renderProgressBar(),
        this.renderNumberOfPeople(),
        this.requiredQuestionWarning(showNumberOfPeopleWarning),
        this.renderHousingQuestion(),
        this.requiredQuestionWarning(showHosuingQuestionWarning),
        dom.br({}),
        dom.input({
          type: 'submit',
          value: 'Next',
          style: window.shared.ButtonStyle,
          onClick: this.onClickNext
        })
      );
    },

    renderProgressBar: function () {
      return createEl(ProgressBar, { step: 0 });
    },

    renderNumberOfPeople: function () {
      return createEl(NumberOfPeopleQuestion, {
        onClickMyFamily: this.props.onClickMyFamily,
        userWentBack: this.props.userWentBack,
        singlePersonHousehold: this.props.singlePersonHousehold,
      });
    },

    renderHousingQuestion: function () {
      return createEl(HousingQuestion, {
        onUpdateLivingSituationField: this.props.onUpdateLivingSituationField,
        userWentBack: this.props.userWentBack,
        userSubmittedData: this.props.userSubmittedData,
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
      if (!this.numberOfPeopleQuestionAnswered()) {
        this.setState({ showPleaseAnswerNumberOfPeople: true });
      } else {
        this.setState({ showPleaseAnswerNumberOfPeople: false });
      };
    },

    validateSecondQuestionAnswered: function () {
      if (!this.housingQuestionAnswered()) {
        this.setState({ showPleaseAnswerHousing: true });
      } else {
        this.setState({ showPleaseAnswerHousing: false });
      };
    },

    bothQuestionsAnswered: function () {
      return (this.numberOfPeopleQuestionAnswered() && this.housingQuestionAnswered());
    },

    numberOfPeopleQuestionAnswered: function () {
      return $('[type="radio"][name="NumberOfPeopleQuestion"]').get().map(function(checkbox) {
        return checkbox.checked;
      }).reduce(function(a, b) { return (a || b); });
    },

    housingQuestionAnswered: function () {
      return $('[type="radio"][name="livingQuestion"]').get().map(function(checkbox) {
        return checkbox.checked;
      }).reduce(function(a, b) { return (a || b); });
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
