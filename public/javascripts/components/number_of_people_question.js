(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;
  var createEl = React.createElement.bind(React);

  window.shared.NumberOfPeopleQuestion = React.createClass({

    propTypes: {
      onClickMyFamily: React.PropTypes.func.isRequired,
      userWentBack: React.PropTypes.bool.isRequired,
      singlePersonHousehold: React.PropTypes.bool.isRequired
    },

    render: function () {
      return dom.div({},
        dom.h1({}, 'See what documents you need for Food Stamps:'),
        dom.br({}),
        dom.p({}, 'How many people are you applying for?'),
        dom.input({
          type: 'radio',
          name: 'NumberOfPeopleQuestion',
          onClick: this.props.onClickJustMe,
          defaultChecked: (this.props.userWentBack && this.props.singlePersonHousehold)
        }),
        dom.label({}, '  Just Me'),
        dom.span({
          style: this.helpButtonStyle(),
          'data-for': 'just-me-explanation',
          'data-tip': 'You buy and cook food for just yourself.'
         }, '?'),
        dom.br({}),
        dom.input({
          type: 'radio',
          name: 'NumberOfPeopleQuestion',
          onClick: this.props.onClickMyFamily,
          defaultChecked: (this.props.userWentBack && !this.props.singlePersonHousehold)
        }),
        dom.label({}, '  My Family'),
        dom.span({
          style: this.helpButtonStyle(),
          'data-for': 'my-family-explanation',
          'data-tip': 'You buy and cook food for your family.'
        }, '?'),
        dom.br({}),
        dom.br({}),
        createEl(ReactTooltip, { id: 'just-me-explanation' }),
        createEl(ReactTooltip, { id: 'my-family-explanation' })
      );
    },

    helpButtonStyle: function () {
      return {
        fontSize: '12px',
        marginLeft: '12px',
        cursor: 'pointer'
      };
    }

  });

})();
