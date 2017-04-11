import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import register from '../actions/async-creators/user/register';
import error from '../actions/sync-creators/error';

class Register extends React.Component {
  componentWillUnmount() {
    this.props.clearError();
  }

  render() {
    return (
      <div>
        {this.props.error &&
          <p>{this.props.error}</p>}
        <form onSubmit={this.props.handleClick}>
          <input type="text" placeholder="username" name="username" />
          <input type="password" placeholder="password" name="password" />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  handleClick: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  handleClick: (event) => {
    event.preventDefault();
    dispatch(register(
      {
        username: event.target.elements.username.value,
        password: event.target.elements.password.value,
      },
    ));
  },
  clearError: () => dispatch(error('')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);