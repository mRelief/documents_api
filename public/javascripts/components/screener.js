(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;
  var createEl = React.createElement.bind(React);

  var DefaultData = window.shared.DefaultData;

  var DocumentResultsDisplay = window.shared.DocumentResultsDisplay;
  var ErrorPage = window.shared.ErrorPage;
  var FirstPage = window.shared.FirstPage;
  var SecondPage = window.shared.SecondPage;
  var ThirdPage = window.shared.ThirdPage;
  var ConfirmationPage = window.shared.ConfirmationPage;

  window.shared.Screener = React.createClass({

    getInitialState: function() {
      return {
        answeredFirstPage: false,
        answeredSecondPage: false,
        answeredThirdPage: false,
        hasResponseFromServer: false,
        documentsDataFromServer: null,
        userSubmittedData: $.extend(true, {}, DefaultData),
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
        // Second page
        return this.renderSecondPage();
      } else if (this.state.answeredThirdPage === false) {
        // Third page
        return this.renderThirdPage();
      } else {
        // Confirmation page
        return this.renderConfirmationPage();
      };
    },

    renderConfirmationPage: function () {
      return createEl(ConfirmationPage, {
        userSubmittedData: this.state.userSubmittedData,
        singlePersonHousehold: this.state.singlePersonHousehold,
        fetchDocumentsFromServer: this.fetchDocumentsFromServer,
        onClickBackButton: this.hitBackButtonFromConfirmationPage
      });
    },

    renderFirstPage: function () {
      return createEl(FirstPage, {
        onClickNext: this.onClickNextFromFirstPage,
        onClickMyFamily: this.onClickMyFamily,
        onUpdateLivingSituationField: this.onUpdateLivingSituationField,
        userWentBack: this.state.hitBackButton,
        singlePersonHousehold: this.state.singlePersonHousehold,
        userSubmittedData: this.state.userSubmittedData
      });
    },

    renderSecondPage: function () {
      return createEl(SecondPage, {
        singlePersonHousehold: this.state.singlePersonHousehold,
        onUpdateDataField: this.onUpdateDataField,
        onClickRadioButtonYes: this.onClickRadioButtonYes,
        onClickRadioButtonNo: this.onClickRadioButtonNo,
        singlePersonHousehold: this.state.singlePersonHousehold,
        onClickNext: this.onClickNextFromSecondPage,
        onClickBackButton: this.hitBackButtonFromSecondPage,
        userSubmittedData: this.state.userSubmittedData,
        userWentBack: this.state.hitBackButton,
      });
    },

    renderThirdPage: function () {
      return createEl(ThirdPage, {
        onClickRadioButtonYes: this.onClickRadioButtonYes,
        singlePersonHousehold: this.state.singlePersonHousehold,
        onClickRadioButtonNo: this.onClickRadioButtonNo,
        onClickNext: this.onClickNextFromThirdPage,
        onClickBackButton: this.hitBackButtonFromThirdPage,
        userSubmittedData: this.state.userSubmittedData,
        userWentBack: this.state.hitBackButton,
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
      window.scrollTo(0, 0);
      this.setState({ answeredFirstPage: true });
    },

    onClickNextFromSecondPage: function () {
      window.scrollTo(0, 0);
      this.setState({ answeredSecondPage: true });
    },

    onClickNextFromThirdPage: function () {
      window.scrollTo(0, 0);
      this.setState({ answeredThirdPage: true });
    },

    onClickMyFamily: function () {
      this.setState({ singlePersonHousehold: false });
    },

    onUpdateLivingSituationField: function (event) {
      var dataField = event.target.getAttribute('data');
      var userSubmittedData = this.state.userSubmittedData;

      userSubmittedData['renting'] = "false";
      userSubmittedData['owns_home'] = "false";
      userSubmittedData['shelter'] = "false";
      userSubmittedData['living_with_family_or_friends'] = "false";
      userSubmittedData['car'] = "false";
      userSubmittedData['motel'] = "false";
      userSubmittedData['in_kind'] = "false";
      userSubmittedData[dataField] = "true";

      this.setState({ userSubmittedData: userSubmittedData });
    },

    onClickRadioButtonYes: function (event) {
      var dataField = event.target.getAttribute('data');
      var userSubmittedData = this.state.userSubmittedData;
      userSubmittedData[dataField] = 'true';
      this.setState({ userSubmittedData: userSubmittedData });
    },

    onClickRadioButtonNo: function (event) {
      var dataField = event.target.getAttribute('data');
      var userSubmittedData = this.state.userSubmittedData;
      userSubmittedData[dataField] = 'false';
      this.setState({ userSubmittedData: userSubmittedData });
    },

    hitBackButtonFromSecondPage: function () {
      this.setState({ hitBackButton: true, answeredFirstPage: false });
    },

    hitBackButtonFromThirdPage: function () {
      this.setState({ hitBackButton: true, answeredSecondPage: false });
    },

    hitBackButtonFromConfirmationPage: function () {
      this.setState({ hitBackButton: true, answeredThirdPage: false });
    },

    onClickStartOver: function () {
      this.setState(this.getInitialState());
    },

    renderResultsFromServer: function () {
      return createEl(DocumentResultsDisplay, {
          singlePersonHousehold: this.state.singlePersonHousehold,
          identityDocuments: this.state.documentsDataFromServer.identity_documents,
          residencyDocuments: this.state.documentsDataFromServer.residency_documents,
          citizenshipDocuments: this.state.documentsDataFromServer.citizenship_documents,
          incomeDocuments: this.state.documentsDataFromServer.income_documents,
          onClickStartOver: this.onClickStartOver
        }
      );
    },

    renderErrorFromServer: function () {
      return createEl(ErrorPage, { onClickStartOver: this.onClickStartOver });
    },

  });
})();
