var dom = React.DOM;

var DocumentScreener = React.createClass({

  render: function() {
    return dom.div({},
      dom.h1({}, 'Documents Screener'),
      dom.p({}, 'Are you currently receiving any income through employment, the state, or some other means?'),
      dom.input({ type: 'radio' }),
      dom.label({}, 'Yes'),
      dom.br({}),
      dom.input({ type: 'radio' }),
      dom.label({}, 'No'),
      this.renderEmploymentStatusQuestion(),
      this.renderIncomeSourcesQuestion()
    )
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
      dom.label({}, 'Unemployed and not receiving unemployment benefits')
    )
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
      dom.label({}, 'None of the above')
    )
  }

});

var mainElement = document.getElementById("screener");

ReactDOM.render(React.createElement(DocumentScreener), mainElement);
