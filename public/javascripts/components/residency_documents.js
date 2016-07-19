(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;

  window.shared.ResidencyDocuments = React.createClass({

    propTypes: {
      documents: React.PropTypes.object.isRequired
    },

    filteredDocs: function () {
      // Exclude State ID because it's shown up top.

      return this.props.documents.filter(function (document) {
        return document.official_name !== 'State ID';
      });
    },

    docOfficialNames: function () {
      return this.filteredDocs().map(function (document) {
        return document.official_name;
      });
    },

    docsList: function () {
      return this.docOfficialNames().map(function (document_name) {
        return dom.li({}, document_name);
      });
    },

    render: function () {
      return dom.div({},
        dom.span({}, 'You could also use '),
        dom.span({ style: { fontWeight: 'bold' } }, 'any '),
        dom.span({}, 'of the following documents to prove residency:'),
        dom.ul({},
          this.docsList()
        )
      );
    }

  });

})();
