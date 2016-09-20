(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;
  var createEl = React.createElement.bind(React);
  var IdentityDocuments = window.shared.IdentityDocuments;
  var ResidencyDocuments = window.shared.ResidencyDocuments;
  var LinkStyle = window.shared.LinkStyle;
  var ProgressBar = window.shared.ProgressBar;
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
        this.renderStartOverButton()
      );
    },

    renderRequiredDocs: function () {
      return dom.div({},
        dom.p({}, 'You will need all of these documents:'),
        dom.ul({},
          this.renderIdentityDocs(),
          this.renderIncomeDocs(),
          this.renderCitizenshipDocs()
        ),
        this.renderResidencyDocs(),
        this.renderAlternativeIdentityDocs(),
        createEl(ReactTooltip, { id: 'state-id-explanation' })
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
        return dom.li({}, 'State ID');
      } else if (hasBirthCertificate || hasSocial) {
        return this.renderBirthCertificateAndOrSocial();
      };
    },

    renderBirthCertificateAndOrSocial: function () {
      var hasBirthCertificate = this.hasBirthCertificate();
      var hasStateId = this.hasStateId();

      if (hasBirthCertificate && hasSocial) {
        return dom.span({}, dom.li({}, 'Birth Certificate'), dom.li({}, 'Social Security Card'));
      } else if (hasBirthCertificate) {
        return dom.li({}, 'Birth Certificate');
      } else if (hasSocial) {
        return dom.li({}, 'Social Security Card');
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
      var self = this;
      return this.props.incomeDocuments.map(function (doc) {
        if (doc.url_to_document) {
          return dom.li({},
            dom.a({
              href: doc.url_to_document, target: '_blank', rel: 'noopener noreferrer'
            }, doc.official_name)
          );
        } else if (doc.official_name === 'Pay Stubs for the Past 30 Days' &&
                   self.multiMemberHousehold()) {
          return dom.li({}, doc.official_name + ' (for all employed members of your family)');
        } else {
          return dom.li({}, doc.official_name);
        };
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

  });
})();
