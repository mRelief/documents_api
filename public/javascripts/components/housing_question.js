(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;

  window.shared.HousingQuestion = React.createClass({

    getInitialState: function() {
      return {
        showMoreOptions: false,
      };
    },

    propTypes: {
      onUpdateLivingSituationField: React.PropTypes.func.isRequired,
      userWentBack: React.PropTypes.bool.isRequired,
      userSubmittedData: React.PropTypes.object.isRequired
    },

    render: function () {
      return dom.div({},
        dom.p({}, 'Describe your living situation:'),
        dom.input({
          id: 'rentingRadioButton',
          type: 'radio',
          name: 'livingQuestion',
          onClick: this.props.onUpdateLivingSituationField,
          data: 'renting',
          defaultChecked: (
            this.props.userWentBack &&
            this.props.userSubmittedData.renting === 'true'
          )
        }),
        dom.label({}, 'Renting'),
        dom.br({}),
        dom.input({
          id: 'ownsHomeRadioButton',
          type: 'radio',
          name: 'livingQuestion',
          onClick: this.props.onUpdateLivingSituationField,
          data: 'owns_home',
          defaultChecked: (
            this.props.userWentBack &&
            this.props.userSubmittedData.owns_home === 'true'
          )
        }),
        dom.label({}, 'Own home'),
        dom.br({}),
        dom.input({
          type: 'radio',
          name: 'livingQuestion',
          onClick: this.props.onUpdateLivingSituationField,
          data: 'living_with_family_or_friends',
          defaultChecked: (
            this.props.userWentBack &&
            this.props.userSubmittedData.living_with_family_or_friends === 'true'
          )
        }),
        dom.label({}, 'Living with family/friends'),
        dom.br({}),
        dom.input({
          type: 'radio',
          name: 'livingQuestion',
          onClick: this.props.onUpdateLivingSituationField,
          data: 'shelter',
          defaultChecked: (
            this.props.userWentBack &&
            this.props.userSubmittedData.shelter === 'true'
          )
        }),
        dom.label({}, 'Shelter'),
        dom.br({}),
        this.renderAdditionalOptions(),
        this.renderShowMoreOptionsButton(),
        dom.br({}),
        dom.br({})
      );
    },

    userSelectedAdditionalOption: function () {
      return this.props.userWentBack && (
        (this.props.userSubmittedData.car === 'true') ||
        (this.props.userSubmittedData.motel === 'true') ||
        (this.props.userSubmittedData.in_kind === 'true')
      );
    },

    shouldShowMoreOptions: function () {
      return (this.state.showMoreOptions || this.userSelectedAdditionalOption());
    },

    renderShowMoreOptionsButton: function () {
      if (this.shouldShowMoreOptions() === true) return null;

      return dom.span({
        style: {
          marginLeft: '16px'
        },
      }, dom.a({
          onClick: this.toggleAdditionalOptions,
          style: window.shared.LinkStyle
        }, 'Show More Options')
      );
    },

    toggleAdditionalOptions: function () {
      this.setState({ showMoreOptions: true });
    },

    renderAdditionalOptions: function () {
      if (this.shouldShowMoreOptions() === false) return null;

      return dom.div({},
        dom.input({
          type: 'radio',
          name: 'livingQuestion',
          onClick: this.props.onUpdateLivingSituationField,
          data: 'car',
          defaultChecked: (
            this.props.userWentBack &&
            this.props.userSubmittedData.car === 'true'
          )
        }),
        dom.label({}, 'Car'),
        dom.br({}),
        dom.input({
          type: 'radio',
          name: 'livingQuestion',
          onClick: this.props.onUpdateLivingSituationField,
          data: 'motel',
          defaultChecked: (
            this.props.userWentBack &&
            this.props.userSubmittedData.motel === 'true'
          )
        }),
        dom.label({}, 'Motel'),
        dom.br({}),
        dom.input({
          type: 'radio',
          name: 'livingQuestion',
          onClick: this.props.onUpdateLivingSituationField,
          data: 'in_kind',
          defaultChecked: (
            this.props.userWentBack &&
            this.props.userSubmittedData.in_kind === 'true'
          )
        }),
        dom.label({}, 'In Kind')
      );
    }

  });
})();
