(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;

  window.shared.IdentityDocuments = React.createClass({

    propTypes: {
      documents: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
      return {
        showMoreDocs: false
      }
    },

    onClickShowMoreDocs: function () {
      var currentState = this.state.showMoreDocs;
      this.setState({ showMoreDocs: !currentState });
    },

    toggleShowText: function () {
      if (this.state.showMoreDocs) {
        return 'Fewer options';
      } else {
        return 'More options';
      };
    },

    docOfficialNames: function () {
      return this.props.documents.map(function (document) {
        return document.official_name;
      });
    },

    toggleableDocsList: function () {
      var docsList = this.docOfficialNames().map(function (document_name) {
        return dom.li({}, document_name);
      });

      var firstTwoDocs = docsList.splice(0, 2);

      if (this.state.showMoreDocs === false) { docsList = null };

      return dom.div({},
        firstTwoDocs,
        docsList,
        dom.a({
          onClick: this.onClickShowMoreDocs,
          style: {
            color: '#0645AD',
            fontStyle: 'italic',
            fontWeight: 'bold',
            lineHeight: '40px',
            cursor: 'pointer'
          }
        }, this.toggleShowText())
      );
    },

    render: function () {
      return dom.div({},
        dom.span({}, 'You will need '),
        dom.span({ style: { fontWeight: 'bold' } }, 'one '),
        dom.span({}, 'of the following documents to prove identity:'),
        dom.ul({},
          this.toggleableDocsList()
        )
      );
    }

  });

})();
