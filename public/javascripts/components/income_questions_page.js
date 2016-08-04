(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;

  window.shared.IncomeQuestionsPage = React.createClass({

    render: function () {
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
    }
  });
})();
