import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { RouterProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { IntlProps } from '../../';
import {
	RootState,
	selectConfigsLoading,
	selectCurrentColorTheme,
	selectSidebarState,
	selectUserLoggedIn,
	toggleSidebar,
} from '../../modules';

import './SideBarToggle.pcss';


interface ReduxProps {
	colorTheme: string;
	userLoggedIn: boolean;
	sidebarOpened: boolean;

	configsLoading: boolean;
}

interface DispatchProps {
	toggleSidebar: typeof toggleSidebar;
}

interface LocationProps extends RouterProps {
	location: {
		pathname: string;
	};
}

type Props = ReduxProps & DispatchProps & IntlProps & LocationProps;

class SideBarToggler extends React.Component<Props> {
	public render() {
		const { userLoggedIn } = this.props;

		//const shouldRenderHeader = !noHeaderRoutes.some(r => location.pathname.includes(r)) && location.pathname !== '/';

		if (userLoggedIn) {
			return (
				<div className={`pg-sidebar__toggler`} onClick={this.openSidebar}>
					<span className="pg-sidebar__toggler-item" />
					<span className="pg-sidebar__toggler-item" />
					<span className="pg-sidebar__toggler-item" />
				</div>
			);
		} else {
			return <div className={`pg-sidebar__toggler-off`}></div>;
		}
	}

	private openSidebar = () => this.props.toggleSidebar(!this.props.sidebarOpened);
}

const mapStateToProps = (state: RootState): ReduxProps => ({
	colorTheme: selectCurrentColorTheme(state),
	sidebarOpened: selectSidebarState(state),
	userLoggedIn: selectUserLoggedIn(state),
	configsLoading: selectConfigsLoading(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
	toggleSidebar: payload => dispatch(toggleSidebar(payload)),
});

export const SideBarToggle = compose(
	injectIntl,
	withRouter,
	connect(mapStateToProps, mapDispatchToProps),
)(SideBarToggler) as React.ComponentClass;
