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
          onClick: this.props.onUpdateDataField,
          data: 'unemployed',
          defaultChecked: (
            this.props.userWentBack &&
            this.props.userSubmittedData.unemployed === 'true'
          )
        }),
        dom.label({}, 'Unemployed'),
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
        dom.br({}),
        this.renderUnemploymentQuestions()
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

    renderUnemploymentQuestions: function () {
    if (this.showUnemploymentOptions() !== true) return null;
      return dom.div({},
        dom.p({}, 'Are you receiving unemployment benefits?'),
        dom.input({
          type: 'radio',
          name: 'unemploymentBeneftQuestion',
          onClick: this.props.onUpdateDataField,
          data: 'unemployment_benefits',
          defaultChecked: (
            this.props.userWentBack &&
            this.props.userSubmittedData.unemployed === 'true' &&
            this.props.userSubmittedData.unemployment_benefits === 'true'
          )
        }),
        dom.label({}, 'Yes'),
        dom.br({}),
        dom.input({
          type: 'radio',
          name: 'unemploymentBeneftQuestion',
          defaultChecked: (
            this.props.userWentBack &&
            this.props.userSubmittedData.unemployed === 'true' &&
            this.props.userSubmittedData.unemployment_benefits === 'false'
          )
        }),
        dom.label({}, 'No'),
        dom.br({}),
        dom.br({}),
        dom.p({}, 'If you recently lost a job, have you received a pay check in the last 30 days?'),
        dom.input({
          type: 'radio',
          name: 'recentyLostJobQuestion',
          onClick: this.props.onUpdateDataField,
          data: 'recently_lost_job_and_received_paycheck',
          defaultChecked: (
            this.props.userWentBack &&
            this.props.userSubmittedData.unemployed === 'true' &&
            this.props.userSubmittedData.recently_lost_job_and_received_paycheck === 'true'
          )
        }),
        dom.label({}, 'Yes'),
        dom.br({}),
        dom.input({
          type: 'radio',
          name: 'recentyLostJobQuestion',
          defaultChecked: (
            this.props.userWentBack &&
            this.props.userSubmittedData.unemployed === 'true' &&
            this.props.userSubmittedData.recently_lost_job_and_received_paycheck === 'false'
          )
        }),
        dom.label({}, 'No'),
        dom.br({}),
        dom.br({})
      );
    },

    showUnemploymentOptions: function () {
      return this.props.userSubmittedData.unemployed === 'true';
    }

  });
})();
