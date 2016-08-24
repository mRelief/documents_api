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

      if (userSubmittedData.employee === 'false' &&
          userSubmittedData.self_employed === 'false' &&
          userSubmittedData.retired === 'false' &&
          userSubmittedData.unemployment_benefits === 'false') return null;

      return dom.li({},
        this.confirmationSentence(),
        dom.br({}),
        dom.br({})
      );
    },

    incomeSources: function () {
      var sources = [];
      var userData = this.props.userSubmittedData;
      var single_person = this.props.singlePersonHousehold;

      if (userData.employee === 'true' && single_person) {
        sources.push('employed');
      } else if (userData.employee === 'true' && !single_person) {
        sources.push('employment');
      };

      if (userData.self_employed === 'true' && single_person) {
        sources.push('self-employed');
      } else if (userData.self_employed === 'true' && !single_person) {
        sources.push('self-employment');
      };

      if (userData.retired === 'true' && single_person) {
        sources.push('retired');
      } else if (userData.retired === 'true' && !single_person) {
        sources.push('retirement');
      };

      if (userData.unemployment_benefits === 'true' && single_person) {
        sources.push('receiving unemployment benefits');
      } else if (userData.unemployment_benefits === 'true' && !single_person) {
        sources.push('unemployment benefits');
      };

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
        var sentenceSubjectAndVerb = 'You are';
      } else {
        var sentenceSubjectAndVerb = 'Your family is receiving income from';
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
