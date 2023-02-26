import classNames from 'classnames';
import { TOGGLE_SIDEBAR } from 'modules/public/globalSettings/constants';
import * as React from 'react';
import { Nav } from 'react-bootstrap';
import { FaAward, FaGift, FaHistory, FaSignOutAlt, FaStar, FaUserCircle, FaUserPlus } from 'react-icons/fa';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logoutFetch, selectUserLoggedIn } from '../../modules';

import { NavBar } from '../NavBar';

import  { SideBarToggle } from '../SideBarToggle'


//import './HeaderAuthToolbar.pcss';

const IconWallet = require('../../assets/svg/wallet2.svg');
const IconDashboard = require('../../assets/svg/trading.svg');
const IconDash = require('../../assets/svg/dash.svg');
const IconPerfil = require('../../assets/svg/profile2.svg');
const IconAccountProfile = require('../../assets/svg/profileSubmenu.svg');
const IconFinance = require('../../assets/svg/finance.svg');
const IconConvert = require('../../assets/svg/convert.svg');
const IconToken = require('../../assets/svg/hexagon.svg');
const IconExchange = require('../../assets/svg/exchange.svg');
const IconHistory = require('../../assets/svg/history.svg');
const IconProfileVerification = require('../../assets/svg/cadastro.svg');
const IconOrders = require('../../assets/svg/orders.svg');
const IconLogout = require('../../assets/svg/logout.svg');
const IconReferral = require('../../assets/svg/referral.svg');
const IconSecurity = require('../../assets/svg/security2.svg');
const IconDepositBRL = require('../../assets/svg/depositBRL.svg');
const IconWithdrawBRL = require('../../assets/svg/withdrawBRL.svg');



export const HeaderAuthToolbar: React.FC = () => {
	const history = useHistory();
	const intl = useIntl();

	const isLoggedIn = useSelector(selectUserLoggedIn);
	const [activeNow, setActiveNow] = React.useState('');
	const [activeItemDrop, setActiveItemDrop] = React.useState('');

	const dispatch = useDispatch();

	const setStateActiveNow = (nameActive: string) => {
		setActiveNow(nameActive);
		setActiveItemDrop('');
	};

	const classActiveItemDrop = (nameItem: string) =>
		classNames('subheader__right-menu__dropdown__wrap__content__title d-flex align-items-center', {
			'subheader__right-menu__dropdown__wrap__content__title--active': activeItemDrop === nameItem,
		});

	const classLinkActive = (nameActive: string) => {
		return classNames('subheader__left-menu__dropdown__wrap', {
			'subheader__left-menu__dropdown__wrap--active': activeNow === nameActive,
		});
	};

	const classLinkActiveTitleDrop = (nameActive: string) => {
		return classNames('subheader__right-menu__dropdown__wrap__dropbtn d-flex flex-row align-items-center', {
			'subheader__right-menu__dropdown__wrap__dropbtn--active': activeNow === nameActive,
		});
	};

	const renderDashboardLink = () => {
		const classItemTitle = classNames('subheader__right-menu__item__title', {
			'subheader__right-menu__item__title--active': activeNow === 'Wallet',
		});

		return (
			isLoggedIn && (
				<div className="subheader__right-menu__item__title">
					<div className={classItemTitle} onClick={() => setStateActiveNow('Dashboard')} >
					<img src={IconFinance} className="mr-2 subheader__right-menu__item__title__svg" style={{width: '26px',}} />

						<Link to="/dash">Painel de controle
						</Link>
					</div>
				</div>
			)
		);
	};


	const renderDashboardTab = () => {
		return (
			isLoggedIn && (
			
				<div className="subheader__right-menu__dropdown__wrap">
					<span className={classLinkActiveTitleDrop('dashboard')}>
					<img src={IconDashboard} className="mr -2 subheader__right-menu__item__title__svg" style={{width: '26px',}} />
						{/* {translate('page.body.homepage.header.dashboard')} */}
						Negociação
						<div className="subheader__right-menu__dropdown__wrap__dropbtn__icon-drop-down"> </div>
					</span>
					<div className="subheader__right-menu__dropdown__wrap__content" style={{width: '100px',}}>
						<Link
							to="/tokens"
							onClick={() => {
								setStateActiveNow('dashboard');
								setActiveItemDrop('tokens');
							}}
						>
							<div className={classActiveItemDrop('tokens')} style={{width: '300px',}}>
							<img src={IconToken} className="mr-2 subheader__right-menu__item__title__svg" style={{width: '26px',}} />
								{/*{translate('page.body.homepage.header.dashboard_item')}*/}
								Comprar tokens
							</div>
						</Link>
						<Link
							to="/quick-exchange"
							onClick={() => {
								setStateActiveNow('dashboard');
								setActiveItemDrop('quick');
							}}
						>
							<div className={classActiveItemDrop('quick')}>
							<img src={IconConvert} className="subheader__right-menu__item__title__svg" style={{width: '22px',}} />
								Negociar cripto - Instantâneo
							</div>
						</Link>
						<Link
							to="/market/btcusd"
							onClick={() => {
								setStateActiveNow('dashboard');
								setActiveItemDrop('exchange');
							}}
						>
							<div className={classActiveItemDrop('exchange')}>
							<img src={IconExchange} className="mr -2 subheader__right-menu__item__title__svg" style={{width: '26px',}} />
								Negociar cripto - Exchange Pro
							</div>
						</Link>

					</div>
				</div>
			
			)
		);
	};

	const renderFinanceTab = () => {
		return (
			isLoggedIn && (
			
				<div className="subheader__right-menu__dropdown__wrap">
					<span className={classLinkActiveTitleDrop('finance')}>
					
					<img src={IconFinance} className="subheader__right-menu__item__title__svg" style={{width: '26px',}} />

						{translate('page.body.homepage.header.finance')}
						<div className="subheader__right-menu__dropdown__wrap__dropbtn__icon-drop-down"> </div>
					</span>
					<div className="subheader__right-menu__dropdown__wrap__content" style={{width: '220px',}}>
						<Link
							to="/wallets"
							onClick={() => {
								setStateActiveNow('finance');
								setActiveItemDrop('wallets');
							}}
						>
							<div className={classActiveItemDrop('wallets')}>
								
								<img src={IconWallet} className="mr-2 subheader__right-menu__item__title__svg" style={{width: '22px',}} />
								{translate('page.body.homepage.header.wallet')}
							</div>
						</Link>
						<Link
							to="/history"
							onClick={() => {
								setStateActiveNow('finance');
								setActiveItemDrop('transaction');
							}}
						>
							<div className={classActiveItemDrop('transaction')}>
							<img src={IconHistory} className="mr-2 subheader__right-menu__item__title__svg" style={{width: '26px',}} />
								{translate('page.body.homepage.header.transaction')}
							</div>
						</Link>
						<Link
							to="/orders"
							onClick={() => {
								setStateActiveNow('finance');
								setActiveItemDrop('transaction');
							}}
						>
							<div className={classActiveItemDrop('transaction')}>
							<img src={IconOrders} className="mr-2 subheader__right-menu__item__title__svg" style={{width: '26px',}} />
								Ordens abertas - Exchange Pro
							</div>
						</Link>
						<Link
							to="/wallets/deposit/BRL"
							onClick={() => {
								setStateActiveNow('finance');
								setActiveItemDrop('deposit');
							}}
						>

							<div className={classActiveItemDrop('deposit')}>
								{/* <FaStar className="subheader__right-menu__dropdown__wrap__content__title__icon mr-2" /> */}
								<img src={IconDepositBRL} className="mr-2 subheader__right-menu__item__title__svg" style={{width: '26px',}} />
								{/* {translate('page.body.homepage.header.deposit')} */}
								Depositar Reais
							</div>
						</Link>
						<Link
							to="/wallets/withdraw/BRL"
							onClick={() => {
								setStateActiveNow('finance');
								setActiveItemDrop('withdraw');
							}}
						>
							<div className={classActiveItemDrop('withdraw')}>
								{/* <FaStar className="subheader__right-menu__dropdown__wrap__content__title__icon mr-2" /> */}
								<img src={IconWithdrawBRL} className="mr-2 subheader__right-menu__item__title__svg" style={{width: '26px',}} />
								{/* {translate('page.body.homepage.header.withdraw')} */}
								Sacar Reais
							</div>
						</Link>
					</div>
				</div>
			
			)
		);
	};

	const renderLogout = () => {
		if (!isLoggedIn) {
			return null;
		}

		return (
			<Link
				to=" "
				onClick={() => {
					dispatch(logoutFetch());
					setStateActiveNow('');
					setActiveItemDrop('');
				}}
			>
				<div className="subheader__right-menu__dropdown__wrap__content__title d-flex align-items-center">
				<img src={IconLogout} className="mr-2 subheader__right-menu__item__title__svg" style={{width: '26px',}} />
					<FormattedMessage id={'page.body.profile.content.action.logout'} />
				</div>
			</Link>
		);
	};

	const renderProfileLink = () => {
		return (
			isLoggedIn && (
				<Link
					to="/profile"
					onClick={() => {
						setStateActiveNow('account');
						setActiveItemDrop('profile');
					}}
				>
					<div className={classActiveItemDrop('profile')}>
						<img src={IconAccountProfile} className="mr-2 subheader__right-menu__item__title__svg" style={{width: '26px',}} />
						
						<FormattedMessage id={'page.header.navbar.profile'} />
					</div>
				</Link>
			)
		);
	};

	const renderSecurityLink = () => {
		return (
			isLoggedIn && (
				<Link
					to="/sec"
					onClick={() => {
						setStateActiveNow('account');
						setActiveItemDrop('security');
					}}
				>
					<div className={classActiveItemDrop('security')}>
						<img src={IconSecurity} className="mr-2 subheader__right-menu__item__title__svg" style={{width: '26px',}} />
						
						Segurança
					</div>
				</Link>
			)
		);
	};

	const renderProfileVerificationLink = () => {
		return (
			isLoggedIn && (
				<Link
					to="/profile"
					onClick={() => {
						setStateActiveNow('account');
						setActiveItemDrop('profileVerification');
					}}
				>
					<div className={classActiveItemDrop('profileVerification')}>
						<img src={IconProfileVerification} className="mr-2 subheader__right-menu__item__title__svg" style={{width: '26px',}} />
						
						Cadastro
					</div>
				</Link>
			)
		);
	};

	const renderDashLink = () => {
		return (
			isLoggedIn && (
				<Link
					to="/dash"
					onClick={() => {
						setStateActiveNow('account');
						setActiveItemDrop('dash');
					}}
				>
					<div className={classActiveItemDrop('dash')}>
						<img src={IconDash} className="mr-2 subheader__right-menu__item__title__svg" style={{width: '26px',}} />
						
						Dashboard
					</div>
				</Link>
			)
		);
	};



	const renderProfileTab = () => {
		return (
			isLoggedIn && (
				<>
					<div className="subheader__right-menu__dropdown__wrap">
						<span className={classLinkActiveTitleDrop('account')}>
							
							<img src={IconPerfil} className="subheader__right-menu__item__title__svg" style={{width: '20px',}} />
							{translate('page.body.homepage.header.account')}
							<div className="subheader__right-menu__dropdown__wrap__dropbtn__icon-drop-down"> </div>
						</span>
						<div className="subheader__right-menu__dropdown__wrap__content subheader__right-menu__dropdown__wrap__content--account">
							
							{renderDashLink()}
							{renderSecurityLink()}
							{renderProfileVerificationLink()}
							{renderReferralLink()}
							{renderLogout()}
							{/*{renderProfileLink()}*/}
						</div>
					</div>
				</>
			)
		);
	};



	const renderReferralLink = () => {
		return (
			isLoggedIn && (
				<Link
					to="/referral"
					onClick={() => {
						setStateActiveNow('account');
						setActiveItemDrop('referral');
					}}
				>
					<div className={classActiveItemDrop('referral')}>
					<img src={IconReferral} className="mr -2 subheader__right-menu__item__title__svg" style={{width: '26px',}} />
						<FormattedMessage id={'page.header.navbar.referral'} />
					</div>
				</Link>
			)
		);
	};

	const redirectSingIn = () => {
		history.push('/signin');
	};

	const redirectSingUp = () => {
		history.push('/register');
	};

	const translate = (key: string) => intl.formatMessage({ id: key });

	const renderUnLogin = () => {
		const classLinkActiveLogin = classNames('subheader__right-menu__item__title', {
			'subheader__right-menu__item__title--active': activeNow === 'login',
		});

		const classLinkActiveRegister = classNames('subheader__right-menu__item__title subheader__right-menu__item__title--btn ', {
			'subheader__right-menu__item__title--btn--active': activeNow === 'register',
		});

		return (
			!isLoggedIn && (
				<>
					<div
						className="subheader__right-menu__item flex-shrink-0 custom-poiter"
						onClick={e => {
							redirectSingIn();
							setStateActiveNow('login');
						}}
					>
						<div className={classLinkActiveLogin}>
							<span>{translate('page.body.homegape.header.button2')}</span>
						</div>
					</div>
					<div
						className="subheader__right-menu__item flex-shrink-0 custom-poiter"
						onClick={e => {
							redirectSingUp();
							setStateActiveNow('register');
						}}
					>
						<span className={classLinkActiveRegister}>{translate('page.body.homegape.header.button3')}</span>
					</div>
				</>
			)
		);
	};

	return (
		isLoggedIn && (
			<>
		<div className="subheaderDesktop-screen">
			<div className="container-subheader">
				<nav className="subheader d-flex flex-row justify-content-between align-items-center">
					<div className="subheader__left-menu d-flex flex-row align-items-center">
						
						{renderUnLogin()}
						{renderProfileTab()}
						{renderDashboardTab()}
						{renderFinanceTab()}
						
						
					




					</div>

					<div className="subheader__right-menu d-flex align-items-center flex-row">
						{renderUnLogin()}
						<SideBarToggle />
						<NavBar />
						
						<div className="white-line" style={{marginTop: '-12px'}}></div>

					</div>
				</nav>
			</div>
		</div>
		</>
		)
		


	);
};
