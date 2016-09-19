(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;

  window.shared.CitizenshipQuestion = React.createClass({

    propTypes: {
      onClickRadioButtonYes: React.PropTypes.func.isRequired,
      onClickRadioButtonNo: React.PropTypes.func.isRequired,
      singlePersonHousehold: React.PropTypes.bool.isRequired
    },

    render: function () {
      return dom.div({},
        dom.p({}, this.renderQuestionString()),
        dom.input({
          type: 'radio',
          name: 'citizenshipQuestion',
          data: 'all_citizens',
          onClick: this.props.onClickRadioButtonYes,
        }),
        dom.label({}, 'Yes'),
        dom.br({}),
        dom.input({
          type: 'radio',
          name: 'citizenshipQuestion',
          data: 'all_citizens',
          onClick: this.props.onClickRadioButtonNo,
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
