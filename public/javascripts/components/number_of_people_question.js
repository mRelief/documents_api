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
        dom.p({}, 'How many people are you applying for?'),
        dom.input({
          type: 'radio',
          name: 'NumberOfPeopleQuestion',
          onClick: this.props.onClickJustMe,
          defaultChecked: (this.props.userWentBack && this.props.singlePersonHousehold)
        }),
        dom.label({}, '  Just Me'),
        dom.span({
          style: window.shared.SmallLinkStyle,
          'data-for': 'just-me-explanation',
          'data-tip': 'You buy and cook food for just yourself.'
         }, '\u00a0 (?)'),
        dom.br({}),
        dom.input({
          type: 'radio',
          name: 'NumberOfPeopleQuestion',
          onClick: this.props.onClickMyFamily,
          defaultChecked: (this.props.userWentBack && !this.props.singlePersonHousehold)
        }),
        dom.label({}, '  Me and My Family'),
        dom.span({
          style: window.shared.SmallLinkStyle,
          'data-for': 'my-family-explanation',
          'data-tip': 'You buy and cook food for you and your family.'
        }, '\u00a0 (?)'),
        dom.br({}),
        dom.br({}),
        createEl(ReactTooltip, { id: 'just-me-explanation' }),
        createEl(ReactTooltip, { id: 'my-family-explanation' })
      );
    }

  });

})();
