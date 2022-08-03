import cr from 'classnames';
import * as React from 'react';
import { Button } from 'react-bootstrap';
import { CustomInput } from '../';
import { CloseIcon } from '../../assets/images/CloseIcon';

export interface TwoFactorAuthProps {
	errorMessage?: string;
	isLoading?: boolean;
	onSubmit: () => void;
	title: string;
	label: string;
	buttonLabel: string;
	message: string;
	otpCode: string;
	error: string;
	codeFocused: boolean;
	handleOtpCodeChange: (otp: string) => void;
	handleChangeFocusField: () => void;
	handleClose2fa: () => void;
}

class TwoFactorAuthComponent extends React.Component<TwoFactorAuthProps> {
	public render() {
		const { errorMessage, isLoading, title, label, buttonLabel, message, error, otpCode, codeFocused } = this.props;

		const errors = errorMessage || error;
		const buttonWrapperClass = cr('cr-email-form__button-wrapper', {
			'cr-email-form__button-wrapper--empty': !errors,
		});
		const emailGroupClass = cr('cr-email-form__group', {
			'cr-email-form__group--focused': codeFocused,
		});

		return (
			<div className="pg-2fa___form">
				<form>
					<div className="cr-email-form">
						<div className="cr-email-form__options-group">
							<div className="cr-email-form__option">
								<div className="cr-email-form__option-inner">
									{title || 'Autenticação em Duas Etapas (2FA)'}
									<div className="cr-email-form__cros-icon" onClick={this.handleCancel}>
										<CloseIcon className="close-icon" />
									</div>
								</div>
							</div>
						</div>
						<div className="cr-email-form__form-content">
							<div className="cr-email-form__header">{message}</div>
							<div className={emailGroupClass}>
								<CustomInput
									type="password"
									label={label || '6-digit Google Authenticator Code'}
									placeholder={label || '6-digit Google Authenticator Code'}
									defaultLabel="6-digit Google Authenticator Code"
									handleChangeInput={this.props.handleOtpCodeChange}
									inputValue={otpCode}
									handleFocusInput={this.props.handleChangeFocusField}
									classNameLabel="cr-email-form__label"
									classNameInput="cr-email-form__input"
									onKeyPress={this.handleEnterPress}
									autoFocus={true}
								/>
								{errorMessage && <div className="cr-email-form__error">{errorMessage}</div>}
							</div>
							<div className={buttonWrapperClass}>
								<Button
									disabled={isLoading || !otpCode.match(`^[0-9]{6}$`)}
									onClick={this.handleSubmit}
									size="lg"
									variant="primary"
								>
									{isLoading ? 'Loading...' : buttonLabel ? buttonLabel : 'Sign in'}
								</Button>
							</div>
						</div>
					</div>
				</form>
			</div>
		);
	}

	private handleCancel = () => {
		this.props.handleClose2fa();
	};

	private handleSubmit = () => {
		this.props.onSubmit();
	};

	private handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		const { isLoading, otpCode } = this.props;

		if (event.key === 'Enter') {
			event.preventDefault();

			if (!isLoading && otpCode.match(`^[0-9]{6}$`)) {
				this.handleSubmit();
			}
		}
	};
}

export const TwoFactorAuth = TwoFactorAuthComponent;
