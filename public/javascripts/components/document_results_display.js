(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;
  var createEl = React.createElement.bind(React);
  var IdentityDocuments = window.shared.IdentityDocuments;
  var ResidencyDocuments = window.shared.ResidencyDocuments;
  var LinkStyle = window.shared.LinkStyle;

  window.shared.DocumentResultsDisplay = React.createClass({

    getInitialState: function() {
      return {
        showMoreOptions: false,
      };
    },

    propTypes: {
      singlePersonHousehold: React.PropTypes.bool.isRequired,
      householdMembers: React.PropTypes.array.isRequired,
      otherDocumentsNeeded: React.PropTypes.array.isRequired,
      onClickStartOver: React.PropTypes.func.isRequired
    },

    applicant: function () {
      return this.props.householdMembers[0];
    },

    needsIdentityDocs: function () {
      return this.applicant().needs_identity_docs;
    },

    findResidencyDocuments: function (documents) {
      return documents.name === 'Residency';
    },

    findIdentityDocuments: function (documents) {
      return documents.name === 'Identity';
    },

    identityDocs: function () {
      return this.applicant().documents_needed.find(this.findIdentityDocuments).documents;
    },

    residencyDocs: function () {
      return this.props.otherDocumentsNeeded.find(this.findResidencyDocuments).documents;
    },

    render: function () {
      return dom.div({},
        dom.h1({}, 'What You Will Need'),
        this.renderDocsNeeded(),
        dom.br({}),
        this.renderStartOverButton()
      );
    },

    renderStartOverButton: function () {
      return dom.input({
        type: 'submit',
        value: 'Start Over',
        onClick: this.props.onClickStartOver,
        style: window.shared.ButtonStyle
      });
    },

    renderDocsNeeded: function () {
      return dom.div({},
        this.renderStateIdSection(),
        this.renderAlternateDocs(),
        this.renderAdditionalDocsNeeded(),
        createEl(ReactTooltip, { id: 'state-id-explanation', type: 'info' })
      );
    },

    renderStateIdSection: function () {
      if (this.state.showMoreOptions === true) return null;

      return dom.div({},
        this.renderStateIdStatement(),
        dom.span({}, '\u00a0 \u00a0'),
        dom.br({}),
        dom.a({
          onClick: this.toggleIdExplanation,
          style: LinkStyle,
          'data-for': 'state-id-explanation',
          'data-tip': this.stateIdExplanation()
        }, 'Why?'),
        dom.span({}, '\u00a0 \u00a0'),
        dom.a({
          onClick: this.toggleShowMoreOptions,
          style: LinkStyle
        }, this.noStateIdString()),
        dom.br({}),
        dom.br({})
      );
    },

    renderStateIdStatement: function () {
      if (this.props.singlePersonHousehold) {
        return dom.span({},
          dom.span({}, 'You will need your '),
          dom.span({ style: { fontWeight: 'bold' } }, 'State ID.')
        )
      } else {
        return dom.span({},
          dom.span({}, 'You will need a '),
          dom.span({ style: { fontWeight: 'bold' } }, 'State ID'),
          dom.span({}, ' for all adult members of your family.')
        )
      }
    },

    noStateIdString: function () {
      if (this.props.singlePersonHousehold) {
        return 'I don\'t have a state ID.';
      } else {
        return 'Someone doesn\'t have a state ID.';
      }
    },

    renderAlternateDocs: function () {
      if (this.state.showMoreOptions === false) return null;

      if (this.needsIdentityDocs()) {
        var identityDocs = createEl(IdentityDocuments, { documents: this.identityDocs() });
      } else {
        var identityDocs = null;
      };

      var residencyDocs = createEl(ResidencyDocuments, { documents: this.residencyDocs() });

      return dom.div({}, identityDocs, residencyDocs);
    },

    stateIdExplanation: function () {
      if (this.needsIdentityDocs() === true) {
        var reasons = 'residency and identity.'
      } else {
        var reasons = 'residency.'
      };

      return 'You need your State ID to prove ' + reasons;
    },

    toggleShowMoreOptions: function () {
      var currentStatus = this.state.showMoreOptions;
      this.setState({ showMoreOptions: !currentStatus });
    },

    renderAdditionalDocsNeeded: function () {
      var additionalDocsNeeded = this.additionalDocsNeeded();

      if (additionalDocsNeeded.length === 0) return null;

      if (additionalDocsNeeded.length === 1) return dom.div({},
        dom.span({}, 'You will also need your '),
        dom.span(
          { style: { fontWeight: 'bold' } },
        additionalDocsNeeded[0].official_name + '.'),
        dom.br({}),
        dom.br({})
      );

      return dom.div({},
        dom.span({}, 'You will also need '),
        dom.span({ style: { fontWeight: 'bold' } }, 'all '),
        dom.span({}, 'of the following documents:'),
        dom.ul({},
          this.additionalDocsList()
        )
      );
    },

    additionalDocsList: function () {
      return this.additionalDocsNeeded().map(function (document) {
        return dom.li({}, document.official_name);
      });
    },

    additionalDocsNeeded: function () {
      // Merge together household member docs needed (besides Identity)
      // with other docs needed (besides Residency):

      var householdDocs = this.applicant().documents_needed.filter(function (document) {
        return document.name !== 'Identity';
      });

      var otherDocs = this.props.otherDocumentsNeeded.filter(function (document) {
        return document.name !== 'Residency';
      });

      return householdDocs.concat(otherDocs);
    },

  });
})();
