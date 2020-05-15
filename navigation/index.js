import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainNavigator from './Main';
import LoginNavigator from './Login';
import NavigationService from '../navigation/NavigationService';


class RootNavigator extends React.Component {
  render() {
    const { loggedIn } = this.props.auth;
    const Root = loggedIn ? MainNavigator : LoginNavigator;

    return (
      <Root
        ref={navigationRef =>
          NavigationService.setTopLevelNavigator(navigationRef)
        }
        {...this.props}
      />
    );
  }
}



RootNavigator.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({ }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RootNavigator);
