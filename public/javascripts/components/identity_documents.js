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

    render: function () {
      var docsList = this.props.documents.map(function (document_name) {
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
    }

  });

})();
