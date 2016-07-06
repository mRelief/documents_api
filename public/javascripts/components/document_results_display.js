(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;

  window.shared.DocumentResultsDisplay = React.createClass({

    propTypes: {
      results: React.PropTypes.object.isRequired
    },

    render: function () {
      return dom.div({},
        dom.h1({}, 'What You Will Need'),
        this.renderResidencyDocuments(),
        this.renderHouseholdMember(),
        this.renderOtherDocumentsNeeded()
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
      if (documentsNeeded.length === 0) return null;

      var listOfPersonDocumentsNeeded = documentsNeeded.map(function (doc) {
        return dom.li({}, doc.official_name);
      });

      return dom.div({},
        dom.span({}, 'You will need '),
        dom.span({ style: { fontWeight: 'bold' } }, 'all '),
        dom.span({}, 'of these documents for yourself:'),
        dom.ul({}, listOfPersonDocumentsNeeded)
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
      return this.residencyDocumentOfficialNames().map(function (document_name) {
        return dom.li({}, document_name);
      });
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

    renderOtherDocumentsNeeded: function () {
      var otherDocumentsNeeded = this.otherDocumentsNeeded();
      if (otherDocumentsNeeded.length === 0) return null;

      var listOfOtherDocumentsNeeded = otherDocumentsNeeded.filter(function(doc) {
        return doc.name !== 'Residency';
      }).map(function (doc) {
        return dom.li({}, doc.official_name);
      });

      return dom.div({},
        dom.span({}, 'You will need '),
        dom.span({ style: { fontWeight: 'bold' } }, 'all '),
        dom.span({}, 'of these documents along with your application:'),
        dom.ul({}, listOfOtherDocumentsNeeded)
      );
    },

    householdMembers: function () {
      return this.props.results.household_members;
    }

  });
})();
