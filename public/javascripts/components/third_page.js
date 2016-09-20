(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;
  var createEl = React.createElement.bind(React);
  var ProgressBar = window.shared.ProgressBar;
  var CitizenshipQuestion = window.shared.CitizenshipQuestion;

  window.shared.ThirdPage = React.createClass({

    propTypes: {
      singlePersonHousehold: React.PropTypes.bool.isRequired,
      onClickRadioButtonYes: React.PropTypes.func.isRequired,
      onClickRadioButtonNo: React.PropTypes.func.isRequired,
      onClickNext: React.PropTypes.func.isRequired,
      onClickBackButton: React.PropTypes.func.isRequired,
      userSubmittedData: React.PropTypes.object.isRequired,
      userWentBack: React.PropTypes.bool.isRequired
    },

    renderProgressBar: function () {
      return createEl(ProgressBar, { step: 2 });
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
        dom.h1({}, 'What documents do you have on hand?'),
        dom.h3({}, '(This will help us make better recommendations for you.)'),
        dom.br({}),
        dom.p({}, 'Do you have a birth certificate?'),
        dom.input({
          type: 'radio',
          name: 'birthCertificateQuestion',
          onClick: this.props.onClickRadioButtonYes,
          data: 'has_birth_certificate',
          defaultChecked: (
            this.props.userWentBack &&
            this.props.userSubmittedData.has_birth_certificate === 'true'
          )
        }),
        dom.label({}, 'Yes'),
        dom.br({}),
        dom.input({
          type: 'radio',
          name: 'birthCertificateQuestion',
          onClick: this.props.onClickRadioButtonNo,
          data: 'has_birth_certificate',
          defaultChecked: (
            this.props.userWentBack &&
            this.props.userSubmittedData.has_birth_certificate === 'false'
          )
        }),
        dom.label({}, 'No'),
        dom.br({}),
        dom.br({}),
        dom.p({}, 'Do you have a social security card?'),
        dom.input({
          type: 'radio',
          name: 'socialSecurityCardQuestion',
          data: 'has_social_security_card',
          onClick: this.props.onClickRadioButtonYes,
          defaultChecked: (
            this.props.userWentBack &&
            this.props.userSubmittedData.has_social_security_card === 'true'
          )
        }),
        dom.label({}, 'Yes'),
        dom.br({}),
        dom.input({
          type: 'radio',
          name: 'socialSecurityCardQuestion',
          data: 'has_social_security_card',
          onClick: this.props.onClickRadioButtonNo,
          defaultChecked: (
            this.props.userWentBack &&
            this.props.userSubmittedData.has_social_security_card === 'false'
          )
        }),
        dom.label({}, 'No'),
        dom.br({}),
        dom.br({}),
        dom.p({}, 'Do you have a State ID?'),
        dom.input({
          type: 'radio',
          name: 'stateIdQuestion',
          data: 'has_state_id',
          onClick: this.props.onClickRadioButtonYes,
          defaultChecked: (
            this.props.userWentBack &&
            this.props.userSubmittedData.has_state_id === 'true'
          )
        }),
        dom.label({}, 'Yes'),
        dom.br({}),
        dom.input({
          type: 'radio',
          name: 'stateIdQuestion',
          data: 'has_state_id',
          onClick: this.props.onClickRadioButtonNo,
          defaultChecked: (
            this.props.userWentBack &&
            this.props.userSubmittedData.has_state_id === 'false'
          )
        }),
        dom.label({}, 'No'),
        dom.br({}),
        dom.br({}),
        this.renderCitizenshipQuestion(),
        dom.br({}),
        dom.br({}),
        dom.input({
          type: 'submit',
          value: 'Back',
          style: window.shared.ButtonStyle,
          onClick: this.props.onClickBackButton
        }),
        dom.input({
          type: 'submit',
          value: 'Next',
          style: window.shared.ButtonStyle,
          onClick: this.props.onClickNext
        })
      );
    },

    renderCitizenshipQuestion: function () {
      return createEl(CitizenshipQuestion, {
        onClickRadioButtonYes: this.props.onClickRadioButtonYes,
        onClickRadioButtonNo: this.props.onClickRadioButtonNo,
        singlePersonHousehold: this.props.singlePersonHousehold
      });
    },

  });
})();
