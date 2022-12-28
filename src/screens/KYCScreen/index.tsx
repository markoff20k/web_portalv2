import { ProfileAccountActivity, ProfileActiveStep, ProfileApiKeys, ProfileSecurity } from 'containers';
import { localeDate, setDocumentTitle } from 'helpers';
import { useWalletsFetch } from 'hooks';
import { selectUserActivity, selectUserInfo } from 'modules';
import * as React from 'react';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';


import GradientBorder from '../../components/GradientBorder/GradientBorder';

//import './KYCScreen.pcss';

export const ProfileQuickContainer2: React.FC = () => {
	const userActivity = useSelector(selectUserActivity);
	const user = useSelector(selectUserInfo);
	const intl = useIntl();

	const lastLogin = userActivity.find(act => act.action === 'login');
	const ip = lastLogin ? lastLogin.user_ip : '';
	const time = lastLogin ? localeDate(lastLogin.created_at, 'fullDate') : '';

	return (
		<div className="td-pg-profile--bg--second td-pg-profile--bg td-pg-profile__quick">
			<Container fluid>
				<div className="td-pg-profile__quick__inner d-flex align-items-center">
					<div className="td-pg-profile__quick__logo">
						<img src={require('assets/images/profile/avatar.svg')} alt="" />
						{user.email && <div className="td-pg-profile__quick__logo__name">{user.email[0]}</div>}
					</div>
					<div className="td-pg-profile__quick__info d-flex flex-column align-items-start">
						<div className="td-pg-profile__quick__info--top d-flex align-items-center">
							<div className="td-pg-profile__quick__info--top__email mr-2">{user.email}</div>
							<div className="td-pg-profile__quick__info--top__user-id">
								<span className="td-pg-profile--color--second td-pg-profile__quick__info--top__user-id--label mr-1">
									{intl.formatMessage({ id: 'page.profile.quickView.userId' })}
								</span>
								<span className="td-pg-profile__quick__info--top__user-id--content">{user.uid}</span>
							</div>
						</div>
						<div className="td-pg-profile--color--second td-pg-profile__quick__info--bottom">
							<span className="td-pg-profile__quick__info--bottom__last-login--time mr-2">
								{intl.formatMessage({ id: 'page.profile.quickView.lastLogin' })} {time}
							</span>
							<span className="td-pg-profile__quick__info--bottom__last-login--ip">
								{intl.formatMessage({ id: 'page.profile.quickView.ip' })} {ip}
							</span>
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};

export const KYCScreen: React.FC = () => {
	useWalletsFetch();
	const intl = useIntl();

	React.useEffect(() => {
		setDocumentTitle(intl.formatMessage({ id: 'page.profile.documentTitle' }));
	}, []);

	return (
		<div className="td-pg-profile w-container">
		
			<GradientBorder>
				<Container fluid>
					<div className="td-pg-profile__content">
						<ProfileAccountActivity />
						<ProfileSecurity />
						<ProfileApiKeys />
					</div>
				</Container>
			</GradientBorder>


		</div>
	);
};
