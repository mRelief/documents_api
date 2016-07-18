(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;
  var createEl = React.createElement.bind(React);
  var IdentityDocuments = window.shared.IdentityDocuments;
  var ResidencyDocuments = window.shared.ResidencyDocuments;

  window.shared.DocumentResultsDisplay = React.createClass({

    propTypes: {
      results: React.PropTypes.object.isRequired
    },

    render: function () {
      return dom.div({},
        dom.h1({}, 'What You Will Need'),
        createEl(ResidencyDocuments, { documents: this.residencyDocuments() }),
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

      var listOfPersonDocumentsNeeded = documentsNeeded.filter(function(doc) {
        return doc.name !== 'Identity';
      }).map(function(doc) {
        return dom.li({}, doc.official_name);
      });

      var shouldRenderIdentityDocs = documentsNeeded.find(this.findIdentityDocuments);

      if (shouldRenderIdentityDocs) {
        var identityDocsList = createEl(IdentityDocuments, {
          documents: shouldRenderIdentityDocs.documents
        })
      } else {
        var identityDocsList = null;
      }

      return dom.div({},
        identityDocsList,
        dom.span({}, 'You will need '),
        dom.span({ style: { fontWeight: 'bold' } }, 'all '),
        dom.span({}, 'of these documents:'),
        dom.ul({},
          listOfPersonDocumentsNeeded,
          this.listOfOtherDocumentsNeeded()
        )
      );
    },

    residencyDocuments: function () {
      return this.otherDocumentsNeeded().find(this.findResidencyDocuments).documents;
    },

    findResidencyDocuments: function (documents) {
      return documents.name === 'Residency';
    },

    findIdentityDocuments: function (documents) {
      return documents.name === 'Identity';
    },

    otherDocumentsNeeded: function () {
      return this.props.results.other_documents_needed;
    },

    listOfOtherDocumentsNeeded: function () {
      return this.otherDocumentsNeeded().filter(function(doc) {
        return (doc.name !== 'Residency' && doc.name !== 'Identity');
      }).map(function (doc) {
        return dom.li({}, doc.official_name);
      });
    },

    householdMembers: function () {
      return this.props.results.household_members;
    }

  });
})();
