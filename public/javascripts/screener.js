(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;
  var createEl = React.createElement.bind(React);

  var DefaultData = window.shared.DefaultData;

  var DocumentResultsDisplay = window.shared.DocumentResultsDisplay;
  var NumberOfPeopleQuestion = window.shared.NumberOfPeopleQuestion;
  var OverallIncomeQuestion = window.shared.OverallIncomeQuestion;
  var EmploymentQuestion = window.shared.EmploymentQuestion;
  var IncomeSourcesQuestion = window.shared.IncomeSourcesQuestion;
  var HousingQuestion = window.shared.HousingQuestion;
  var CitizenshipQuestion = window.shared.CitizenshipQuestion;

  var DocumentScreener = React.createClass({

    getInitialState: function() {
      return {
        answeredFirstPage: false,
        answeredSecondPage: false,
        hasResponseFromServer: false,
        documentsDataFromServer: null,
        userSubmittedData: DefaultData,
        singlePersonHousehold: true
      };
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
      if (this.state.hasResponseFromServer === true) {
        return this.renderResultsFromServer();
      } else if (this.state.answeredFirstPage === false) {
        return this.renderFirstPage();
      } else if (this.state.answeredSecondPage === false) {
        return this.renderSecondPage();
      } else {
        return this.renderThirdPage();
      };
    },

    renderFirstPage: function () {
      return dom.div({},
        this.renderNumberOfPeople(),
        this.renderHousingQuestion(),
        this.renderCitizenshipQuestion(),
        dom.br({}),
        dom.input({
          type: 'submit',
          value: 'Next',
          style: window.shared.ButtonStyle,
          onClick: this.onClickNextFromFirstPage
        })
      );
    },

    renderSecondPage: function () {
      return this.renderOverallIncomeQuestion();
    },

    renderThirdPage: function () {
      return dom.div({},
        this.renderEmploymentQuestion(),
        this.renderIncomeSourcesQuestion(),
        dom.br({}),
        dom.input({
          type: 'submit',
          value: 'Done',
          style: window.shared.ButtonStyle,
          onClick: this.fetchDocumentsFromServer
        })
      );
    },

    onClickNextFromFirstPage: function () {
      this.setState({ answeredFirstPage: true });
    },

    onClickNextFromSecondPage: function () {
      this.fetchDocumentsFromServer();
    },

    renderNumberOfPeople: function () {
      return createEl(NumberOfPeopleQuestion, {
        onClickMyFamily: this.onClickMyFamily
      });
    },

    renderCitizenshipQuestion: function () {
      return createEl(CitizenshipQuestion, {
        onCheckNotAllCitizens: this.onCheckNotAllCitizens,
        onCheckYesAllCitizens: this.onCheckYesAllCitizens,
      });
    },

    renderHousingQuestion: function () {
      return createEl(HousingQuestion, {
        onCheckRenting: this.onCheckRenting,
        onCheckOwnHome: this.onCheckOwnHome,
        onCheckShelter: this.onCheckShelter,
        onCheckFamilyOrFriends: this.onCheckFamilyOrFriends,
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

    onClickYesIncome: function () {
      var userSubmittedData = this.state.userSubmittedData;
      userSubmittedData["has_no_income"] = "false";
      this.setState({
        userSubmittedData: userSubmittedData,
        answeredSecondPage: true
      });
    },

    onClickNoIncome: function () {
      this.fetchDocumentsFromServer();
    },

    renderEmploymentQuestion: function () {
      return createEl(EmploymentQuestion, {
        singlePersonHousehold: this.state.singlePersonHousehold,
        onCheckEmployee: this.onCheckEmployee,
        onCheckSelfEmployed: this.onCheckSelfEmployed,
        onCheckRetired: this.onCheckRetired,
        onCheckUnemployedYesBenefits: this.onCheckUnemployedYesBenefits,
      });
    },

    renderIncomeSourcesQuestion: function () {
      return createEl(IncomeSourcesQuestion, {
        singlePersonHousehold: this.state.singlePersonHousehold,
        onCheckDisabilityBenefits: this.onCheckDisabilityBenefits,
        onCheckChildSupport: this.onCheckChildSupport,
        onCheckRentalIncome: this.onCheckRentalIncome,
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

    onClickMyFamily: function () {
      this.setState({ singlePersonHousehold: false, });
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
      this.onUpdateHouseholdMember("employee", event);
    },

    onCheckSelfEmployed: function (event) {
      this.onUpdateHouseholdMember("self_employed", event);
    },

    onCheckRetired: function (event) {
      this.onUpdateHouseholdMember("retired", event);
    },

    onCheckUnemployedYesBenefits: function (event) {
      this.onUpdateHouseholdMember("unemployment_benefits", event);
    },

    onCheckDisabilityBenefits: function (event) {
      this.onUpdateHouseholdMember("disability_benefits", event);
    },

    onCheckChildSupport: function (event) {
      this.onUpdateHouseholdMember("child_support", event);
    },

    onCheckRentalIncome: function (event) {
      this.onUpdateHousehold('has_rental_income', event);
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
        singlePersonHousehold: true
      });
    },

    renderResultsFromServer: function () {
      return createEl(DocumentResultsDisplay, {
          singlePersonHousehold: this.state.singlePersonHousehold,
          results: this.state.documentsDataFromServer,
          onClickStartOver: this.onClickStartOver
        }
      );
    }

  });

  var mainElement = document.getElementById("screener");

  ReactDOM.render(React.createElement(DocumentScreener), mainElement);
})();
