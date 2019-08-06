import React, {Fragment, PureComponent} from 'react';
import connect from 'storeon/react/connect';
import { Alerts } from './components/Alerts';
import { MESSAGES, TYPES } from './constants/alerts';

class App extends PureComponent {

    componentDidMount() {
        window.addEventListener('offline', this.onNetworkOffline);
        window.addEventListener('online', this.onNetworkOnline);
        window.navigator.geolocation.getCurrentPosition(() => {}, () => {});
        this.getScreen();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.appScreen !== this.props.appScreen) {
            this.getScreen();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('offline', this.onNetworkOffline);
        window.removeEventListener('online', this.onNetworkOnline);
    }

    state = {
        Screen: () => null,
    };

    onNetworkOffline = () => {
        this.props.dispatch('showAlert', { type: TYPES.ERROR, text: MESSAGES.OFFLINE });
    };

    onNetworkOnline = () => {
        this.props.dispatch('showAlert', { type: TYPES.SUCCESS, text: MESSAGES.ONLINE });
    };

    getScreen() {
        const { appScreen } = this.props;

        import(`./components/screens/${appScreen}`).then((module) => {
            this.setState({
                Screen: module.default,
            });
        });
    }

    render() {
        const { Screen } = this.state;

        return (
            <Fragment>
                <Screen />
                <Alerts />
            </Fragment>
        );
    }
}

export default connect('appScreen', App);
