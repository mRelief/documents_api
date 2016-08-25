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
        this.renderInnerBar()
      );
    },

    renderInnerBar: function () {
      var width = String(this.props.step * 0.5 * 100) + '%';

      return dom.div({
        style: {
          backgroundColor: '#00FF00',
          height: '8px',
          borderRadius: '4px',
          width: width
        }
      });
    },

    renderNumbers: function () {
      return dom.div({
        style: {
          textAlign: 'right'
        }
      }, 'Page ' + String(this.props.step) + '/2');
    },

  });
})();
