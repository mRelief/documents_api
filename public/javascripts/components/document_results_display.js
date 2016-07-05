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
        this.renderHouseholdMember()
      )
    },

    renderHouseholdMember: function () {
      // Assuming single-person household for now

      var person = this.householdMembers()[0];
      var informationNeeded = person.information_needed;
      var documentsNeeded = person.documents_needed;

      return dom.div({},
        this.renderHouseholdMemberInformationNeeded(informationNeeded),
        this.renderHouseHoldMemberDocumentsNeeded(documentsNeeded)
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
        dom.p({}, 'You will need these documents:'),
        dom.ul({}, listOfPersonDocumentsNeeded)
      );
    },

    renderResidencyDocuments: function () {
      return dom.div({},
        dom.p({}, 'You will need one of the following documents to prove residency:'),
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

    householdMembers: function () {
      return this.props.results.household_members;
    }

  });
})();
