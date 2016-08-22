(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;
  var createEl = React.createElement.bind(React);

  window.shared.EmploymentStatusConfirmation = React.createClass({

    propTypes: {
      userSubmittedData: React.PropTypes.object.isRequired,
      singlePersonHousehold: React.PropTypes.bool.isRequired,
    },

    render: function () {
      var userSubmittedData = this.props.userSubmittedData;

      if (userSubmittedData.employee === 'true') {
        var confirmationSentence = 'You are an employee.';
      } else if (userSubmittedData.self_employed === 'true') {
        var confirmationSentence = 'You are self-employed.';
      } else if (userSubmittedData.retired === 'true') {
        var confirmationSentence = 'You are retired.';
      } else if (userSubmittedData.unemployment_benefits === 'true') {
        var confirmationSentence = 'You are receiving unemployment benefits.';
      };

      return dom.li({},
        confirmationSentence,
        dom.br({}),
        dom.br({})
      );
    }

  });

})();
