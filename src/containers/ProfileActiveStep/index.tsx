import classnames from 'classnames';
import { selectUserInfo, selectUserLoggedIn, selectWallets } from 'modules';
import * as React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// tslint:disable-next-line: no-empty-interface
interface ProfileActiveStepProps {}

export const ProfileActiveStep: React.FC<ProfileActiveStepProps> = () => {
	const history = useHistory();
	const isLoggedIn = useSelector(selectUserLoggedIn);
	const user = useSelector(selectUserInfo);
	const wallet = useSelector(selectWallets);

	const isExistBalance =
		wallet.reduce((prev, current) => {
			const result = prev + (current.balance ? +current.balance : 0);

			return result;
		}, 0) > 0;

	const svgActive = (
		<svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M3.99993 7.8L1.19993 5L0.266602 5.93334L3.99993 9.66667L11.9999 1.66667L11.0666 0.733337L3.99993 7.8Z"
				fill="white"
			/>
		</svg>
	);

	const handleNavigateTo2fa = () => {
		if (!user.otp) {
			history.push('/security/2fa', { enable2fa: !user.otp });
		}
	};

	const handleToWallet = () => {
		history.push('/wallets');
	};

	return (
		<div className="td-pg-profile--radius td-pg-profile__active-step">
			
			<span className="td-pg-profile__active-step__desc" style={{fontSize: '1.1em', color: '#c0c0c0'}}>Inicie sua jornada digital em apenas 3 passos:</span>
			<div className="td-pg-profile__active-step__content d-flex">
				<div className="td-pg-profile__active-step__content__item">
					<span
						className={classnames('td-pg-profile__active-step__content__item__step', {
							'td-pg-profile__active-step__content__item__step--active': isLoggedIn,
						})}
						style ={{width: '30px', height: '30px'}}>
						{isLoggedIn ? svgActive : '1'}
					</span>
					<span className="td-pg-profile__active-step__content__item__title mt-1">1. Criação da conta</span>
				</div>
				<div className="td-pg-profile__active-step__content__item">
					<span
						className={classnames('td-pg-profile__active-step__content__item__step', {
							'td-pg-profile__active-step__content__item__step--active': isLoggedIn && user.otp,
						}) }
						style ={{width: '30px', height: '30px'}}>
						{user.otp ? svgActive : '2'}
					</span>
					<span className="td-pg-profile__active-step__content__item__title"> 2. Habilitar Duplo Fator de Autenticação (2FA)</span>
					<span className="td-pg-profile--color--second td-pg-profile__active-step__content__item__desc" >
					{/* A Fortem exige autenticação em duas etapas para manter a segurança da sua conta. Além da senha, use o seu celular ou um aplicativo autenticador para garantir que ninguém mais consiga entrar na sua conta. */}
					A Fortem exige autenticação em duas etapas para manter a segurança da sua conta.
					</span>
					{!user.otp ? (
						<Button
							
							className="td-pg-profile__active-step__content__item__action"
							onClick={handleNavigateTo2fa}
							variant="sign-up"
						>
							Habilitar 2FA
						</Button>
					) : null}
				</div>
				<div className="td-pg-profile__active-step__content__item">
					<span
						className={classnames('td-pg-profile__active-step__content__item__step', {
							'td-pg-profile__active-step__content__item__step--active': user.otp && isExistBalance,
						})}
						style ={{width: '30px', height: '30px'}}>
						{isExistBalance ? svgActive : '3'}
					</span>
					<span className="td-pg-profile__active-step__content__item__title">3. Faça seu primeiro depósito (Reais ou Cripto)</span>
					<span className="td-pg-profile--color--second td-pg-profile__active-step__content__item__desc">
						Adicione reais ou cripto em sua carteira Fortem para iniciar seus investimentos digitais.
					</span>
					{user.otp && !isExistBalance ? (
						<Button
							className="td-pg-profile__active-step__content__item__action"
							onClick={handleToWallet}
							variant="sign-up"
						>
							Minhas carteiras
						</Button>
					) : null}
				</div>
			</div>
			<img
				className="td-pg-profile__active-step__mask-icon"
				src={require('assets/images/profile/maskIconToStep.svg')}
				alt=""
			/>
		</div>
	);
};
