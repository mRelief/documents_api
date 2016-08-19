(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;
  var createEl = React.createElement.bind(React);

  window.shared.ConfirmationPage = React.createClass({

    propTypes: {
      userSubmittedData: React.PropTypes.object.isRequired,
      singlePersonHousehold: React.PropTypes.bool.isRequired,
      fetchDocumentsFromServer: React.PropTypes.func.isRequired
    },

    render: function () {
      return dom.div({},
        dom.h1({}, 'Does this look accurate?'),
        this.renderConfirmationStatement()
      );
    },

    renderConfirmationStatement: function () {
      return dom.div({},
        this.renderNumberOfPeople(),
        dom.br({}),
        dom.br({}),
        this.renderLivingSituation(),
        dom.br({}),
        dom.br({}),
        this.renderEmploymentStatus(),
        dom.br({}),
        dom.br({}),
        this.renderOtherIncomeSources(),
        dom.br({}),
        dom.br({}),
        this.renderCitizenshipStatus(),
        dom.br({}),
        dom.br({}),
        dom.input({
          type: 'submit',
          value: 'Correct',
          style: window.shared.ButtonStyle,
          onClick: this.props.fetchDocumentsFromServer
        })

      );
    },

    renderNumberOfPeople: function () {
      if (this.props.singlePersonHousehold) {
        return 'You are applying as a single person.';
      } else {
        return 'You are applying for your family.';
      };
    },

    renderLivingSituation: function () {
      var userSubmittedData = this.props.userSubmittedData;

      if (userSubmittedData.renting) {
        return 'You are renting.';
      } else if (userSubmittedData.owns_home) {
        return 'You own your home.';
      } else if (userSubmittedData.shelter) {
        return 'You are staying in a shelter.';
      } else if (userSubmittedData.living_with_family_or_friends) {
        return 'You are living with family or friends.';
      };
    },

    renderEmploymentStatus: function () {
      var userSubmittedData = this.props.userSubmittedData;

      if (userSubmittedData.employee) {
        return 'You are an employee.';
      } else if (userSubmittedData.self_employed) {
        return 'You are self-employed.';
      } else if (userSubmittedData.retired) {
        return 'You are retired.';
      } else if (userSubmittedData.unemployment_benefits) {
        return 'You are receiving unemployment benefits.';
      };
    },

    renderOtherIncomeSources: function () {
      var userSubmittedData = this.props.userSubmittedData;

      if (userSubmittedData.disability_benefits) {
        return 'You are receiving disability benefits.';
      } else if (userSubmittedData.child_support) {
        return 'You are receiving child support.';
      } else if (userSubmittedData.has_rental_income) {
        return 'You are receiving rental income.';
      };
    },

    renderCitizenshipStatus: function () {
      var all_citizens = this.props.userSubmittedData.all_citizens;
      var single_person = this.props.singlePersonHousehold;

      if (all_citizens && single_person) {
        return 'You are a citizen.';
      } else if (all_citizens && !single_person) {
        return 'Everyone in your household is a citizen.';
      } else if (!all_citizens && single_person) {
        return 'You are not a citizen.';
      } else if (!all_citizens && !single_person) {
        return 'Not everyone in your household is a citizen.';
      };
    }

  });
})();
