(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;

  window.shared.IncomeSourcesQuestion = React.createClass({

    render: function () {
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

  });
})();
