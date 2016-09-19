(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;

  window.shared.CitizenshipQuestion = React.createClass({

    propTypes: {
      onCheckNotAllCitizens: React.PropTypes.func.isRequired,
      onCheckYesAllCitizens: React.PropTypes.func.isRequired,
      singlePersonHousehold: React.PropTypes.bool.isRequired
    },

    render: function () {
      return dom.div({},
        dom.p({}, this.renderQuestionString()),
        dom.input({
          id: 'yesAllCitizensRadioBox',
          type: 'radio',
          name: 'citizenshipQuestion',
          onClick: this.props.onCheckYesAllCitizens,
        }),
        dom.label({}, 'Yes'),
        dom.br({}),
        dom.input({
          id: 'notAllCitizensRadioBox',
          type: 'radio',
          name: 'citizenshipQuestion',
          onClick: this.props.onCheckNotAllCitizens,
        }),
        dom.label({}, 'No'),
        dom.br({}),
        dom.br({})
      );
    },

    renderQuestionString: function () {
      if (this.props.singlePersonHousehold) {
        return 'Are you a US citizen?';
      } else {
        return 'Is everyone in your household a US citizen?';
      };
    }

  });
})();
