(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;
  var createEl = React.createElement.bind(React);
  var LinkStyle = window.shared.LinkStyle;
  var ProgressBar = window.shared.ProgressBar;
  var IncomeDocumentsList = window.shared.IncomeDocumentsList;
  var BirthCertificateAndSocialCardSection = window.shared.BirthCertificateAndSocialCardSection;

  window.shared.DocumentResultsDisplay = React.createClass({

    getInitialState: function() {
      return {
        showMoreOptions: false,
      };
    },

    propTypes: {
      singlePersonHousehold: React.PropTypes.bool.isRequired,
      results: React.PropTypes.object.isRequired,
      onClickStartOver: React.PropTypes.func.isRequired,
      identityDocuments: React.PropTypes.array.isRequired,      // One-of-the-above
      residencyDocuments: React.PropTypes.array.isRequired,     // One-of-the-above
      citizenshipDocuments: React.PropTypes.array.isRequired,   // Single item
      incomeDocuments: React.PropTypes.array.isRequired,        // All-of-the-above
    },

    render: function () {
      return dom.div({
          style: {
            position: 'relative',
            top: '160px',
            marginBottom: '80px'
          }
        },
        this.renderProgressBar(),
        dom.h1({}, 'What Documents You Need To Apply For Food Stamps:'),
        dom.br({}),
        this.renderRequiredDocs(),
        this.renderSuggestedDocs(),
        dom.br({}),
        this.renderStartOverButton(),
        this.renderReactTooltips()
      );
    },

    renderRequiredDocs: function () {
      return dom.div({},
        this.renderAllOfTheAboveList(),
        this.renderResidencyDocs(),
        this.renderAlternativeIdentityDocs()
      );
    },

    renderAllOfTheAboveList: function () {
      if (this.props.incomeDocuments.length === 0 &&
          this.props.citizenshipDocuments.length === 0 &&
          !(this.hasBirthCertificate()) &&
          !(this.hasSocial()) &&
          !(this.hasStateId())) return null;

      return dom.div({},
        dom.p({}, 'You will need all of these documents:'),
        dom.ul({},
          this.renderIdentityDocs(),
          this.renderIncomeDocs(),
          this.renderCitizenshipDocs()
        )
      );
    },

    identityDocumentNames: function () {
      return this.props.identityDocuments.map(function(doc) { return doc.official_name });
    },

    hasBirthCertificate: function () {
      return this.identityDocumentNames().indexOf('Birth Certificate') > -1;
    },

    hasSocial: function () {
      return this.identityDocumentNames().indexOf('Social Security Card') > -1;
    },

    hasStateId: function () {
      return this.identityDocumentNames().indexOf('State ID') > -1;
    },

    multiMemberHousehold: function () {
      return !(this.props.singlePersonHousehold);
    },

    renderIdentityDocs: function () {
      var hasSocial = this.hasSocial();
      var hasBirthCertificate = this.hasBirthCertificate();
      var hasStateId = this.hasStateId();

      if (hasStateId) {
        return dom.li({}, 'State ID', this.renderStateIdTooltip());
      } else if (hasBirthCertificate || hasSocial) {
        return this.renderBirthCertificateAndOrSocial();
      } else {
        return null;
      };
    },

    renderBirthCertificateAndOrSocial: function () {
      var hasBirthCertificate = this.hasBirthCertificate();
      var hasSocial = this.hasSocial();

      if (hasBirthCertificate && hasSocial) {
        return dom.span({},
          dom.li({}, 'Birth Certificate', this.renderIdentityTooltip()),
          dom.li({}, 'Social Security Card', this.renderIdentityTooltip())
        );
      } else if (hasBirthCertificate) {
        return dom.li({}, 'Birth Certificate', this.renderIdentityTooltip());
      } else if (hasSocial) {
        return dom.li({}, 'Social Security Card', this.renderIdentityTooltip());
      };
    },

    renderResidencyDocs: function () {
      if (this.hasStateId()) return null;

      var residencyDocumentList = this.props.residencyDocuments.map(function(document) {
        return dom.li({}, document.official_name);
      });

      return dom.div({},
        dom.br({}),
        dom.p({}, 'You will need *ONE* of these documents to prove residency:'),
        dom.ul({}, residencyDocumentList)
      );
    },

    renderAlternativeIdentityDocs: function () {
      var hasSocial = this.hasSocial();
      var hasBirthCertificate = this.hasBirthCertificate();
      var hasStateId = this.hasStateId();

      if (hasSocial || hasBirthCertificate || hasStateId) return null;

      var alternativeIdentityDocuments = this.props.identityDocuments;

      if (alternativeIdentityDocuments.length === 0) return null;

      return dom.div({},
        dom.br({}),
        dom.p({}, 'You will need *ONE* of these documents to prove identity:'),
        dom.ul({},
          alternativeIdentityDocuments.map(function(doc) { return dom.li({}, doc.official_name); })
        )
      );
    },

    renderSuggestedDocs: function () {
      var hasSocial = this.hasSocial();
      var hasBirthCertificate = this.hasBirthCertificate();
      var hasStateId = this.hasStateId();

      if (!hasSocial && !hasBirthCertificate) return null;
      if (!hasStateId) return null;   // If the applicant has no State ID,
                                      // Birth Certificate/Social are required,
                                      // not suggested.

      return createEl(BirthCertificateAndSocialCardSection, {
        hasSocial: this.hasStateId(),
        hasBirthCertificate: this.hasBirthCertificate()
      });
    },

    renderIncomeDocs: function () {
      return createEl(IncomeDocumentsList, {
        documents: this.props.incomeDocuments,
        multiMemberHousehold: this.multiMemberHousehold(),
        renderTooltip: this.renderIncomeTooltip,
      });
    },

    renderCitizenshipDocs: function () {
      if (this.props.citizenshipDocuments.length === 0) return null;
      return dom.li({}, 'I-90 Documentation for all non-citizen family members');
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
      return createEl(ProgressBar, { step: 4 });
    },

    renderReactTooltips: function () {
      return dom.div({},
        createEl(ReactTooltip, { id: 'state-id-explanation' }),
        createEl(ReactTooltip, { id: 'income-explanation' }),
        createEl(ReactTooltip, { id: 'identity-explanation' })
      );
    },

    renderStateIdTooltip: function () {
      return dom.span({
        style: window.shared.SmallLinkStyle,
        'data-for': 'state-id-explanation',
        'data-tip': 'This verifies your residency and identity.'
       }, '\u00a0 (?)');
    },

    renderIncomeTooltip: function () {
      return dom.span({
        style: window.shared.SmallLinkStyle,
        'data-for': 'income-explanation',
        'data-tip': 'This verifies your income.'
       }, '\u00a0 (?)');
    },

    renderIdentityTooltip: function () {
      return dom.span({
        style: window.shared.SmallLinkStyle,
        'data-for': 'income-explanation',
        'data-tip': 'This verifies your identity.'
       }, '\u00a0 (?)');
    },

  });
})();
