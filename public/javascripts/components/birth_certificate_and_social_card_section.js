(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;
  var createEl = React.createElement.bind(React);

  window.shared.BirthCertificateAndSocialCardSection = React.createClass({

    propTypes: {
      hasSocial: React.PropTypes.bool.isRequired,
      hasBirthCertificate: React.PropTypes.bool.isRequired
    },

    render: function () {
      if (!this.props.hasSocial && !this.props.hasBirthCertificate) return null;

      return dom.div({},
        dom.span({},
          this.statement(),
          dom.span({}, '\u00a0 \u00a0'),
          this.explanation()
        ),
        createEl(ReactTooltip, { id: 'birth-and-social-explanation' }),
        dom.br({}),
        dom.br({})
      )
    },

    statement: function () {
      if (this.props.hasSocial && this.props.hasBirthCertificate) {
        return 'Since you have a Birth Certificate and Social Security Card, bring them just in case.';
      } else if (this.props.hasBirthCertificate) {
        return 'Since you have a Birth Certificate, bring it just in case.';
      } else if (this.props.hasSocial) {
        return 'Since you have a Social Security Card, bring it just in case.';
      };
    },

    explanation: function () {
      return dom.a({
        style: window.shared.LinkStyle,
        'data-for': 'birth-and-social-explanation',
        'data-tip': 'The Food Stamps Office may be able to electronically verify this information for you.'
      }, 'Why?')
    },

  });

})();
