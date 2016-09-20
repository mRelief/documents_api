(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;

  window.shared.IncomeDocumentsList = React.createClass({

    propTypes: {
      documents: React.PropTypes.array.isRequired,
      multiMemberHousehold: React.PropTypes.bool.isRequired,
      renderTooltip: React.PropTypes.func.isRequired
    },

    render: function () {
      return dom.span({}, this.list());
    },

    list: function () {
      var self = this;

      return this.props.documents.map(function (doc) {
        if (doc.url_to_document) {
          return self.renderDocumentWithUrl(doc);
        } else if (doc.official_name === 'Pay Stubs for the Past 30 Days' &&
                   self.props.multiMemberHousehold) {
          return self.renderMultiMemberHouseholdPayStubs(doc);
        } else {
          return dom.li({}, doc.official_name, self.props.renderTooltip());
        };
      })
    },

    renderDocumentWithUrl: function (document) {
      return dom.li({},
        dom.a({
          href: document.url_to_document, target: '_blank', rel: 'noopener noreferrer'
        }, document.official_name), this.props.renderTooltip()
      );
    },

    renderMultiMemberHouseholdPayStubs: function (document) {
      return dom.li({},
        document.official_name + ' (for all employed members of your family)',
        this.props.renderTooltip()
      );
    },

  });

})();
