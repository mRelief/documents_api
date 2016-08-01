(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;
  var createEl = React.createElement.bind(React);

  var DefaultData = window.shared.DefaultData;

  var DocumentResultsDisplay = window.shared.DocumentResultsDisplay;
  var NumberOfPeopleQuestion = window.shared.NumberOfPeopleQuestion;
  var InitialIncomeQuestion = window.shared.InitialIncomeQuestion;
  var EmploymentQuestion = window.shared.EmploymentQuestion;
  var IncomeSourcesQuestion = window.shared.IncomeSourcesQuestion;
  var HousingQuestion = window.shared.HousingQuestion;
  var CitizenshipQuestion = window.shared.CitizenshipQuestion;

  var DocumentScreener = React.createClass({

    getInitialState: function() {
      return {
        answeredNumberOfPeople: false,
        answeredInitialIncomeQuestion: false,
        answeredHousingQuestion: false,
        answeredCitizenshipQuestion: false,
        answeredEmploymentQuestion: false,
        answeredIncomeSourcesQuestion: false,
        hasResponseFromServer: false,
        documentsDataFromServer: null,
        userSubmittedData: DefaultData
      };
    },

    onClickYesIncome: function () {
      var userSubmittedData = this.state.userSubmittedData;
      userSubmittedData["has_no_income"] = "false";

      this.setState({
        answeredInitialIncomeQuestion: true,
        userSubmittedData: userSubmittedData
      });
    },

    onClickNoIncome: function () {
      this.setState({ answeredInitialIncomeQuestion: true });
    },

    fetchDocumentsFromServer: function () {
      this.serverRequest = $.get({
        url: '/api',
        data: this.state.userSubmittedData,
        dataType: 'json',
        contentType: 'application/json',
        success: function (result) {
          console.log(result);
          this.setState({
            hasResponseFromServer: true,
            documentsDataFromServer: result
          });
        }.bind(this),
        error: function (result) {
          console.log(result);
        }
      });
    },

    render: function() {
      var currentQuestion;
      var resultsFromServer;

      if (this.state.hasResponseFromServer === true) {
        // If we have document results from the server, serve that and no questions:

        currentQuestion = null;
        resultsFromServer = this.renderResultsFromServer();

      } else {
        // Otherwise, serve the appropriate question in the screener:
        resultsFromServer = null;

        if (this.state.answeredNumberOfPeople === false) {
          currentQuestion = this.renderNumberOfPeople();
        } else if (this.state.answeredInitialIncomeQuestion === false) {
          currentQuestion = this.renderInitialIncomeQuestion();
        } else if (this.state.answeredHousingQuestion == false) {
          currentQuestion = this.renderHousingQuestion();
        } else if (this.state.answeredCitizenshipQuestion === false) {
          currentQuestion = this.renderCitizenshipQuestion();
        } else if (this.state.answeredEmploymentQuestion === false) {
          currentQuestion = this.renderEmploymentQuestion();
        } else {
          currentQuestion = this.renderIncomeSourcesQuestion();
        };
      }

      return dom.div({},
        currentQuestion,
        resultsFromServer
      )
    },

    renderNumberOfPeople: function () {
      return createEl(NumberOfPeopleQuestion, {});
    },

    renderCitizenshipQuestion: function () {
      return createEl(CitizenshipQuestion, {
        onCheckNotAllCitizens: this.onCheckNotAllCitizens,
        onCheckYesAllCitizens: this.onCheckYesAllCitizens,
        onClickNextFromCitizenshipQuestion: this.onClickNextFromCitizenshipQuestion,
      });
    },

    renderHousingQuestion: function () {
      return createEl(HousingQuestion, {
        onCheckRenting: this.onCheckRenting,
        onCheckOwnHome: this.onCheckOwnHome,
        onCheckShelter: this.onCheckShelter,
        onClickNextFromHousingQuestion: this.onClickNextFromHousingQuestion,
        onCheckFamilyOrFriends: this.onCheckFamilyOrFriends,
        onLivingSituationWithoutSpecialDocuments: this.onLivingSituationWithoutSpecialDocuments
      });
    },

    renderInitialIncomeQuestion: function () {
      return createEl(InitialIncomeQuestion, {
        onClickNoIncome: this.onClickNoIncome,
        onClickYesIncome: this.onClickYesIncome
      });
    },

    renderEmploymentQuestion: function () {
      return createEl(EmploymentQuestion, {
        onCheckEmployee: this.onCheckEmployee,
        onCheckSelfEmployed: this.onCheckSelfEmployed,
        onCheckRetired: this.onCheckRetired,
        onCheckUnemployedYesBenefits: this.onCheckUnemployedYesBenefits,
        onClickNextFromEmploymentQuestion: this.onClickNextFromEmploymentQuestion
      });
    },

    renderIncomeSourcesQuestion: function () {
      return createEl(IncomeSourcesQuestion, {
        onCheckDisabilityBenefits: this.onCheckDisabilityBenefits,
        onCheckChildSupport: this.onCheckChildSupport,
        onCheckRentalIncome: this.onCheckRentalIncome,
        onClickNextFromIncomeSourcesQuestion: this.onClickNextFromIncomeSourcesQuestion,
      });
    },

    onUpdateHouseholdMember: function (attribute_name, event) {
      var userSubmittedData = this.state.userSubmittedData;

      if (event.target.checked) {
        userSubmittedData["household_members"][0][attribute_name] = "true";
      } else {
        userSubmittedData["household_members"][0][attribute_name] = "false";
      };

      this.setState({ userSubmittedData: userSubmittedData });
    },

    onUpdateHousehold: function (attribute_name, event) {
      var userSubmittedData = this.state.userSubmittedData;

      if (event.target.checked) {
        userSubmittedData[attribute_name] = "true";
      } else {
        userSubmittedData[attribute_name] = "false";
      };

      this.setState({ userSubmittedData: userSubmittedData });
    },

    onUpdateLivingSituation: function (attribute_name) {
      var userSubmittedData = this.state.userSubmittedData;

      userSubmittedData['renting'] = "false";
      userSubmittedData['owns_home'] = "false";
      userSubmittedData['shelter'] = "false";
      userSubmittedData['living_with_family_or_friends'] = "false";
      userSubmittedData[attribute_name] = "true";

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

    onCheckEmployee: function (event) {
      this.onUpdateHouseholdMember("is_employee", event);
    },

    onCheckSelfEmployed: function (event) {
      this.onUpdateHouseholdMember("self_employed", event);
    },

    onCheckRetired: function (event) {
      this.onUpdateHouseholdMember("is_retired", event);
    },

    onCheckUnemployedYesBenefits: function (event) {
      this.onUpdateHouseholdMember("receiving_unemployment_benefits", event);
    },

    onClickNextFromEmploymentQuestion: function () {
      this.setState({ answeredEmploymentQuestion: true });
    },

    onCheckDisabilityBenefits: function (event) {
      this.onUpdateHouseholdMember("disability_benefits", event);
    },

    onCheckChildSupport: function (event) {
      this.onUpdateHouseholdMember("receiving_child_support", event);
    },

    onCheckRentalIncome: function (event) {
      this.onUpdateHousehold('has_rental_income', event);
    },

    onClickNextFromIncomeSourcesQuestion: function () {
      this.fetchDocumentsFromServer();
    },

    onCheckRenting: function (event) {
      this.onUpdateLivingSituation('renting');
    },

    onCheckOwnHome: function (event) {
      this.onUpdateLivingSituation('owns_home');
    },

    onCheckShelter: function (event) {
      this.onUpdateLivingSituation('shelter');
    },

    onCheckFamilyOrFriends: function (event) {
      this.onUpdateLivingSituation('living_with_family_or_friends');
    },

    onClickNextFromHousingQuestion: function () {
      this.setState({ answeredHousingQuestion: true });
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

    onClickNextFromCitizenshipQuestion: function () {
      if (this.state.userSubmittedData['has_no_income'] === 'true') {
        this.fetchDocumentsFromServer();
      } else {
        this.setState({ answeredCitizenshipQuestion: true });
      };
    },

    onClickStartOver: function () {
      this.setState({
        answeredInitialIncomeQuestion: false,
        answeredHousingQuestion: false,
        answeredCitizenshipQuestion: false,
        answeredEmploymentQuestion: false,
        answeredIncomeSourcesQuestion: false,
        hasResponseFromServer: false,
        documentsDataFromServer: null,
        userSubmittedData: DefaultData
      });
    },

    renderResultsFromServer: function () {
      var results = this.state.documentsDataFromServer;

      return createEl(DocumentResultsDisplay, {
          householdMembers: results['household_members'],
          otherDocumentsNeeded: results['other_documents_needed'],
          onClickStartOver: this.onClickStartOver
        }
      );
    }

  });

  var mainElement = document.getElementById("screener");

  ReactDOM.render(React.createElement(DocumentScreener), mainElement);
})();
