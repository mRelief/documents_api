var dom = React.DOM;

var DocumentScreener = React.createClass({

  getInitialState: function() {
    return {
      answeredInitialIncomeQuestion: false,
      answeredEmploymentQuestion: false,
      answeredIncomeSourcesQuestion: false,
      hasResponse: false,
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
      hasResponse: true,
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
      success: function (result) { alert(result); }
    });
  },

  render: function() {
    if (this.state.answeredInitialIncomeQuestion === false) {
      var currentQuestion = this.renderIntitialIncomeQuestion();
    } else if (this.state.answeredEmploymentQuestion === false) {
      var currentQuestion = this.renderEmploymentStatusQuestion();
    } else {
      var currentQuestion = this.renderIncomeSourcesQuestion();
    };

    return dom.div({},
      dom.h1({}, 'Documents Screener'),
      currentQuestion
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
  }

});

var mainElement = document.getElementById("screener");

ReactDOM.render(React.createElement(DocumentScreener), mainElement);
