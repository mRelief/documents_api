(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;

  window.shared.IncomeSourcesQuestion = React.createClass({

    propTypes: {
      singlePersonHousehold: React.PropTypes.bool.isRequired,
      onUpdateDataField: React.PropTypes.func.isRequired,
    },

    render: function () {
      return dom.div({},
        dom.p({}, this.question()),
        dom.input({
          type: 'checkbox',
          onClick: this.props.onUpdateDataField,
          data: 'disability_benefits',
        }),
        dom.label({}, 'Disability benefits'),
        dom.br({}),
        dom.input({
          type: 'checkbox',
          onClick: this.props.onUpdateDataField,
          data: 'child_support',
        }),
        dom.label({}, 'Child support'),
        dom.br({}),
        dom.input({
          type: 'checkbox',
          onClick: this.props.onUpdateDataField,
          data: 'has_rental_income',
        }),
        dom.label({}, 'Rental income'),
        dom.br({}),
        dom.input({ type: 'checkbox'}),
        dom.label({}, 'None of the above'),
        dom.br({}),
        dom.br({})
      );
    },

    question: function () {
      return 'Which of the following ' +
              this.familyOrSinglePersonString() +
              ' (you can select multiple options):';
    },

    familyOrSinglePersonString: function () {
      if (this.props.singlePersonHousehold) {
        return 'do you receive';
      } else {
        return 'does your family receive';
      };
    },

  });
})();
