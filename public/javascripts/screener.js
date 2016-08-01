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
        hasResponseFromServer: false,
        documentsDataFromServer: null,
        userSubmittedData: DefaultData,
        singlePersonHousehold: true
      };
    },

    onClickYesIncome: function () {
      var userSubmittedData = this.state.userSubmittedData;
      userSubmittedData["has_no_income"] = "false";

      this.setState({ userSubmittedData: userSubmittedData });
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
      } else {
        return dom.div({},
          this.renderNumberOfPeople(),
          this.renderHousingQuestion(),
          this.renderCitizenshipQuestion(),
          dom.br({}),
          dom.input({
            type: 'submit',
            value: 'Next',
            style: window.shared.ButtonStyle
          })

          // this.renderInitialIncomeQuestion(),
          // this.renderEmploymentQuestion(),
          // this.renderIncomeSourcesQuestion()
        );
      };
    },

    renderNumberOfPeople: function () {
      return createEl(NumberOfPeopleQuestion, {
        onClickJustMe: this.onClickJustMe,
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

    renderInitialIncomeQuestion: function () {
      return createEl(InitialIncomeQuestion, {
        singlePersonHousehold: this.state.singlePersonHousehold,
        onClickNoIncome: this.onClickNoIncome,
        onClickYesIncome: this.onClickYesIncome
      });
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

    onCheckDisabilityBenefits: function (event) {
      this.onUpdateHouseholdMember("disability_benefits", event);
    },

    onCheckChildSupport: function (event) {
      this.onUpdateHouseholdMember("receiving_child_support", event);
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
        hasResponseFromServer: false,
        documentsDataFromServer: null,
        userSubmittedData: DefaultData
      });
    },

    renderResultsFromServer: function () {
      var results = this.state.documentsDataFromServer;

      return createEl(DocumentResultsDisplay, {
          singlePersonHousehold: this.state.singlePersonHousehold,
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
