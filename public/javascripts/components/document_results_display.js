(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;

  window.shared.DocumentResultsDisplay = React.createClass({

    propTypes: {
      results: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
      return {
        showMoreResidencyDocs: false
      };
    },

    render: function () {
      return dom.div({},
        dom.h1({}, 'What You Will Need'),
        this.renderResidencyDocuments(),
        // this.renderOtherDocumentsNeeded(), // <-- merging into household member
                                              // required docs since we are only covering
                                              // the single-member household right now
        this.renderHouseholdMember()
      )
    },

    renderHouseholdMember: function () {
      // Assuming single-person household for now

      var person = this.householdMembers()[0];
      var documentsNeeded = person.documents_needed;
      var informationNeeded = person.information_needed;

      return dom.div({},
        this.renderHouseHoldMemberDocumentsNeeded(documentsNeeded),
        this.renderHouseholdMemberInformationNeeded(informationNeeded)
      )
    },

    renderHouseholdMemberInformationNeeded: function (informationNeeded) {
      if (informationNeeded.length === 0) return null;

      var listOfInformationNeeded = informationNeeded.map(function (info) {
        return dom.li({}, "Your " + info.official_name);
      });

      return dom.div({},
        dom.p({}, 'You will need to know:'),
        dom.ul({}, listOfInformationNeeded)
      );
    },

    renderHouseHoldMemberDocumentsNeeded: function (documentsNeeded) {
      if (documentsNeeded.length === 0 && this.listOfOtherDocumentsNeeded().length === 0) return null;

      var listOfPersonDocumentsNeeded = documentsNeeded.map(function (doc) {
        return dom.li({}, doc.official_name);
      });

      return dom.div({},
        dom.span({}, 'You will need '),
        dom.span({ style: { fontWeight: 'bold' } }, 'all '),
        dom.span({}, 'of these documents:'),
        dom.ul({},
          listOfPersonDocumentsNeeded,
          this.listOfOtherDocumentsNeeded()
        )
      );
    },

    renderResidencyDocuments: function () {
      return dom.div({},
        dom.span({}, 'You will need '),
        dom.span({ style: { fontWeight: 'bold' } }, 'one '),
        dom.span({}, 'of the following documents to prove residency:'),
        dom.ul({},
          this.residencyDocumentNameList()
        )
      );
    },

    residencyDocumentNameList: function () {
      var residencyDocsList = this.residencyDocumentOfficialNames().map(function (document_name) {
        return dom.li({}, document_name);
      });

      var firstTwoResidencyDocs = residencyDocsList.splice(0, 2);

      if (this.state.showMoreResidencyDocs === false) { residencyDocsList = null };

      return dom.div({},
        firstTwoResidencyDocs,
        residencyDocsList,
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

    onClickShowMoreDocs: function () {
      var currentState = this.state.showMoreResidencyDocs;
      this.setState({ showMoreResidencyDocs: !currentState });
    },

    toggleShowText: function () {
      if (this.state.showMoreResidencyDocs) {
        return 'Fewer options';
      } else {
        return 'More options';
      };
    },

    residencyDocumentOfficialNames: function () {
      return this.residencyDocuments().map(function (document) {
        return document.official_name;
      });
    },

    residencyDocuments: function () {
      return this.otherDocumentsNeeded().find(this.findResidencyDocuments).documents;
    },

    findResidencyDocuments: function (documents) {
      return documents.name === 'Residency';
    },

    otherDocumentsNeeded: function () {
      return this.props.results.other_documents_needed;
    },

    listOfOtherDocumentsNeeded: function () {
      return this.otherDocumentsNeeded().filter(function(doc) {
        return doc.name !== 'Residency';
      }).map(function (doc) {
        return dom.li({}, doc.official_name);
      });
    },

    householdMembers: function () {
      return this.props.results.household_members;
    }

  });
})();
