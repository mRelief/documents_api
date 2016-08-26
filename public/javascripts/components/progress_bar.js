(function() {
  window.shared || (window.shared = {});
  var dom = React.DOM;

  window.shared.ProgressBar = React.createClass({

    propTypes: {
      step: React.PropTypes.number.isRequired,
    },

    render: function () {
      return dom.div({
        style: {
          marginBottom: '20px'
        }
      },
        this.renderOuterBar(),
        this.renderNumbers()
      );
    },

    renderOuterBar: function () {
      return dom.div({
          style: {
            position: 'relative',
            top: '14px',
            backgroundColor: '#F2F2F2',
            height: '8px',
            borderRadius: '4px',
            width: '80%'
          }
        },
        this.renderLabels(),
        this.renderMarker()
      );
    },

    renderLabels: function () {
      return dom.div({},
        dom.div({ style: this.labelStyle(0) }, 'Page 1'),
        dom.div({ style: this.labelStyle(1) }, 'Page 2'),
        dom.div({ style: this.labelStyle(2) }, 'Confirmation'),
        dom.div({ style: this.labelStyle(3) }, 'Results')
      );
    },

    labelStyle: function (position) {
      return {
        fontSize: '13px',
        position: 'absolute',
        left: String(position / 3 * 100) + '%',
        bottom: '20px'
      }
    },

    renderMarker: function () {
      var position = String(this.props.step * 0.25 * 100) + '%';

      return dom.div({
        style: {
          position: 'relative',
          left: position,
          backgroundColor: '#00FF00',
          height: '20px',
          borderRadius: '20px',
          width: '20px'
        }
      });
    },

    renderNumbers: function () {
      return dom.div({
        style: {
          textAlign: 'right'
        }
      }, 'Page ' + String(this.props.step) + '/4');
    },

  });
})();
