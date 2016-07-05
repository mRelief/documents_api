(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;
  var createEl = React.createElement.bind(React);
  var DocumentResultsDisplay = window.shared.DocumentResultsDisplay;

  var DocumentScreener = React.createClass({

    getInitialState: function() {
      return {
        answeredInitialIncomeQuestion: false,
        answeredEmploymentQuestion: false,
        answeredIncomeSourcesQuestion: false,
        hasResponseFromServer: false,
        documentsDataFromServer: null
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
      var queryString = JSON.stringify({
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
      });

      this.serverRequest = $.get({
        url: this.props.source + queryString,
        dataType: 'json',
        contentType: 'application/json',
        success: function (result) {
          console.log(result);
          this.setState({
            answeredInitialIncomeQuestion: true,
            answeredEmploymentQuestion: false,
            answeredIncomeSourcesQuestion: false,
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
          currentQuestion = this.renderIntitialIncomeQuestion();
        } else if (this.state.answeredEmploymentQuestion === false) {
          currentQuestion = this.renderEmploymentStatusQuestion();
        } else {
          currentQuestion = this.renderIncomeSourcesQuestion();
        };
      }

      return dom.div({},
        currentQuestion,
        resultsFromServer
      )
    },

    renderIntitialIncomeQuestion: function () {
      return dom.div({},
        dom.p({}, 'Are you currently receiving any income through employment, the state, or some other means?'),
        dom.input({ type: 'radio', onClick: this.onClickYesIncome }),
        dom.label({}, 'Yes'),
        dom.br({}),
        dom.input({ type: 'radio', onClick: this.onClickNoIncome }),
        dom.label({}, 'No')
      );
    },

    renderEmploymentStatusQuestion: function () {
      return dom.div({},
        dom.p({}, 'Select all that apply to your employment status:'),
        dom.input({ type: 'checkbox'}),
        dom.label({}, 'Employee or contractor'),
        dom.br({}),
        dom.input({ type: 'checkbox'}),
        dom.label({}, 'Self-employed'),
        dom.br({}),
        dom.input({ type: 'checkbox'}),
        dom.label({}, 'Retired'),
        dom.br({}),
        dom.input({ type: 'checkbox'}),
        dom.label({}, 'Unemployed and receiving unemployment benefits'),
        dom.br({}),
        dom.input({ type: 'checkbox'}),
        dom.label({}, 'Unemployed and not receiving unemployment benefits'),
        dom.input({ type: 'submit' })
      );
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
        dom.input({ type: 'submit' })
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
