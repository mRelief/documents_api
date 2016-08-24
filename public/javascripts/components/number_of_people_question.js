(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;

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
        dom.br({}),
        dom.input({
          type: 'radio',
          name: 'NumberOfPeopleQuestion',
          onClick: this.props.onClickMyFamily,
          defaultChecked: (this.props.userWentBack && !this.props.singlePersonHousehold)
        }),
        dom.label({}, '  My Family'),
        dom.br({}),
        dom.br({})
      );
    },

  });

})();
