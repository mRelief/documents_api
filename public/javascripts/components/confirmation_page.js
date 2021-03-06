(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;
  var createEl = React.createElement.bind(React);
  var AdditionalIncomeConfirmation = window.shared.AdditionalIncomeConfirmation;
  var EmploymentStatusConfirmation = window.shared.EmploymentStatusConfirmation;
  var ProgressBar = window.shared.ProgressBar;

  window.shared.ConfirmationPage = React.createClass({

    propTypes: {
      userSubmittedData: React.PropTypes.object.isRequired,
      singlePersonHousehold: React.PropTypes.bool.isRequired,
      fetchDocumentsFromServer: React.PropTypes.func.isRequired,
      onClickBackButton: React.PropTypes.func.isRequired
    },

    render: function () {
      return dom.div({
        style: {
            position: 'relative',
            top: '160px',
            marginBottom: '80px'
          }
        },
        this.renderProgressBar(),
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
          createEl(EmploymentStatusConfirmation, {
              userSubmittedData: this.props.userSubmittedData,
              singlePersonHousehold: this.props.singlePersonHousehold,
            }
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
          dom.li({},
            this.renderCitizenshipStatus(),
            dom.br({}),
            dom.br({})
          ),
          dom.li({},
            this.renderBirthCertificateStatement(),
            dom.br({}),
            dom.br({})
          ),
          dom.li({},
            this.renderSocialSecurityCardStatement(),
            dom.br({}),
            dom.br({})
          ),
          dom.li({},
            this.renderStateIdStatement(),
            dom.br({}),
            dom.br({})
          )
        ),
        dom.input({
          type: 'submit',
          value: 'No, Go Back',
          style: window.shared.ButtonStyle,
          onClick: this.props.onClickBackButton
        }),
        dom.input({
          type: 'submit',
          value: 'This Is Correct',
          style: window.shared.ButtonStyle,
          onClick: this.props.fetchDocumentsFromServer
        })
      );
    },

    renderProgressBar: function () {
      return createEl(ProgressBar, { step: 3 });
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
      } else if (userSubmittedData.car === 'true') {
        return 'You are staying in your car.';
      } else if (userSubmittedData.motel === 'true') {
        return 'You are staying in a motel.';
      } else if (userSubmittedData.in_kind === 'true') {
        return 'You are staying somewhere for in-kind work.';
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
    },

    renderBirthCertificateStatement: function () {
      var has_birth_certificate = (
        this.props.userSubmittedData.has_birth_certificate === 'true'
      );

      if (has_birth_certificate) {
        return 'You have a Birth Certificate.';
      } else {
        return 'You don\'t have a Birth Certificate.';
      };
    },

    renderSocialSecurityCardStatement: function () {
      var has_social_security_card = (
        this.props.userSubmittedData.has_social_security_card === 'true'
      );

      if (has_social_security_card) {
        return 'You have a Social Security Card.';
      } else {
        return 'You don\'t have a Social Security Card.';
      };
    },

    renderStateIdStatement: function () {
      var has_state_id = (this.props.userSubmittedData.has_state_id === 'true');

      if (has_state_id) {
        return 'You have a State ID.';
      } else {
        return 'You don\'t have a State ID.';
      };
    },

  });
})();
