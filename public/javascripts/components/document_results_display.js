(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;

  window.shared.DocumentResultsDisplay = React.createClass({

    propTypes: {
      results: React.PropTypes.object.isRequired
    },

    render: function () {
      return dom.div({},
        dom.h1({}, 'Document and Info You\'ll Need'),
        dom.p({}, this.otherDocumentsNeeded()[0].name)
      )
    },

    otherDocumentsNeeded: function () {
      return this.props.results.other_documents_needed;
    },

    householdMembers: function () {
      return this.props.results.household_members;
    }

  });
})();
