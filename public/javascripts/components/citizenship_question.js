(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;

  window.shared.CitizenshipQuestion = React.createClass({

    propTypes: {
      onCheckNotAllCitizens: React.PropTypes.func.isRequired,
      onCheckYesAllCitizens: React.PropTypes.func.isRequired,
    },

    render: function () {
      return dom.div({},
        dom.p({}, 'Is everyone in your household a US citizen?'),
        dom.em({}, 'NOTE: We do not store your response to this question.'),
        dom.br({}),
        dom.br({}),
        dom.input({
          type: 'radio',
          name: 'citizenshipQuestion',
          onClick: this.props.onCheckYesAllCitizens,
        }),
        dom.label({}, 'Yes'),
        dom.br({}),
        dom.input({
          type: 'radio',
          name: 'citizenshipQuestion',
          onClick: this.props.onCheckNotAllCitizens,
        }),
        dom.label({}, 'No'),
        dom.br({}),
        dom.br({})
      );
    }

  });
})();
