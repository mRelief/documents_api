(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;
  var createEl = React.createElement.bind(React);

  window.shared.AdditionalIncomeConfirmation = React.createClass({

    render: function () {
      var userSubmittedData = this.props.userSubmittedData;
      var single_person = this.props.singlePersonHousehold;

      if (userSubmittedData.disability_benefits === 'false' &&
          userSubmittedData.child_support === 'false' &&
          userSubmittedData.has_rental_income === 'false') return null;

      var incomeSources = [];

      if (userSubmittedData.disability_benefits === 'true') {
        incomeSources.push('disability benefits');
      };

      if (userSubmittedData.child_support === 'true') {
        incomeSources.push('child support');
      };

      if (userSubmittedData.has_rental_income === 'true') {
        incomeSources.push('rental income');
      };

      if (incomeSources.length === 1) {
        var incomeSourcesList = incomeSources[0];
      } else if (incomeSources.length === 2) {
        var incomeSourcesList = incomeSources.join(' and ');
      } else {
        var lastItem = incomeSources[incomeSources.length - 1];
        incomeSources[incomeSources.length - 1] = 'and ' + lastItem;
        var incomeSourcesList = incomeSources.join(', ');
      };

      if (single_person) {
        var sentenceSubjectAndVerb = 'You are receiving';
      } else {
        var sentenceSubjectAndVerb = 'Your family is receiving';
      };

      var sentence = [sentenceSubjectAndVerb,incomeSourcesList].join(' ') + '.';

      return dom.li({},
        dom.span({}, sentence),
        dom.br({}),
        dom.br({})
      );
    },

  });


})();
