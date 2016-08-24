(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;
  var createEl = React.createElement.bind(React);

  var NumberOfPeopleQuestion = window.shared.NumberOfPeopleQuestion;
  var HousingQuestion = window.shared.HousingQuestion;

  window.shared.FirstPage = React.createClass({

    propTypes: {
      onClickNext: React.PropTypes.func.isRequired,
      onClickMyFamily: React.PropTypes.func.isRequired,
      onUpdateLivingSituationField: React.PropTypes.func.isRequired,
      userWentBack: React.PropTypes.func.isRequired,
      singlePersonHousehold: React.PropTypes.func.isRequired,
      userSubmittedData: React.PropTypes.func.isRequired
    },

    render: function () {
      return dom.div({},
        this.renderNumberOfPeople(),
        this.renderHousingQuestion(),
        dom.br({}),
        dom.input({
          type: 'submit',
          value: 'Next',
          style: window.shared.ButtonStyle,
          onClick: this.props.onClickNext
        })
      );
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

  });
})();
