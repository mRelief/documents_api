(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;
  var createEl = React.createElement.bind(React);
  var DocumentResultsDisplay = window.shared.DocumentResultsDisplay;
  var InitialIncomeQuestion = window.shared.InitialIncomeQuestion;
  var EmploymentQuestion = window.shared.EmploymentQuestion;

  var DocumentScreener = React.createClass({

    getInitialState: function() {
      return {
        answeredInitialIncomeQuestion: false,
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
          "is_applying_for_expedited": "false"
        }
      };
    },

    getDefaultProps: function() {
      return {
        source: 'http://localhost:4567/api/'
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
      var queryString = JSON.stringify(this.state.userSubmittedData);

      this.serverRequest = $.get({
        url: this.props.source + queryString,
        dataType: 'json',
        contentType: 'application/json',
        success: function (result) {
          this.setState({
            hasResponseFromServer: true,
            documentsDataFromServer: result
          });
        }.bind(this)
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
          currentQuestion = createEl(InitialIncomeQuestion, {
            onClickNoIncome: this.onClickNoIncome,
            onClickYesIncome: this.onClickYesIncome
          });
        } else if (this.state.answeredEmploymentQuestion === false) {
          currentQuestion = createEl(EmploymentQuestion, {
            onCheckEmployee: this.onCheckEmployee,
            onCheckSelfEmployed: this.onCheckSelfEmployed,
            onCheckRetired: this.onCheckRetired,
            onCheckUnemployedYesBenefits: this.onCheckUnemployedYesBenefits,
            onCheckUnemployedNoBenefits: this.onCheckUnemployedNoBenefits,
            onClickNextFromEmploymentQuestion: this.onClickNextFromEmploymentQuestion
          });
        } else {
          currentQuestion = this.renderIncomeSourcesQuestion();
        };
      }

      return dom.div({},
        currentQuestion,
        resultsFromServer
      )
    },

    onCheckEmployee: function (event) {
      var userSubmittedData = this.state.userSubmittedData;

      if (event.target.checked) {
        userSubmittedData["household_members"][0]["is_employee"] = "true";
      } else {
        userSubmittedData["household_members"][0]["is_employee"] = "false";
      };

      this.setState({ userSubmittedData: userSubmittedData });
    },

    onCheckSelfEmployed: function () {

    },

    onCheckRetired: function () {

    },

    onCheckUnemployedYesBenefits: function () {

    },

    onCheckUnemployedNoBenefits: function () {

    },

    onClickNextFromEmploymentQuestion: function () {

    },

    renderIncomeSourcesQuestion: function () {
      return dom.div({},
        dom.p({}, 'Which of the following do you receive:'),
        dom.input({ type: 'checkbox'}),
        dom.label({}, 'Disability benefits'),
        dom.br({}),
        dom.input({ type: 'checkbox'}),
        dom.label({}, 'Child support'),
        dom.br({}),
        dom.input({ type: 'checkbox'}),
        dom.label({}, 'Rental income'),
        dom.br({}),
        dom.input({ type: 'checkbox'}),
        dom.label({}, 'None of the above'),
        dom.br({}),
        dom.br({}),
        dom.input({ type: 'submit', value: 'Next' })
      );
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
