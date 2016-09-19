(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;

  window.shared.BirthCertificateAndSocialCardSection = React.createClass({

    propTypes: {
      hasSocial: React.PropTypes.bool.isRequired,
      hasBirthCertificate: React.PropTypes.bool.isRequired
    },

    render: function () {
      return dom.div({},
        this.statement(),
        this.explanation(),
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
      return dom.p({}, 'Why?');
    }

  });

})();
