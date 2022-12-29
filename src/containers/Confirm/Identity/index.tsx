import cr from 'classnames';
import * as moment from 'moment';
import * as React from 'react';
import { Button } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import MaskInput from 'react-maskinput';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { RouterProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { languages } from '../../../api/config';
import { CustomInput, DropdownComponent } from '../../../components';
import { formatDate, isDateInFuture } from '../../../helpers';
import { IntlProps } from '../../../index';
import {
	editIdentity,
	Label,
	labelFetch,
	RootState,
	selectCurrentLanguage,
	selectEditIdentitySuccess,
	selectLabelData,
	selectSendIdentitySuccess,
	selectUserInfo,
	sendIdentity,
	User,
} from '../../../modules';
import { IdentityData } from '../../../modules/user/kyc/identity/types';

import * as countries from 'i18n-iso-countries';

interface ReduxProps {
	editSuccess?: string;
	sendSuccess?: string;
	lang: string;
	labels: Label[];
	user: User;
}

interface DispatchProps {
	editIdentity: typeof editIdentity;
	sendIdentity: typeof sendIdentity;
	labelFetch: typeof labelFetch;
}

interface OnChangeEvent {
	target: {
		value: string;
	};
}

interface IdentityState {
	cpf: string;
	city: string;
	countryOfBirth: string;
	dateOfBirth: string;
	firstName: string;
	lastName: string;
	postcode: string;
	residentialAddress: string;
	cityFocused: boolean;
	dateOfBirthFocused: boolean;
	firstNameFocused: boolean;
	lastNameFocused: boolean;
	cpfFocused: boolean;
	postcodeFocused: boolean;
	residentialAddressFocused: boolean;
}

type Props = ReduxProps & DispatchProps & RouterProps & IntlProps;

class IdentityComponent extends React.Component<Props, IdentityState> {
	public state = {
		cpf: '',
		city: '',
		countryOfBirth: '',
		dateOfBirth: '',
		firstName: '',
		lastName: '',
		postcode: '',
		residentialAddress: '',
		cityFocused: false,
		dateOfBirthFocused: false,
		firstNameFocused: false,
		lastNameFocused: false,
		cpfFocused: false,
		postcodeFocused: false,
		residentialAddressFocused: false,
	};

	public translate = (e: string) => {
		return this.props.intl.formatMessage({ id: e });
	};

	public componentDidUpdate(prev: Props) {
		const { history, editSuccess, sendSuccess } = this.props;

		if ((!prev.editSuccess && editSuccess) || (!prev.sendSuccess && sendSuccess)) {
			this.props.labelFetch();
			history.push('/profile');
		}
	}

	public render() {
		const { editSuccess, sendSuccess, lang } = this.props;
		const {
			cpf,
			city,
			dateOfBirth,
			firstName,
			lastName,
			postcode,
			residentialAddress,
			cityFocused,
			dateOfBirthFocused,
			firstNameFocused,
			lastNameFocused,
			postcodeFocused,
			residentialAddressFocused,
			cpfFocused
		} = this.state;

		const firstNameGroupClass = cr('pg-confirm__content-identity__forms__row__content', {
			'pg-confirm__content-identity__forms__row__content--focused': firstNameFocused,
			'pg-confirm__content-identity__forms__row__content--wrong':
				firstName && !this.handleValidateInput('firstName', firstName),
		});

		const lastNameGroupClass = cr('pg-confirm__content-identity__forms__row__content', {
			'pg-confirm__content-identity__forms__row__content--focused': lastNameFocused,
			'pg-confirm__content-identity__forms__row__content--wrong':
				lastName && !this.handleValidateInput('lastName', lastName),
		});

		const dateOfBirthGroupClass = cr('pg-confirm__content-identity__forms__row__content', {
			'pg-confirm__content-identity__forms__row__content--focused': dateOfBirthFocused,
			'pg-confirm__content-identity__forms__row__content--wrong':
				dateOfBirth && !this.handleValidateInput('dateOfBirth', dateOfBirth),
		});

		const cpfGroupClass = cr('pg-confirm__content-identity__forms__row__content', {
			'pg-confirm__content-identity__forms__row__content--focused': cpfFocused,
			'pg-confirm__content-identity__forms__row__content--wrong':
				cpf && !this.handleValidateInput('cpf', cpf),
		});

		const residentialAddressGroupClass = cr('pg-confirm__content-identity__forms__row__content', {
			'pg-confirm__content-identity__forms__row__content--focused': residentialAddressFocused,
			'pg-confirm__content-identity__forms__row__content--wrong':
				residentialAddress && !this.handleValidateInput('residentialAddress', residentialAddress),
		});

		const cityGroupClass = cr('pg-confirm__content-identity__forms__row__content', {
			'pg-confirm__content-identity__forms__row__content--focused': cityFocused,
			'pg-confirm__content-identity__forms__row__content--wrong': city && !this.handleValidateInput('city', city),
		});

		const postcodeGroupClass = cr('pg-confirm__content-identity__forms__row__content', {
			'pg-confirm__content-identity__forms__row__content--focused': postcodeFocused,
			'pg-confirm__content-identity__forms__row__content--wrong':
				postcode && !this.handleValidateInput('postcode', postcode),
		});

		/* tslint:disable */
		languages.map((l: string) => countries.registerLocale(require(`i18n-iso-countries/langs/${l}.json`)));

		/* tslint:enable */

		const dataCountries = Object.values(countries.getNames(lang));
		//const onSelectCountry = value => this.selectCountry(dataCountries[value]);
		const onSelectCountry = 'BR';

		return (
			<div className="pg-confirm__content-identity">
				<div className="pg-confirm__content-identity__forms">
					<div className="pg-confirm__content-identity__forms__row input-group-identity">
						<fieldset className={firstNameGroupClass}>
							<CustomInput
								type="string"
								inputValue={firstName}
								placeholder={this.translate('page.body.kyc.identity.firstName')}
								handleChangeInput={e => this.handleChange(e, 'firstName')}
								autoFocus={true}
								label={this.translate('page.body.kyc.identity.firstName')}
								classNameLabel="pg-confirm__content-identity__forms__row__content__label"
								defaultLabel={'Primeiro nome'}
								handleFocusInput={this.handleFieldFocus('firstName')}
							/>
						</fieldset>
						<fieldset className={lastNameGroupClass}>
							<CustomInput
								type="string"
								inputValue={lastName}
								handleChangeInput={e => this.handleChange(e, 'lastName')}
								placeholder={this.translate('page.body.kyc.identity.lastName')}
								label={this.translate('page.body.kyc.identity.lastName')}
								classNameLabel="pg-confirm__content-identity__forms__row__content__label"
								defaultLabel={'Sobrenome'}
								handleFocusInput={this.handleFieldFocus('lastName')}
							/>
						</fieldset>
					</div>
					<div className="pg-confirm__content-identity__forms__row">
						<fieldset className={dateOfBirthGroupClass}>
							<div className="custom-input">
								<label>{this.translate('page.body.kyc.identity.dateOfBirth')}</label>
								<div className="input-group input-group-lg">
									<MaskInput
										className="pg-confirm__content-identity__forms__row__content-number"
										maskString="00/00/0000"
										mask="00/00/0000"
										onChange={this.handleChangeDate}
										onFocus={this.handleFieldFocus('dateOfBirth')}
										onBlur={this.handleFieldFocus('dateOfBirth')}
										value={dateOfBirth}
										placeholder={this.translate('page.body.kyc.identity.dateOfBirth.placeholder')}
									/>
								</div>
							</div>
						</fieldset>
						<fieldset className={cpfGroupClass}>
							<div className="custom-input">
								<label>{this.translate('page.body.kyc.identity.cpf')}</label>
								<div className="input-group input-group-lg">
									<MaskInput
										className="pg-confirm__content-identity__forms__row__content-number"
										maskString="000.000.000-00"
										mask="000.000.000-00"
										onChange={this.handleChangeCPF}
										onFocus={this.handleFieldFocus('cpf')}
										onBlur={this.handleFieldFocus('cpf')}
										value={cpf}
										placeholder={this.translate('page.body.kyc.identity.cpf.placeholder')}
									/>
								</div>
							</div>
						</fieldset>
					</div>
					<div className="pg-confirm__content-identity__forms__row input-group-identity">
						<fieldset className={residentialAddressGroupClass}>
							<CustomInput
								type="string"
								inputValue={residentialAddress}
								placeholder={this.translate('page.body.kyc.identity.residentialAddress')}
								label={this.translate('page.body.kyc.identity.residentialAddress')}
								classNameLabel="pg-confirm__content-identity__forms__row__content__label"
								defaultLabel={'Endereço residencial'}
								handleChangeInput={e => this.handleChange(e, 'residentialAddress')}
								handleFocusInput={this.handleFieldFocus('residentialAddress')}
							/>
						</fieldset>
					</div>
					<div className="pg-confirm__content-identity__forms__row input-group2">
						<fieldset className={cityGroupClass}>
							<CustomInput
								type="string"
								inputValue={city}
								handleChangeInput={e => this.handleChange(e, 'city')}
								placeholder={this.translate('page.body.kyc.identity.city')}
								label={this.translate('page.body.kyc.identity.city')}
								classNameLabel="pg-confirm__content-identity__forms__row__content__label"
								defaultLabel={'Ciade'}
								handleFocusInput={this.handleFieldFocus('city')}
							/>
						</fieldset>
						<fieldset className={postcodeGroupClass}>
							<CustomInput
								label={this.translate('page.body.kyc.identity.postcode')}
								defaultLabel="Código Postal"
								type="string"
								inputValue={postcode}
								handleChangeInput={e => this.handleChange(e, 'postcode')}
								onKeyPress={this.handleConfirmEnterPress}
								placeholder={this.translate('page.body.kyc.identity.postcode')}
								handleFocusInput={this.handleFieldFocus('postcode')}
								classNameLabel="pg-confirm__content-identity__forms__row__content__label"
								
							/>
						</fieldset>
					</div>
				</div>
				{sendSuccess && !editSuccess && <p className="pg-confirm__success">{this.translate(sendSuccess)}</p>}
				{editSuccess && !sendSuccess && <p className="pg-confirm__success">{this.translate(editSuccess)}</p>}
				<div className="pg-confirm__content-deep">
					<Button
						onClick={this.sendData}
						disabled={this.handleCheckButtonDisabled()}
						size="lg"
						variant="primary"
						type="button"
						block={true}
					>
						{this.translate('page.body.kyc.next')}
					</Button>
				</div>
			</div>
		);
	}

	private scrollToElement = (displayedElem: number) => {
		const element: HTMLElement = document.getElementsByClassName('pg-confirm__content-identity__forms__row')[
			displayedElem
		] as HTMLElement;
		element && element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
	};

	private handleFieldFocus = (field: string) => {
		return () => {
			switch (field) {
				case 'city':
					this.setState({
						cityFocused: !this.state.cityFocused,
					});
					this.scrollToElement(6);
					break;
				case 'dateOfBirth':
					this.setState({
						dateOfBirthFocused: !this.state.dateOfBirthFocused,
					});
					this.scrollToElement(2);
					break;
				case 'cpf':
					this.setState({
						cpfFocused: !this.state.cpfFocused,
					});
					this.scrollToElement(3);
					break;					
				case 'firstName':
					this.setState({
						firstNameFocused: !this.state.firstNameFocused,
					});
					this.scrollToElement(0);
					break;
				case 'lastName':
					this.setState({
						lastNameFocused: !this.state.lastNameFocused,
					});
					this.scrollToElement(1);
					break;
				case 'postcode':
					this.setState({
						postcodeFocused: !this.state.postcodeFocused,
					});
					this.scrollToElement(7);
					break;
				case 'residentialAddress':
					this.setState({
						residentialAddressFocused: !this.state.residentialAddressFocused,
					});
					this.scrollToElement(5);
					break;
				default:
					break;
			}
		};
	};

	private handleChange = (value: string, key: string) => {
		// @ts-ignore
		this.setState({
			[key]: value,
		});
	};

	private handleConfirmEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && !this.handleCheckButtonDisabled()) {
			event.preventDefault();
			this.sendData();
		}
	};

	private handleChangeDate = (e: OnChangeEvent) => {
		this.setState({
			dateOfBirth: formatDate(e.target.value),
		});
	};

	private handleChangeCPF = (e: OnChangeEvent) => {
		this.setState({
			cpf: this.formatCPF(e.target.value),
		});
	};

	private formatCPF(cpf){
		//retira os caracteres indesejados...
		cpf = cpf.replace(/[^\d]/g, "");
		
		//realizar a formatação...
		  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
	  }

	private selectCountry = (value: string) => {
		this.setState({
			countryOfBirth: countries.getAlpha2Code(value, this.props.lang),
		});
	};

	private handleValidateInput = (field: string, value: string): boolean => {
		switch (field) {
			case 'firstName':
				const firstNameRegex = new RegExp(`^[a-zA-Z0-9,.;/\\s]+$`);

				return value.match(firstNameRegex) ? true : false;
			case 'lastName':
				const lastNameRegex = new RegExp(`^[a-zA-Z0-9,.;/\\s]+$`);

				return value.match(lastNameRegex) ? true : false;
			case 'cpf':
				const cpfRegex = new RegExp(`^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))$`);
	
				return value.match(cpfRegex) ? true : false;				
			case 'residentialAddress':
				const residentialAddressRegex = new RegExp(`^[a-zA-Z0-9,.;/\\s]+$`);

				return value.match(residentialAddressRegex) ? true : false;
			case 'city':
				const cityRegex = new RegExp(`^[a-zA-Z0-9,.;/\\s]+$`);

				return value.match(cityRegex) ? true : false;
			case 'postcode':
				const postcodeRegex = new RegExp(`^[0-9]{1,12}$`);

				return value.match(postcodeRegex) ? true : false;
			case 'dateOfBirth':
				if (value.length === 10) {
					return moment(value, 'DD/MM/YYYY').unix() < Date.now() / 1000;
				}

				return false;
			default:
				return true;
		}
	};

	private handleCheckButtonDisabled = () => {
		const { cpf, city, dateOfBirth, firstName, lastName, postcode, residentialAddress, countryOfBirth } = this.state;

		const firstNameValid = this.handleValidateInput('firstName', firstName);
		const lastNameValid = this.handleValidateInput('lastName', lastName);
		const residentialAddressValid = this.handleValidateInput('residentialAddress', residentialAddress);
		const cityValid = this.handleValidateInput('city', city);
		const postcodeValid = this.handleValidateInput('postcode', postcode);
		const dateOfBirthValid = this.handleValidateInput('dateOfBirth', dateOfBirth);
		const cpfValid = this.handleValidateInput('cpf', cpf);

		return (
			!firstNameValid ||
			!lastNameValid ||
			!cpfValid ||
			!residentialAddressValid ||
			
			!cityValid ||
			!postcodeValid ||
			!dateOfBirthValid
		);
	};

	private sendData = () => {
		const { labels, user } = this.props;
		const dob = !isDateInFuture(this.state.dateOfBirth) ? this.state.dateOfBirth : '';
		const metadata = null;
		const profileInfo: IdentityData = {
			first_name: this.state.firstName,
			last_name: this.state.lastName,
			metadata: null,

			dob,
			address: this.state.residentialAddress,
			postcode: this.state.postcode,
			city: this.state.city,
			country: this.state.countryOfBirth,
			confirm: true,
		};
		const isIdentity =
			labels.length && labels.find(w => w.key === 'profile' && w.value === 'verified' && w.scope === 'private');
		const verifiedProfiles = user.profiles.length ? user.profiles.filter(i => i.state === 'verified') : [];
		const lastVerifiedProfile = verifiedProfiles.length && verifiedProfiles[verifiedProfiles.length - 1];

		if (!isIdentity && lastVerifiedProfile && lastVerifiedProfile.address) {
			this.props.editIdentity(profileInfo);
		} else {
			this.props.sendIdentity(profileInfo);
		}
	};
}

const mapStateToProps = (state: RootState): ReduxProps => ({
	editSuccess: selectEditIdentitySuccess(state),
	sendSuccess: selectSendIdentitySuccess(state),
	lang: selectCurrentLanguage(state),
	labels: selectLabelData(state),
	user: selectUserInfo(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
	editIdentity: payload => dispatch(editIdentity(payload)),
	sendIdentity: payload => dispatch(sendIdentity(payload)),
	labelFetch: () => dispatch(labelFetch()),
});

export const Identity = compose(injectIntl, withRouter, connect(mapStateToProps, mapDispatchToProps))(IdentityComponent) as any; // tslint:disable-line
