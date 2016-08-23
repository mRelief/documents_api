(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;
  var createEl = React.createElement.bind(React);

  var DefaultData = window.shared.DefaultData;

  var DocumentResultsDisplay = window.shared.DocumentResultsDisplay;
  var NumberOfPeopleQuestion = window.shared.NumberOfPeopleQuestion;
  var HousingQuestion = window.shared.HousingQuestion;
  var ErrorPage = window.shared.ErrorPage;
  var IncomeQuestionsPage = window.shared.IncomeQuestionsPage;
  var ConfirmationPage = window.shared.ConfirmationPage;

  window.shared.Screener = React.createClass({

    getInitialState: function() {
      return {
        answeredFirstPage: false,
        answeredSecondPage: false,
        hasResponseFromServer: false,
        documentsDataFromServer: null,
        userSubmittedData: DefaultData,
        singlePersonHousehold: true,
        errorFromServer: false,
        hitBackButton: false
      };
    },

    fetchDocumentsFromServer: function () {
      this.serverRequest = $.get({
        url: '/api',
        data: this.state.userSubmittedData,
        dataType: 'json',
        contentType: 'application/json',
        success: function (result) {
          this.setState({
            hasResponseFromServer: true,
            documentsDataFromServer: result
          });
        }.bind(this),
        error: function (result) {
          console.log(result);
          this.setState({ errorFromServer: true });
        }.bind(this)
      });
    },

    render: function() {
      if (this.state.hasResponseFromServer === true) {
        // Results from server
        return this.renderResultsFromServer();
      } else if (this.state.errorFromServer == true) {
        // Error from server
        return this.renderErrorFromServer();
      } else if (this.state.answeredFirstPage === false) {
        // First page
        return this.renderFirstPage();
      } else if (this.state.answeredSecondPage === false) {
        // Detailed income questions page
        return this.renderIncomeQuestionsPage();
      } else {
        // Confirmation page
        return this.renderConfirmationPage();
      };
    },

    renderConfirmationPage: function () {
      return createEl(ConfirmationPage, {
        userSubmittedData: this.state.userSubmittedData,
        singlePersonHousehold: this.state.singlePersonHousehold,
        fetchDocumentsFromServer: this.fetchDocumentsFromServer
      });
    },

    renderFirstPage: function () {
      return dom.div({},
        this.renderNumberOfPeople(),
        this.renderHousingQuestion(),
        dom.br({}),
        dom.input({
          type: 'submit',
          value: 'Next',
          style: window.shared.ButtonStyle,
          onClick: this.onClickNextFromFirstPage
        })
      );
    },

    renderIncomeQuestionsPage: function () {
      return createEl(IncomeQuestionsPage, {
        singlePersonHousehold: this.state.singlePersonHousehold,
        onUpdateDataField: this.onUpdateDataField,
        onCheckNotAllCitizens: this.onCheckNotAllCitizens,
        onCheckYesAllCitizens: this.onCheckYesAllCitizens,
        singlePersonHousehold: this.state.singlePersonHousehold,
        onClickNext: this.onClickNextFromSecondPage
      });
    },

    onUpdateDataField: function (event) {
      var dataField = event.target.getAttribute('data');
      var userSubmittedData = this.state.userSubmittedData;

      if (event.target.checked) {
        userSubmittedData[dataField] = "true";
      } else {
        userSubmittedData[dataField] = "false";
      };

      this.setState({ userSubmittedData: userSubmittedData });
    },

    onClickNextFromFirstPage: function () {
      this.setState({ answeredFirstPage: true });
    },

    onClickNextFromSecondPage: function () {
      this.setState({ answeredSecondPage: true });
    },

    renderNumberOfPeople: function () {
      return createEl(NumberOfPeopleQuestion, {
        onClickMyFamily: this.onClickMyFamily
      });
    },

    renderHousingQuestion: function () {
      return createEl(HousingQuestion, {
        onUpdateLivingSituationField: this.onUpdateLivingSituationField,
        onLivingSituationWithoutSpecialDocuments: this.onLivingSituationWithoutSpecialDocuments
      });
    },

    renderOverallIncomeQuestion: function () {
      return createEl(OverallIncomeQuestion, {
        singlePersonHousehold: this.state.singlePersonHousehold,
        onClickNoIncome: this.onClickNoIncome,
        onClickYesIncome: this.onClickYesIncome
      });
    },

    onClickMyFamily: function () {
      this.setState({ singlePersonHousehold: false, });
    },

    onUpdateLivingSituationField: function (event) {
      var dataField = event.target.getAttribute('data');
      var userSubmittedData = this.state.userSubmittedData;

      userSubmittedData['renting'] = "false";
      userSubmittedData['owns_home'] = "false";
      userSubmittedData['shelter'] = "false";
      userSubmittedData['living_with_family_or_friends'] = "false";
      userSubmittedData[dataField] = "true";

      this.setState({ userSubmittedData: userSubmittedData });
    },

    onLivingSituationWithoutSpecialDocuments: function () {
      var userSubmittedData = this.state.userSubmittedData;

      userSubmittedData['renting'] = "false";
      userSubmittedData['owns_home'] = "false";
      userSubmittedData['shelter'] = "false";
      userSubmittedData['living_with_family_or_friends'] = "false";

      this.setState({ userSubmittedData: userSubmittedData });
    },

    onCheckNotAllCitizens: function () {
      var userSubmittedData = this.state.userSubmittedData;
      userSubmittedData["all_citizens"] = "false";
      this.setState({ userSubmittedData: userSubmittedData });
    },

    onCheckYesAllCitizens: function () {
      var userSubmittedData = this.state.userSubmittedData;
      userSubmittedData["all_citizens"] = "true";
      this.setState({ userSubmittedData: userSubmittedData });
    },

    onClickStartOver: function () {
      this.setState({
        answeredFirstPage: false,
        answeredSecondPage: false,
        hasResponseFromServer: false,
        documentsDataFromServer: null,
        userSubmittedData: DefaultData,
        singlePersonHousehold: true,
        errorFromServer: false,
        hitBackButton: false
      });
    },

    renderResultsFromServer: function () {
      return createEl(DocumentResultsDisplay, {
          singlePersonHousehold: this.state.singlePersonHousehold,
          results: this.state.documentsDataFromServer,
          onClickStartOver: this.onClickStartOver
        }
      );
    },

    renderErrorFromServer: function () {
      return createEl(ErrorPage, { onClickStartOver: this.onClickStartOver });
    },

  });
})();
