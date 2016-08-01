(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;

  window.shared.NumberOfPeopleQuestion = React.createClass({

    render: function () {
      return dom.div({},
        dom.h1({}, 'See what documents you need for Food Stamps'),
        dom.p({}, 'How many people are you applying for?'),
        dom.input({ type: 'radio', name: 'NumberOfPeopleQuestion' }),
        dom.label({}, '  Just Me'),
        dom.br({}),
        dom.input({ type: 'radio', name: 'NumberOfPeopleQuestion' }),
        dom.label({}, '  My Family')
      );
    },

  });

})();
