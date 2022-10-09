import classNames from 'classnames';
//import { TOGGLE_SIDEBAR } from 'modules/public/globalSettings/constants';
import * as React from 'react';
import {useState, useRef} from "react";

import { FaAward, FaGift, FaHistory, FaSignOutAlt, FaStar, FaUserCircle, FaUserPlus } from 'react-icons/fa';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logoutFetch, selectUserLoggedIn } from '../../modules';

import { ProfileActiveStepAction } from 'containers/ProfileActiveStepAction';

import useStickyHeader from "./useStickyHeader";
import Notifications from "react-notifications-menu";
import './notifications.css'
import Menu from '../../react-menu/src/AnimatedNavbar';
import styled from "styled-components"

const Logo = require('../../assets/images/logo_branca_bandeira_verde.svg');

export const Header: React.FC = () => {
	const history = useHistory();
	const intl = useIntl();

	const isLoggedIn = useSelector(selectUserLoggedIn);
	const [activeNow, setActiveNow] = React.useState('');
	const [activeItemDrop, setActiveItemDrop] = React.useState('');

	const dispatch = useDispatch();

	let [check, setCheck] = useState(true);
    const sticky = useStickyHeader( 50 );
    const headerClasses = `header-default ${(sticky && check) ? 'sticky' : ''}`

	const HeaderSTyle="header-transparent";

	const setStateActiveNow = (nameActive: string) => {
		setActiveNow(nameActive);
		setActiveItemDrop('');
	};

	const classActiveItemDrop = (nameItem: string) =>
		classNames('header__right-menu__dropdown__wrap__content__title d-flex align-items-center', {
			'header__right-menu__dropdown__wrap__content__title--active': activeItemDrop === nameItem,
		});

	const classLinkActive = (nameActive: string) => {
		return classNames('header__left-menu__dropdown__wrap', {
			'header__left-menu__dropdown__wrap--active': activeNow === nameActive,
		});
	};

	const classLinkActiveTitleDrop = (nameActive: string) => {
		return classNames('header__right-menu__dropdown__wrap__dropbtn d-flex flex-row align-items-center', {
			'header__right-menu__dropdown__wrap__dropbtn--active': activeNow === nameActive,
		});
	};

	
	const AppContainer = styled.div`
  background: transparent;
  display: flex;
  z-index: 9999;
  flex-direction: column;
  height: 80px;
  margin-top: -80px;

  > div:first-of-type {
    flex: 1 0 70vh;
  }
`

	const renderWalletLink = () => {
		const classItemTitle = classNames('header__right-menu__item__title', {
			'header__right-menu__item__title--active': activeNow === 'Wallet',
		});

		return (
			isLoggedIn && (
				<div className="header__right-menu__item ">
					<div className={classItemTitle} onClick={() => setStateActiveNow('Wallet')}>
						<Link to="/wallets">My Wallets</Link>
					</div>
				</div>
			)
		);
	};

	const renderOrderTab = () => {
		return (
			isLoggedIn && (
			
				<div className="header__right-menu__dropdown__wrap">
					<span className={classLinkActiveTitleDrop('orders')}>
						{translate('page.body.homepage.header.orders')}
						<div className="header__right-menu__dropdown__wrap__dropbtn__icon-drop-down"> </div>
					</span>
					<div className="header__right-menu__dropdown__wrap__content">
						<Link
							to="/orders"
							onClick={() => {
								setStateActiveNow('orders');
								setActiveItemDrop('orders');
							}}
						>
							<div className={classActiveItemDrop('orders')}>
								<FaStar className="mr-2" />
								{translate('page.body.homepage.header.openOrder')}
							</div>
						</Link>
						<Link
							to="/history"
							onClick={() => {
								setStateActiveNow('orders');
								setActiveItemDrop('history');
							}}
						>
							<div className={classActiveItemDrop('history')}>
								<FaHistory className="header__right-menu__dropdown__wrap__content__title__icon mr-2" />
								{translate('page.body.homepage.header.history')}
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
				<div className="header__right-menu__dropdown__wrap__content__title d-flex align-items-center">
					<FaSignOutAlt className="header__right-menu__dropdown__wrap__content__title__icon mr-2" />
					<FormattedMessage id={'page.body.profile.content.action.logout'} />
				</div>
			</Link>
		);
	};

	const renderProfileLink = () => {
		return (
			isLoggedIn && (
				<Link
					to="/admin/account/settings"
					onClick={() => {
						setStateActiveNow('account');
						setActiveItemDrop('perfil');
					}}
				>
					<div className={classActiveItemDrop('perfil')}>
						<FaUserCircle className="header__right-menu__dropdown__wrap__content__title__icon mr-2" />
						<FormattedMessage id={'page.header.navbar.profile'} />
					</div>
				</Link>
				
			)
		);
	};

	const data = [{ 
	image:     "https://cutshort-data.s3.amazonaws.com/cloudfront/public/companies/5809d1d8af3059ed5b346ed1/logo-1615367026425-logo-v6.png",
	message: 'Nossa plataforma de lançamento de tokens está no ar. Conheça novas opções de investimentos em ativos digitais.', 
	detailPage: '/tokens',
	receivedTime: "12h ago"
}];

	const renderProfileTab = () => {
		return (
			isLoggedIn && (
				<>
					< Notifications  data={data} header={{
    title: 'Notificações',
    option: { text: 'Ver todas', onClick: () => console.log('Clicked') },
	classNamePrefix: 'fortem',
  }} />
					<div className="header__right-menu__dropdown__wrap">
						<span className={classLinkActiveTitleDrop('account')}>
							<FaUserCircle className="header__right-menu__dropdown__wrap__content__title__icon mr-2" />
							Toti
							{/*{translate('page.body.homepage.header.account')}*/}
							<div className="header__right-menu__dropdown__wrap__dropbtn__icon-drop-down"> </div>
						</span>
						<div className="header__right-menu__dropdown__wrap__content header__right-menu__dropdown__wrap__content--account">
							
							{renderProfileLink()}
							{renderReferralLink()}
							{renderLogout()}
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
					to="/admin/profile/settings"
					onClick={() => {
						setStateActiveNow('account');
						setActiveItemDrop('kyc');
					}}
				>
					<div className={classActiveItemDrop('kyc')}>
						<FaUserCircle className="header__right-menu__dropdown__wrap__content__title__icon mr-2" />
						< ProfileActiveStepAction />
						{/*<FormattedMessage id={'page.header.navbar.profile'} />*/}
					</div>
				</Link>
			)
		);
	};

	const redirectSingIn = () => {
		history.push('/signin');
	};

	const redirectSingUp = () => {
		history.push('/banner/authentication/sign-up/basic');
	};

	const translate = (key: string) => intl.formatMessage({ id: key });

	const renderUnLogin = () => {
		const classLinkActiveLogin = classNames('header__right-menu__item__title', {
			'header__right-menu__item__title--active': activeNow === 'login',
		});

		const classLinkActiveRegister = classNames('header__right-menu__item__title header__right-menu__item__title--btn ', {
			'header__right-menu__item__title--btn--active': activeNow === 'register',
		});

		return (
			!isLoggedIn && (
				<>
					<div
						className="header__right-menu__items flex-shrink-0 custom-poiter"
						onClick={e => {
							redirectSingIn();
							setStateActiveNow('login');
						}} style={{fontSize: '18px', fontWeight: 'bold', fontFamily: 'roboto, helvetica, sans-serif' }}>
							<div className={classLinkActiveLogin}>

								<span >{translate('page.header.signIn')}</span>
							</div>


						
								
					

					</div>
					<div
						className="header__right-menu__item flex-shrink-0 custom-poiter"
						onClick={e => {
							redirectSingUp();
							setStateActiveNow('register');
						}}
					>

						<span className={classLinkActiveRegister}>{translate('page.header.signUp')}</span>
					</div>
				</>
			)
		);
	};
 
	return (
		<>

<header className={`headerDesktop-screen rn-header header-default header--stick`}>		
			<div className="container-header">
				<nav className="header d-flex flex-row justify-content-between align-items-center">
					<div className="header__left-menu d-flex flex-row align-items-center">
						<div className="header-logo" style={{zIndex: 99999}} onClick={() => setStateActiveNow('')}>
							<Link to="/">
								<img src={Logo} alt=""  />
							</Link>
						</div>

					</div>
						
{/*

						<div className="header__left-menu__dropdown flex-shrink-0  ">
							<div className="header__left-menu__dropdown__wrap">
								<span className={classLinkActiveTitleDrop('Exchange')}>
									Negociação
									<div className="header__left-menu__dropdown__wrap__dropbtn__icon-drop-down"> </div>
								</span>
								<div className="header__left-menu__dropdown__wrap__content">
									<Link
										to="/markets"
										className="header__left-menu__dropdown__wrap__dropbtn d-flex flex-row align-items-center"
										onClick={() => {
											setStateActiveNow('Exchange');
											setActiveItemDrop('markets');
										}}
									>
										<div className={classActiveItemDrop('markets')}>
											<FaGift className="header__left-menu__dropdown__wrap__content__title__icon mr-2" />
											Mercados
										</div>
									</Link>
									<Link
										to="/quick-exchange"
										className="header__left-menu__dropdown__wrap__dropbtn d-flex flex-row align-items-center"
										onClick={() => {
											setStateActiveNow('Exchange');
											setActiveItemDrop('fast');
										}}
									>
										<div className={classActiveItemDrop('fast')}>
											<FaGift className="header__left-menu__dropdown__wrap__content__title__icon mr-2" />
											Exchange Fast
										</div>
									</Link>
									<a
   										target="_blank"
   										rel="noreferrer"
   										href="http://demo.exchange.fortem-financial.io/">
        
										<div className={classActiveItemDrop('pro')}>
											<FaGift className="header__left-menu__dropdown__wrap__content__title__icon mr-2" />
											Exchange Pro
										</div>
										</a>

								</div>
							</div>
						</div>

						<div className="header__left-menu__dropdown flex-shrink-0  ">
							<div className="header__left-menu__dropdown__wrap">
								<span className={classLinkActiveTitleDrop('DigitalAssets')}>
									Ativos Digitais
									<div className="header__left-menu__dropdown__wrap__dropbtn__icon-drop-down"> </div>
								</span>
								<div className="header__left-menu__dropdown__wrap__content">
									<Link
										to="/tokens"
										className="header__left-menu__dropdown__wrap__dropbtn d-flex flex-row align-items-center"
										onClick={() => {
											setStateActiveNow('DigitalAssets');
											setActiveItemDrop('investors');
										}}
									>
										<div className={classActiveItemDrop('investors')}>
											<FaGift className="header__left-menu__dropdown__wrap__content__title__icon mr-2" />
											Emitir tokens
										</div>
									</Link>
									<Link
										to="/tokens"
										className="header__left-menu__dropdown__wrap__dropbtn d-flex flex-row align-items-center"
										onClick={() => {
											setStateActiveNow('DigitalAssets');
											setActiveItemDrop('emiters');
										}}
									>
										<div className={classActiveItemDrop('emiters')}>
											<FaGift className="header__left-menu__dropdown__wrap__content__title__icon mr-2" />
											Comprar tokens
										</div>
									</Link>
									<a
   										target="_blank"
   										rel="noreferrer"
   										href="http://demo.exchange.fortem-financial.io/">
        
										<div className={classActiveItemDrop('learn-tokenization')}>
											<FaGift className="header__left-menu__dropdown__wrap__content__title__icon mr-2" />
											Saiba mais
										</div>
									</a>

								</div>
							</div>
						</div>						
						
						
						<div className="header__left-menu__dropdown flex-shrink-0 d-none d-lg-block d-xl-block ">
							<div className={classLinkActive('stake')} onClick={() => setStateActiveNow('stake')}>
								<Link
									to="/fortem-token"
									className="header__left-menu__dropdown__wrap__dropbtn d-flex flex-row align-items-center"
								>
									Token Fortem
								</Link>
							</div>
						</div>
						<div className="header__left-menu__dropdown flex-shrink-0  ">
							<div className="header__left-menu__dropdown__wrap">
								<span className={classLinkActiveTitleDrop('More')}>
									Mais
									<div className="header__left-menu__dropdown__wrap__dropbtn__icon-drop-down"> </div>
								</span>
								<div className="header__left-menu__dropdown__wrap__content">
									<Link
										to=""
										className="header__left-menu__dropdown__wrap__dropbtn d-flex flex-row align-items-center"
										onClick={() => {
											setStateActiveNow('More');
											setActiveItemDrop('for-issuers');
										}}
									>
										<div className={classActiveItemDrop('for-issuers')}>
											<FaGift className="header__left-menu__dropdown__wrap__content__title__icon mr-2" />
											Emissores
										</div>
									</Link>
									<Link
										to=""
										className="header__left-menu__dropdown__wrap__dropbtn d-flex flex-row align-items-center"
										onClick={() => {
											setStateActiveNow('More');
											setActiveItemDrop('for-investors');
										}}
									>
										<div className={classActiveItemDrop('for-investors')}>
											<FaGift className="header__left-menu__dropdown__wrap__content__title__icon mr-2" />
											Investidores
										</div>
									</Link>
									<Link
										to="/airdrops"
										className="header__left-menu__dropdown__wrap__dropbtn d-flex flex-row align-items-center"
										onClick={() => {
											setStateActiveNow('More');
											setActiveItemDrop('airdrops');
										}}
									>
										<div className={classActiveItemDrop('airdrops')}>
											<FaGift className="header__left-menu__dropdown__wrap__content__title__icon mr-2" />
											Airdrops
										</div>
									</Link>
									<Link
										to="/trading-competition"
										className="header__left-menu__dropdown__wrap__dropbtn d-flex flex-row align-items-center"
										onClick={() => {
											setStateActiveNow('More');
											setActiveItemDrop('trading-competition');
										}}
									>
										<div className={classActiveItemDrop('trading-competition')}>
											<FaAward className="header__left-menu__dropdown__wrap__content__title__icon mr-2" />
											Competitions
										</div>
									</Link>
									<Link
										to="/quant-zone"
										className="header__left-menu__dropdown__wrap__dropbtn d-flex flex-row align-items-center"
										onClick={() => {
											setStateActiveNow('More');
											setActiveItemDrop('quant-zone');
										}}
									>
										<div className={classActiveItemDrop('quant-zone')}>
											<FaGift className="header__left-menu__dropdown__wrap__content__title__icon mr-2" />
											Quant Zone
										</div>
									</Link>
									<Link
										to="/advanced-trading"
										className="header__left-menu__dropdown__wrap__dropbtn d-flex flex-row align-items-center"
										onClick={() => {
											setStateActiveNow('More');
											setActiveItemDrop('advanced-trading');
										}}
									>
										<div className={classActiveItemDrop('advanced-trading')}>
											<FaGift className="header__left-menu__dropdown__wrap__content__title__icon mr-2" />
											Advanced
										</div>
									</Link>
								</div>
							</div>
						</div>
						<div className="header__left-menu__dropdown flex-shrink-0  ">
							<div className="header__left-menu__dropdown__wrap">
								<span className={classLinkActiveTitleDrop('Learn')}>
									Aprenda
									<div className="header__left-menu__dropdown__wrap__dropbtn__icon-drop-down"> </div>
								</span>
								<div className="header__left-menu__dropdown__wrap__content">
									<Link
										to=""
										className="header__left-menu__dropdown__wrap__dropbtn d-flex flex-row align-items-center"
										onClick={() => {
											setStateActiveNow('Learn');
											setActiveItemDrop('Research');
										}}
									>
										<div className={classActiveItemDrop('research')}>
											<FaGift className="header__left-menu__dropdown__wrap__content__title__icon mr-2" />
											Research
										</div>
									</Link>
									<Link
										to="/"
										className="header__left-menu__dropdown__wrap__dropbtn d-flex flex-row align-items-center"
										onClick={() => {
											setStateActiveNow('Learn');
											setActiveItemDrop('Academy');
										}}
									>
										<div className={classActiveItemDrop('academy')}>
											<FaAward className="header__left-menu__dropdown__wrap__content__title__icon mr-2" />
											Fortem Academy
										</div>
									</Link>
								</div>
							</div>
						</div>
						<div className="header__left-menu__dropdown flex-shrink-0  ">
							<div className={classLinkActive('news')} onClick={() => setStateActiveNow('news')}>
								<Link
									to=""
									className="header__left-menu__dropdown__wrap__dropbtn d-flex flex-row align-items-center"
								>
									Notícias
								</Link>
							</div>
						</div>
	


						

					</div>
	*/}
					<div className="header__right-menu d-flex align-items-center flex-row" style={{zIndex: 99999}}>
						{renderUnLogin()}
						{renderProfileTab()}
					</div>



								
				</nav>
			</div>

			<AppContainer>

<Menu duration={300}/>
</AppContainer>


			</header>

  
  </>

	);
};
