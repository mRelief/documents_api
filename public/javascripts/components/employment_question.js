(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;

  window.shared.EmploymentQuestion = React.createClass({

    propTypes: {
      singlePersonHousehold: React.PropTypes.bool.isRequired,
      onUpdateDataField: React.PropTypes.func.isRequired,
      userSubmittedData: React.PropTypes.object.isRequired,
      userWentBack: React.PropTypes.bool.isRequired
    },

    render: function () {
      return dom.div({},
        dom.p({}, this.renderInstructions()),
        dom.input({
          type: 'checkbox',
          name: 'employmentQuestion',
          onClick: this.props.onUpdateDataField,
          data: 'employee',
          defaultChecked: (
            this.props.userWentBack &&
            this.props.userSubmittedData.employee === 'true'
          )
        }),
        dom.label({}, 'Employed'),
        dom.br({}),
        dom.input({
          type: 'checkbox',
          name: 'employmentQuestion',
          onClick: this.props.onUpdateDataField,
          data: 'self_employed',
          defaultChecked: (
            this.props.userWentBack &&
            this.props.userSubmittedData.self_employed === 'true'
          )
        }),
        dom.label({}, 'Self-employed'),
        dom.br({}),
        dom.input({
          type: 'checkbox',
          name: 'employmentQuestion',
          onClick: this.props.onUpdateDataField,
          data: 'retired',
          defaultChecked: (
            this.props.userWentBack &&
            this.props.userSubmittedData.retired === 'true'
          )
        }),
        dom.label({}, 'Retired'),
        dom.br({}),
        dom.input({
          type: 'checkbox',
          name: 'employmentQuestion',
          onClick: this.onCheckUnemployed,
          data: 'unemployed',
          defaultChecked: (
            this.props.userWentBack &&
            this.props.userSubmittedData.unemployed === 'true'
          )
        }),
        dom.label({}, 'Unemployed'),
        dom.br({}),
        dom.br({}),
        this.renderUnemploymentBenefitsQuestions()
      );
    },

    renderInstructions: function () {
      return 'Select all that describe ' +
              this.familyOrSinglePersonString() +
              ' (you can select multiple options):';
    },

    familyOrSinglePersonString: function () {
      if (this.props.singlePersonHousehold) {
        return 'you';
      } else {
        return 'you and your family';
      };
    },

    renderUnemploymentBenefitsQuestions: function () {
      if (this.showUnemploymentOptions() === true) {
        return dom.div({},
          dom.p({}, 'Are you receiving unemployment benefits?'),
          dom.input({
            type: 'radio',
            name: 'unemploymentBeneftQuestion',
            onClick: this.props.onUpdateDataField,
            data: 'unemployment_benefits'
          }),
          dom.label({}, 'Yes'),
          dom.br({}),
          dom.input({ type: 'radio', name: 'unemploymentBeneftQuestion' }),
          dom.label({}, 'No'),
          dom.br({}),
          dom.br({})
        );
      } else {
        return null;
      };
    },

    onCheckUnemployed: function (event) {
      this.props.onUpdateDataField(event);
    },

    showUnemploymentOptions: function () {
      return this.props.userSubmittedData.unemployed === 'true';
    }

  });
})();
