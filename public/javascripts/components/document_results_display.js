(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;
  var createEl = React.createElement.bind(React);
  var IdentityDocuments = window.shared.IdentityDocuments;
  var ResidencyDocuments = window.shared.ResidencyDocuments;
  var LinkStyle = window.shared.LinkStyle;
  var ProgressBar = window.shared.ProgressBar;

  window.shared.DocumentResultsDisplay = React.createClass({

    getInitialState: function() {
      return {
        showMoreOptions: false,
      };
    },

    propTypes: {
      singlePersonHousehold: React.PropTypes.bool.isRequired,
      results: React.PropTypes.object.isRequired,
      onClickStartOver: React.PropTypes.func.isRequired
    },

    needsIdentityDocs: function () {
      return (this.props.results.identity_documents.length > 0);
    },

    identityDocs: function () {
      return this.props.results.identity_documents;
    },

    residencyDocs: function () {
      return this.props.results.residency_documents;
    },

    citizenshipDocs: function () {
      return this.props.results.citizenship_documents;
    },

    incomeDocs: function () {
      return this.props.results.income_documents;
    },

    render: function () {
      return dom.div({},
        this.renderProgressBar(),
        dom.h1({}, 'What Documents You Need To Apply For Food Stamps'),
        this.renderDocs(),
        dom.br({}),
        this.renderStartOverButton()
      );
    },

    renderDocs: function () {
      return dom.div({},
        this.renderStateIdSection(),
        this.renderMoreResidencyAndIdentityOptions(),
        this.renderIncomeDocs(),
        this.renderCitizenshipDocs(),
        createEl(ReactTooltip, { id: 'state-id-explanation' })
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

    renderProgressBar: function () {
      return createEl(ProgressBar, { step: 3 });
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

    renderMoreResidencyAndIdentityOptions: function () {
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

    renderIncomeDocs: function () {
      var docs = this.incomeDocs();

      if (docs.length === 0) return null;

      if (docs.length === 1) return dom.div({},
        dom.span({}, 'You will also need your '),
        dom.span(
          { style: { fontWeight: 'bold' } },
        docs[0].official_name + '.'),
        dom.br({}),
        dom.br({})
      );

      if (this.props.singlePersonHousehold) {
        return dom.div({},
          dom.span({}, 'You will also need '),
          dom.span({ style: { fontWeight: 'bold' } }, 'all '),
          dom.span({}, 'of the following documents:'),
          dom.ul({}, this.incomeDocsList())
        );
      } else {
        return dom.div({},
          dom.span({}, 'You will also need '),
          dom.span({ style: { fontWeight: 'bold' } }, 'all '),
          dom.span({}, 'of these documents for family members receiving income:'),
          dom.ul({}, this.incomeDocsList())
        );
      }
    },

    incomeDocsList: function () {
      return this.incomeDocs().map(function (document) {
        return dom.li({}, document.official_name);
      });
    },

    renderCitizenshipDocs: function () {
      if (this.citizenshipDocs().length === 0) return null;

      return dom.div({},
        dom.span({}, 'You will need '),
        dom.span({ style: { fontWeight: 'bold' } }, 'I-90 Documentation'),
        dom.span({}, ' for all non-citizen family members.'),
        dom.br({})
      );
    }

  });
})();
