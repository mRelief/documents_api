(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;

  window.shared.IncomeSourcesQuestion = React.createClass({

    propTypes: {
      singlePersonHousehold: React.PropTypes.bool.isRequired,
      onUpdateDataField: React.PropTypes.func.isRequired,
      userSubmittedData: React.PropTypes.object.isRequired,
      userWentBack: React.PropTypes.bool.isRequired
    },

    render: function () {
      return dom.div({},
        dom.p({}, this.question()),
        dom.input({
          type: 'checkbox',
          name: 'additionalIncomeQuestion',
          onClick: this.props.onUpdateDataField,
          data: 'disability_benefits',
          defaultChecked: (
            this.props.userWentBack &&
            this.props.userSubmittedData.disability_benefits === 'true'
          )
        }),
        dom.label({}, 'Disability benefits'),
        dom.br({}),
        dom.input({
          type: 'checkbox',
          name: 'additionalIncomeQuestion',
          onClick: this.props.onUpdateDataField,
          data: 'child_support',
          defaultChecked: (
            this.props.userWentBack &&
            this.props.userSubmittedData.child_support === 'true'
          )
        }),
        dom.label({}, 'Child support'),
        dom.br({}),
        dom.input({
          type: 'checkbox',
          name: 'additionalIncomeQuestion',
          onClick: this.props.onUpdateDataField,
          data: 'has_rental_income',
          defaultChecked: (
            this.props.userWentBack &&
            this.props.userSubmittedData.has_rental_income === 'true'
          )
        }),
        dom.label({}, 'Rental income'),
        dom.br({}),
        dom.input({
          type: 'checkbox',
          name: 'additionalIncomeQuestion'
        }),
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
