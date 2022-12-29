import { ProfileAccountActivity, ProfileActiveStep, ProfileAnnouncement, ProfileApiKeys, ProfileSecurity, ReferralProgram } from 'containers';
import { localeDate, setDocumentTitle } from 'helpers';
import { useWalletsFetch } from 'hooks';
import { selectUserActivity, selectUserInfo } from 'modules';
import * as React from 'react';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const ProfileQuickContainer: React.FC = () => {
	const userActivity = useSelector(selectUserActivity);
	const user = useSelector(selectUserInfo);

	const lastLogin = userActivity.find(act => act.action === 'login');
	const ip = lastLogin ? lastLogin.user_ip : '';
	const time = lastLogin ? localeDate(lastLogin.created_at, 'fullDate') : '';

	return (
		<div className="td-pg-profile --bg--second td-pg-profile--bg td-pg-profile__quick" style={{width: '1168px'}}>
			<span className="d-flex align-items-center" style={{marginLeft: '30px', marginTop: '30px', fontSize: '21px', textAlign: 'center', color: '#FDA736'}}>PLATAFORMA FORTEM ONE - ATIVOS DIGITAIS</span>
			<span className="d-flex align-items-center" style={{marginLeft: '30px', marginBottom: '20px', fontSize: '18px', textAlign: 'center', color: '#c0c0c0'}}>DASHBOARD</span>
				<div className="td-pg-profile__quick__inner d-flex ">
					<div className="td-pg-profile__quick__logo">
						<img src={require('./profile_avatar.gif')} alt="" style={{width: '150px'}}/>
						
					</div>
					<div className="td-pg-profile__quick__info d-flex flex-column align-items-start">
						<div className="td-pg-profile__quick__info--top d-flex align-items-center">
							<div className="td-pg-profile__quick__info--top__email mr-2" style={{marginRight: '15px', fontSize: '16px'}}>{user.email}</div>
							<div className="td-pg-profile__quick__info--top__user-id">
								<span className="td-pg-profile--color--second td-pg-profile__quick__info--top__user-id--label mr-1" style={{fontSize: '16px'}}>
									Fortem ID:
								</span>
								<span className="td-pg-profile__quick__info--top__user-id--content" style={{marginLeft: '10px', fontSize: '16px'}}>{user.uid}</span>
								
							</div>
						</div>
						<div className="td-pg-profile--color--second td-pg-profile__quick__info--bottom">
							<span className="td-pg-profile__quick__info--bottom__last-login--time mr-2" style={{fontSize: '16px'}}>
								Último login: {time}
							</span>
							<span className="td-pg-profile__quick__info--bottom__last-login--ip" style={{marginLeft: '10px', fontSize: '16px'}}>IP : {ip}</span>
	

						</div>

					</div>
					<span className="td-pg-profile__quick__info--referral" style={{fontSize: '16px', marginRight: '10px'}}>
								<ReferralProgram />
							</span>
				</div>
			</div>
	);
};

export const ProfileScreen: React.FC = () => {
	useWalletsFetch();

	React.useEffect(() => {
		setDocumentTitle('Perfil');
	}, []);

	return (
		<div className="td-pg-profile">
			<ProfileQuickContainer />
			
				<ProfileActiveStep />
			
		</div>
	);
};
