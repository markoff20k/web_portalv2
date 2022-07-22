import * as React from 'react';
import { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

//  import styled from "styled-components";
import { /* FaPhoneAlt, */ FaEnvelope, FaFacebook, FaTelegram, FaTwitter /* , FaGlobe */ } from 'react-icons/fa';

const Logo = require('../../assets/images/logo2.svg');

export const Footer: React.FC = Props => {
	const history = useHistory();

	const [emailAddress, setemailAddress] = useState('');

	const inputEmail = (e: any) => {
		setemailAddress(e.target.value);
	};

	const sendEmail = () => {
		const valueEmail = emailAddress;
		// do something
		console.log('đã gửi', valueEmail);
		setemailAddress('');
	};

	if (history.location.pathname.startsWith('/confirm')) {
		return <React.Fragment />;
	}

	return <React.Fragment>{renderFooterDesktop(inputEmail, sendEmail, emailAddress)}</React.Fragment>;
};

const renderFooterDesktop = (inputEmail, sendEmail, emailAddress) => {
	const valueInput: string = emailAddress;

	return (
		<div className="footerDesktop-screen">
			<div className="container-footer-screen">
				<div className="footer d-flex flex-row justify-content-between ">
					<div className="footer__logo">
						<a className="footer__logo__img" href="/">
							<img src={Logo} alt="" />
						</a>
					</div>

					<div className="footer__info">
						<p className="footer__info__title">CONTACT</p>
						{/* <p className="footer__info__item">
							<FaPhoneAlt className="footer__info__item__icon" /> 0905333999
						</p> */}
						<p className="footer__info__item">
							<FaEnvelope className="footer__info__item__icon" /> contact@fortem-financial.io
						</p>
					</div>

					<div className="footer__info">
						<p className="footer__info__title">SERVICE SUPPORT</p>
						<p className="footer__info__item">
							<Link to="/fee">Asset Fee </Link>
						</p>
						<p className="footer__info__item">
							<Link to="/announcement">Announcements </Link>
						</p>
						<p className="footer__info__item">
							<a href="https://forms.gle/2eH6ia3XSTyzn2TR6" target="blank">
								Submit New Coin/Token
							</a>
						</p>
						<p className="footer__info__item">
							<a href="https://api.fortem-financial.io" target="blank">
								API Documentation
							</a>
						</p>
					</div>

					<div className="footer__news">
						<p className="footer__news__title">RECEIVE NEWS</p>

						<div className="footer__news__take-email">
							<div className="footer__news__take-email__label">Your email</div>
							<input
								className="footer__news__take-email__input"
								placeholder="enter your email"
								type="email"
								value={valueInput}
								onChange={inputEmail}
							/>
							<span className="footer__news__take-email__btn" onClick={sendEmail}>
								Send
							</span>
						</div>

						<div className="footer__news__list-icon ">
							<div className="footer__news__list-icon__item  ">
								<a href="https://twitter.com/fortem" target="blank">
									<FaTwitter />
								</a>
							</div>

							<div className="footer__news__list-icon__item  ">
								<a href="https://fortem.medium.com/" target="blank">
									<FaFacebook />
								</a>
							</div>
							<div className="footer__news__list-icon__item  ">
								<a href="https://t.me/fortem" target="blank">
									<FaTelegram />
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div>
				<div className="white-line"></div>

				<p className="footer__copyright">
					© 2022 Copyright : <a href="https://demo.fortem-financial.io/"> demo-fortem-financial.io </a>
				</p>
			</div>
		</div>
	);
};
