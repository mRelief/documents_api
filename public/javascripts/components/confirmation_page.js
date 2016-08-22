(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;
  var createEl = React.createElement.bind(React);
  var AdditionalIncomeConfirmation = window.shared.AdditionalIncomeConfirmation;
  var EmploymentStatusConfirmation = window.shared.EmploymentStatusConfirmation;

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
        dom.ul({},
          dom.li({},
            this.renderNumberOfPeople(),
            dom.br({}),
            dom.br({})
          ),
          dom.li({},
            this.renderLivingSituation(),
            dom.br({}),
            dom.br({})
          ),
          createEl(AdditionalIncomeConfirmation, {
              userSubmittedData: this.props.userSubmittedData,
              singlePersonHousehold: this.props.singlePersonHousehold,
            }
          ),
          createEl(EmploymentStatusConfirmation, {
              userSubmittedData: this.props.userSubmittedData,
              singlePersonHousehold: this.props.singlePersonHousehold,
            }
          ),
          dom.li({},
            this.renderCitizenshipStatus(),
            dom.br({}),
            dom.br({})
          )
        ),
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
