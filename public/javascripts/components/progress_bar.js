(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;

  window.shared.ProgressBar = React.createClass({

    getInitialState: function () {
      return {
        totalSteps: 4
      }
    },

    propTypes: {
      step: React.PropTypes.number.isRequired,
    },

    render: function () {
      return dom.div({
          style: {
            marginBottom: '80px',
            position: 'fixed',
            top: '0px',
            width: '80%',
            backgroundColor: 'white',
            height: '140px'
          }
        }, this.renderBar(),
           this.renderLineBeneath()
      );
    },

    renderBar: function () {
      return dom.div({
          style: {
            position: 'relative',
            top: '70px',
            backgroundColor: '#F2F2F2',
            height: '8px',
            borderRadius: '4px',
            width: '100%'
          }
        },
        this.renderLabels(),
        this.renderMarker()
      );
    },

    renderLineBeneath: function () {
      return dom.div({
        style: {
          width: '200%',
          height: '1px',
          borderBottom: '2px solid #F2F2F2',
          position: 'relative',
          left: '-200px',
          top: '110px'
        }
      });
    },

    renderLabels: function () {
      return dom.div({},
        dom.div({ style: this.labelStyle(0) }, 'Page 1'),
        dom.div({ style: this.labelStyle(1) }, 'Page 2'),
        dom.div({ style: this.labelStyle(2) }, 'Page 3'),
        dom.div({ style: this.labelStyle(3) }, 'Confirmation'),
        dom.div({ style: this.labelStyle(4) }, 'Results')
      );
    },

    labelStyle: function (position) {
      var leftDisplace = (position / this.state.totalSteps * 100) - (position / 2) - 1;

      if (this.props.step === position) {
        var color = 'black';
      } else {
        var color = '#A9A9A9';
      };

      return {
        fontSize: '15px',
        position: 'absolute',
        left: String(leftDisplace) + '%',
        bottom: '20px',
        color: color,
      }
    },

    renderMarker: function () {
      var position = String((this.props.step) / this.state.totalSteps * 100) + '%';

      return dom.div({
        style: {
          position: 'relative',
          left: position,
          bottom: '5px',
          backgroundColor: '#0060b0',
          height: '20px',
          borderRadius: '20px',
          width: '20px'
        }
      });
    },

  });
})();
