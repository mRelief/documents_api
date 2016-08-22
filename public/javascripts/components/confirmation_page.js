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

      if (userSubmittedData.renting === 'true') {
        return 'You are renting.';
      } else if (userSubmittedData.owns_home === 'true') {
        return 'You own your home.';
      } else if (userSubmittedData.shelter === 'true') {
        return 'You are staying in a shelter.';
      } else if (userSubmittedData.living_with_family_or_friends === 'true') {
        return 'You are living with family or friends.';
      };
    },

    renderEmploymentStatus: function () {
      var userSubmittedData = this.props.userSubmittedData;

      if (userSubmittedData.employee === 'true') {
        return 'You are an employee.';
      } else if (userSubmittedData.self_employed === 'true') {
        return 'You are self-employed.';
      } else if (userSubmittedData.retired === 'true') {
        return 'You are retired.';
      } else if (userSubmittedData.unemployment_benefits === 'true') {
        return 'You are receiving unemployment benefits.';
      };
    },

    renderOtherIncomeSources: function () {
      var userSubmittedData = this.props.userSubmittedData;
      var single_person = this.props.singlePersonHousehold;

      if (single_person) {
        var sentenceSubjectAndVerb = 'You are receiving';
      } else {
        var sentenceSubjectAndVerb = 'Your family is receiving';
      };

      if (userSubmittedData.disability_benefits === 'true') {
        var incomeSource = 'disability benefits.';
      } else if (userSubmittedData.child_support === 'true') {
        var incomeSource = 'child support.';
      } else if (userSubmittedData.has_rental_income === 'true') {
        var incomeSource = 'rental income.';
      };

      return [sentenceSubjectAndVerb, incomeSource].join(' ');
    },

    renderCitizenshipStatus: function () {
      var all_citizens = (this.props.userSubmittedData.all_citizens === 'true');
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
