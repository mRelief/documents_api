(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;

  window.shared.HousingQuestion = React.createClass({

    propTypes: {
      onCheckRenting: React.PropTypes.func.isRequired,
      onCheckOwnHome: React.PropTypes.func.isRequired,
      onCheckShelter: React.PropTypes.func.isRequired,
      onClickNextFromHousingQuestion: React.PropTypes.func.isRequired,
      onCheckFamilyOrFriends: React.PropTypes.func.isRequired
    },

    render: function () {
      return dom.div({},
        dom.p({}, 'Describe your living situation:'),
        dom.input({ type: 'checkbox', onClick: this.props.onCheckRenting }),
        dom.label({}, 'Renting'),
        dom.br({}),
        dom.input({ type: 'checkbox', onClick: this.props.onCheckOwnHome }),
        dom.label({}, 'Own home'),
        dom.br({}),
        dom.input({ type: 'checkbox', onClick: this.props.onCheckFamilyOrFriends }),
        dom.label({}, 'Living with family/friends'),
        dom.br({}),
        dom.input({ type: 'checkbox', onClick: this.props.onCheckShelter }),
        dom.label({}, 'Shelter'),
        dom.br({}),
        dom.input({ type: 'checkbox' }),
        dom.label({}, 'None of the above'),
        dom.br({}),
        dom.br({}),
        dom.input({
          type: 'submit',
          value: 'Next',
          onClick: this.props.onClickNextFromHousingQuestion,
          style: window.shared.ButtonStyle
        })
      );
    }

  });
})();
