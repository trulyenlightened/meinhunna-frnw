import { NavigationActions } from 'react-navigation';

let _navigator;

const _window = () => {
  _navigator.dispatch(NavigationActions.back());
  if (_navigator.state.nav.index > 0) {
    // window.history.back();
  }
};


function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
  if (window && window.history) {
    window.addEventListener('popstate', _window);
  }
}

function navigate(routeName, params = {}, action = null) {
  _navigator.dispatch(NavigationActions.navigate({
    routeName,
    params,
    action,
  }));
  if (window && window.history) {
    window.history.pushState({ state: true }, routeName, `#${routeName}`);
  }
}

function goBack(route) {
  _navigator.dispatch(NavigationActions.back(route));
  if (window && window.history) {
    // window.history.back();
  }
}

function resetToLogin() {
  _navigator.dispatch(NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Splash' })],
    key: null,
  }));
}



function navigateMenu(routeName) {
  navigate(routeName);
  // Reset all stacks every time user navigate any menu item
  _navigator.dispatch(NavigationActions.popToTop({}));
}

export default {
  navigate,
  goBack,
  setTopLevelNavigator,
  resetToLogin,
  navigateMenu,
};
