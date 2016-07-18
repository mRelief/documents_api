(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;
  var createEl = React.createElement.bind(React);
  var DocumentResultsDisplay = window.shared.DocumentResultsDisplay;
  var InitialIncomeQuestion = window.shared.InitialIncomeQuestion;
  var EmploymentQuestion = window.shared.EmploymentQuestion;
  var IncomeSourcesQuestion = window.shared.IncomeSourcesQuestion;
  var HousingQuestion = window.shared.HousingQuestion;

  var DocumentScreener = React.createClass({

    getInitialState: function() {
      return {
        answeredInitialIncomeQuestion: false,
        answeredHousingQuestion: false,
        answeredEmploymentQuestion: false,
        answeredIncomeSourcesQuestion: false,
        hasResponseFromServer: false,
        documentsDataFromServer: null,
        userSubmittedData: {
          "household_members": [
            {
              "child_under_18": "false",
              "disability_benefits": "false",
              "is_employee": "false",
              "self_employed": "false",
              "receiving_child_support": "false",
              "is_retired": "false",
              "receiving_unemployment_benefits": "false",
            }
          ],
          "is_applying_for_expedited": "false",
          "has_rental_income": "false",
          "renting": "false",
          "owns_home": "false",
          "shelter": "false",
        }
      };
    },

    onClickYesIncome: function () {
      this.setState({
        answeredInitialIncomeQuestion: true,
        answeredEmploymentQuestion: false,
        answeredIncomeSourcesQuestion: false,
        hasResponseFromServer: false,
        documentsDataFromServer: null
      });
    },

    onClickNoIncome: function () {
      this.fetchDocumentsFromServer();
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

        if (this.state.answeredInitialIncomeQuestion === false) {
          currentQuestion = this.renderInitialIncomeQuestion();
        } else if (this.state.answeredHousingQuestion == false) {
          currentQuestion = this.renderHousingQuestion();
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

    renderHousingQuestion: function () {
      return createEl(HousingQuestion, {
        onCheckRenting: this.onCheckRenting,
        onCheckOwnHome: this.onCheckOwnHome,
        onCheckShelter: this.onCheckShelter,
        onClickNextFromHousingQuestion: this.onClickNextFromHousingQuestion,
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

    onCheckRenting: function () {
      this.onUpdateHousehold('renting', event);
    },

    onCheckOwnHome: function () {
      this.onUpdateHousehold('owns_home', event);
    },

    onCheckShelter: function () {
      this.onUpdateHousehold('shelter', event);
    },

    onClickNextFromHousingQuestion: function () {
      this.setState({ answeredHousingQuestion: true });
    },

    renderResultsFromServer: function () {
      return createEl(DocumentResultsDisplay,
        { results: this.state.documentsDataFromServer }
      );
    }

  });

  var mainElement = document.getElementById("screener");

  ReactDOM.render(React.createElement(DocumentScreener), mainElement);
})();
