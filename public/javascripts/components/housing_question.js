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
      onLivingSituationWithoutSpecialDocuments: React.PropTypes.func.isRequired,
      userWentBack: React.PropTypes.bool.isRequired,
      userSubmittedData: React.PropTypes.object.isRequired
    },

    render: function () {
      return dom.div({},
        dom.p({}, 'Describe your living situation:'),
        dom.input({
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
        dom.input({ type: 'radio', name: 'livingQuestion', onClick: this.toggleAdditionalOptions }),
        dom.label({}, 'None of the above'),
        dom.br({}),
        dom.br({})
      );
    },

    toggleAdditionalOptions: function () {
      this.props.onLivingSituationWithoutSpecialDocuments();  // If the user leaves this as the
                                                              // selected radio button, clear all
                                                              // other living situation fields
      this.setState({ showMoreOptions: true });
    },

    renderAdditionalOptions: function () {
      if (this.state.showMoreOptions === false) return null;

      return dom.div({},
        dom.input({ type: 'radio', name: 'livingQuestion', onClick: this.props.onLivingSituationWithoutSpecialDocuments }),
        dom.label({}, 'Car'),
        dom.br({}),
        dom.input({ type: 'radio', name: 'livingQuestion', onClick: this.props.onLivingSituationWithoutSpecialDocuments }),
        dom.label({}, 'Motel'),
        dom.br({}),
        dom.input({ type: 'radio', name: 'livingQuestion', onClick: this.props.onLivingSituationWithoutSpecialDocuments }),
        dom.label({}, 'In Kind')
      );
    }

  });
})();
