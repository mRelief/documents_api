(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;

  window.shared.ResidencyDocuments = React.createClass({

    propTypes: {
      documents: React.PropTypes.array.isRequired
    },

    docsList: function () {
      return this.props.documents.filter(function (document) {
        // Exclude State ID because it's shown up top.
        return document.official_name !== 'State ID';
      }).map(function (document) {
        return dom.li({}, document.official_name);
      });
    },

    render: function () {
      return dom.div({},
        dom.span({}, 'You can use '),
        dom.span({ style: { fontWeight: 'bold' } }, 'any '),
        dom.span({}, 'of the following documents besides State ID to prove your residency:'),
        dom.ul({},
          this.docsList()
        )
      );
    }

  });

})();
