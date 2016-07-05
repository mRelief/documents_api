(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;

  window.shared.EmploymentQuestion = React.createClass({

    render: function () {
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
        dom.br({}),
        dom.br({}),
        dom.input({ type: 'submit', value: 'Next' })
      );
    }

  });
})();
