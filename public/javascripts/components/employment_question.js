(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;

  window.shared.EmploymentQuestion = React.createClass({

    getInitialState: function () {
      return {
        userCheckedUnemployed: false
      };
    },

    propTypes: {
      singlePersonHousehold: React.PropTypes.bool.isRequired,
      onCheckEmployee: React.PropTypes.func.isRequired,
      onCheckSelfEmployed: React.PropTypes.func.isRequired,
      onCheckRetired: React.PropTypes.func.isRequired,
      onCheckUnemployedYesBenefits: React.PropTypes.func.isRequired,
      onClickNextFromEmploymentQuestion: React.PropTypes.func.isRequired,
    },

    render: function () {
      return dom.div({},
        dom.p({}, this.renderInstructions()),
        dom.input({ type: 'checkbox', onClick: this.props.onCheckEmployee }),
        dom.label({}, 'Employed'),
        dom.br({}),
        dom.input({ type: 'checkbox', onClick: this.props.onCheckSelfEmployed }),
        dom.label({}, 'Self-employed'),
        dom.br({}),
        dom.input({ type: 'checkbox', onClick: this.props.onCheckRetired }),
        dom.label({}, 'Retired'),
        dom.br({}),
        dom.input({ type: 'checkbox', onClick: this.onCheckUnemployed }),
        dom.label({}, 'Unemployed'),
        dom.br({}),
        dom.br({}),
        this.renderUnemploymentBenefitsQuestions(),
        dom.input({
          type: 'submit',
          value: 'Next',
          onClick: this.props.onClickNextFromEmploymentQuestion,
          style: window.shared.ButtonStyle
        })
      );
    },

    renderInstructions: function () {
      return 'Select all that describe ' + this.familyOrSinglePersonString() + ':';
    },

    familyOrSinglePersonString: function () {
      if (this.props.singlePersonHousehold) {
        return 'you';
      } else {
        return 'you and your family';
      };
    },

    renderUnemploymentBenefitsQuestions: function () {
      if (this.state.userCheckedUnemployed === true) {
        return dom.div({},
          dom.p({}, 'Are you receiving unemployment benefits?'),
          dom.input({
            type: 'radio',
            name: 'unemploymentBeneftQuestion',
            onClick: this.props.onCheckUnemployedYesBenefits
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
      var unemployed = event.target.checked;

      this.setState({ userCheckedUnemployed: unemployed });
    }

  });
})();
