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
      return dom.div({
          style: {
            position: 'relative',
            top: '160px',
            marginBottom: '80px'
          }
        },
        this.renderProgressBar(),
        dom.h1({}, 'What Documents You Need To Apply For Food Stamps:'),
        this.renderRequiredDocs(),
        this.renderSuggestedDocs(),
        dom.br({}),
        this.renderStartOverButton()
      );
    },

    renderRequiredDocs: function () {
      return dom.div({},
        dom.p({}, 'You will need:'),
        dom.ul({},
          this.renderIdentityAndResidencyDocs(),
          this.renderIncomeDocs(),
          this.renderCitizenshipDocs()
        ),
        createEl(ReactTooltip, { id: 'state-id-explanation' })
      );
    },

    renderIdentityAndResidencyDocs: function () {
      // render state id if there's a state id...
      // if not:
         // render identity docs
         // render residency docs
    },

    renderSuggestedDocs: function () {
      var identityDocNames = this.identityDocs().map(function(doc) { return doc.official_name });
      var hasBirthCertificate = (identityDocNames.indexOf('Birth Certificate') > -1);
      var hasSocial = (identityDocNames.indexOf('Social Security Card') > -1);
      var hasStateId = (identityDocNames.indexOf('State ID') > -1);

      if (!hasSocial && !hasBirthCertificate) return null;
      if (!hasStateId) return null;

      if (hasSocial && hasBirthCertificate) {
         var statement = 'Since you have a Birth Certificate and Social Security Card, bring them just in case.';
      } else if (hasBirthCertificate) {
         var statement = 'Since you have a Birth Certificate, bring it just in case.';
      } else if (hasSocial) {
         var statement = 'Since you have a Social Security Card, bring it just in case.';
      };

      return dom.div({},
        dom.p({}, statement),
        dom.br({})
      )
    },

    renderIncomeDocs: function () {
      return this.incomeDocs().map(function (document) {
        if (document.url_to_document) {
          return dom.li({},
            dom.a({
              href: document.url_to_document,
              target: '_blank',
              rel: 'noopener noreferrer'
            }, document.official_name)
          );
        } else if (document.official_name === 'Pay Stubs for the Past 30 Days' &&
                   !this.props.singlePersonHousehold) {
          return dom.li({}, document.official_name + ' (for all employed members of your family)');
        } else {
          return dom.li({}, document.official_name);
        };
      });
    },

    renderCitizenshipDocs: function () {
      if (this.citizenshipDocs().length === 0) return null;

      return dom.li({},
        dom.span({ style: { fontWeight: 'bold' } }, 'I-90 Documentation'),
        dom.span({}, ' for all non-citizen family members.')
      );
    }
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
