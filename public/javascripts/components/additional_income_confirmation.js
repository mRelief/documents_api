(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;
  var createEl = React.createElement.bind(React);

  window.shared.AdditionalIncomeConfirmation = React.createClass({

    propTypes: {
      userSubmittedData: React.PropTypes.object.isRequired,
      singlePersonHousehold: React.PropTypes.bool.isRequired,
    },

    render: function () {
      var userSubmittedData = this.props.userSubmittedData;

      if (userSubmittedData.disability_benefits === 'false' &&
          userSubmittedData.child_support === 'false' &&
          userSubmittedData.has_rental_income === 'false') return null;

      return dom.li({},
        dom.span({}, this.confirmationSentence()),
        dom.br({}),
        dom.br({})
      );
    },

    incomeSources: function () {
      var sources = [];
      var userData = this.props.userSubmittedData;

      if (userData.disability_benefits === 'true') { sources.push('disability benefits'); };

      if (userData.child_support === 'true') { sources.push('child support'); };

      if (userData.has_rental_income === 'true') { sources.push('rental income'); };

      return sources;
    },

    incomeSourcesEnglishList: function () {
      var list;
      var sources = this.incomeSources();

      if (sources.length === 1) {
        var list = sources[0];
      } else if (sources.length === 2) {
        var list = sources.join(' and ');
      } else {
        var lastItem = sources[sources.length - 1];
        sources[sources.length - 1] = 'and ' + lastItem;
        var list = sources.join(', ');
      };

      return list;
    },

    sentenceSubjectAndVerb: function () {
      var single_person = this.props.singlePersonHousehold;

      if (single_person) {
        var sentenceSubjectAndVerb = 'You are receiving';
      } else {
        var sentenceSubjectAndVerb = 'Your family is receiving';
      };

      return sentenceSubjectAndVerb;
    },

    confirmationSentence: function () {
      return [
        this.sentenceSubjectAndVerb(),
        this.incomeSourcesEnglishList()
      ].join(' ') + '.';
    },

  });

})();
