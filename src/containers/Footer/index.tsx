import * as React from 'react';
import { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

//  import styled from "styled-components";
import {  FaPhoneAlt, FaEnvelope, FaFacebook, FaTelegram, FaTwitter, FaGlobe } from 'react-icons/fa';

const Logo = require('../../assets/images/logo2.svg');

const logoTechno = require ('../../assets/svg/branco_techno_bandeira_verde.svg')

const fortemIcon = require ('./fortemIcon.png')

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
			<div className="fortem-line"></div>
			<div className="container-footer-screen">
				<div className="footer d-flex flex-row justify-content-between ">
					<div className="footer__logo">
					<div className="footer__info">
						<p className="footer__info__title">POWERED BY:</p>
						<a className="footer__logo__img" href="/">
							<img src={logoTechno} alt="" style={{width: '220px'}}/>
						</a>
					</div>
					</div>

					<div className="footer__info">
						<p className="footer__info__title">CONTATO</p>
						<p className="footer__info__item">
							<FaPhoneAlt className="footer__info__item__icon" /> (11) - 3000-2022
						</p>
						<p className="footer__info__item">
							<FaEnvelope className="footer__info__item__icon" /> contato@fortem1.com.br
						</p>
					</div>

					<div className="footer__info">
						<p className="footer__info__title">SUPORTE</p>
						<p className="footer__info__item">
							<Link to="/fee">Taxas </Link>
						</p>
						<p className="footer__info__item">
							<Link to="/announcement">Comunicados </Link>
						</p>
						<p className="footer__info__item">
							<a href="https://ajuda.fortem.website" target="_blank" rel="noopener noreferrer">
								Dúvidas frequentes
							</a>
						</p>
						<p className="footer__info__item">
							<a href="https://www.fortem1.com.br/api" target="_blank" rel="noopener noreferrer">
								Documentação das APIs
							</a>
						</p>
					</div>

					<div className="footer__news">
						<p className="footer__news__title">NEWSLETTER</p>

						<div className="footer__news__take-email">
							
							<div className="footer__news__take-email__label">Receba nossa newsletter</div>
							<input
								className="footer__news__take-email__input"
								placeholder="Digite seu email"
								type="email"
								value={valueInput}
								onChange={inputEmail}
							/>
							<span className="footer__news__take-email__btn" onClick={sendEmail}>
								Enviar
							</span>
						</div>
						<br />
						<p className="footer__news__title">REDES SOCIAIS</p>
						<div className="footer__news__list-icon ">
							<div className="footer__news__list-icon__item  ">
								<a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
									<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="1.6428571428571428rem" height="1.6428571428571428rem" className="brandhub-icon"><path d="M32 6.076a13.025 13.025 0 01-3.771 1.033 6.581 6.581 0 002.887-3.632 13.144 13.144 0 01-4.169 1.594 6.556 6.556 0 00-4.792-2.073 6.565 6.565 0 00-6.565 6.565c0 .514.058 1.015.17 1.496A18.643 18.643 0 012.227 4.2a6.533 6.533 0 00-.889 3.301 6.563 6.563 0 002.92 5.464 6.54 6.54 0 01-2.974-.822l-.001.083a6.57 6.57 0 005.267 6.437 6.62 6.62 0 01-2.966.112 6.571 6.571 0 006.133 4.559 13.17 13.17 0 01-8.153 2.811 13.29 13.29 0 01-1.566-.092 18.576 18.576 0 0010.064 2.95c12.076 0 18.679-10.003 18.679-18.679 0-.284-.006-.568-.018-.85a13.307 13.307 0 003.275-3.397z" fill="currentColor"></path></svg>
								</a>
							</div>

							<div className="footer__news__list-icon__item  ">
								<a href="https://www.facebook.com/profile.php?id=100087101431485" target="_blank" rel="noopener noreferrer">
									<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1.6428571428571428rem" height="1.6428571428571428rem" className="brandhub-icon"><path d="M512 0c282.77 0 512 230.58 512 515.02 0 257.06-187.23 470.12-432 508.76V663.89h119.3L734 515.02l-1.243-.031.564-3.539-141.32-.002v-93.037c0-38.958 18.148-76.974 75.388-80.206l8.05-.222h64.562v-126.74l-.421-.071-.023-2.045s-60.882-10.011-119.09-10.011c-121.52 0-200.94 70.956-200.94 199.42v112.92h-135.08v152.45l135.05-.045.024 357.8C169.871 961.152 6.471 779.381.161 528.281l-.166-13.256c0-284.44 229.23-515.02 512-515.02V.004z" fill="currentColor"></path></svg>
								</a>
							</div>
							<div className="footer__news__list-icon__item  ">
								<a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="1.6428571428571428rem" height="1.6428571428571428rem" className="brandhub-icon"><path d="M16 7.677c-4.516 0-8.258 3.677-8.258 8.258s3.677 8.258 8.258 8.258c4.581 0 8.258-3.742 8.258-8.258S20.516 7.677 16 7.677zm0 13.549c-2.903 0-5.29-2.387-5.29-5.29s2.387-5.29 5.29-5.29 5.29 2.387 5.29 5.29-2.387 5.29-5.29 5.29zM26.452 7.484a1.871 1.871 0 11-3.743 0 1.871 1.871 0 013.743 0z" fill="currentColor"></path><path d="M29.419 2.645C27.742.903 25.355 0 22.645 0H9.355C3.742 0 0 3.742 0 9.355v13.226c0 2.774.903 5.161 2.71 6.903C4.452 31.161 6.774 32 9.42 32h13.161c2.774 0 5.097-.903 6.774-2.516C31.097 27.807 32 25.42 32 22.645V9.355c0-2.71-.903-5.032-2.581-6.71zm-.258 20c0 2-.71 3.613-1.871 4.71s-2.774 1.677-4.71 1.677H9.419c-1.935 0-3.548-.581-4.71-1.677-1.161-1.161-1.742-2.774-1.742-4.774V9.355c0-1.935.581-3.548 1.742-4.71 1.097-1.097 2.774-1.677 4.71-1.677h13.29c1.935 0 3.548.581 4.71 1.742 1.097 1.161 1.742 2.774 1.742 4.645v13.29z" fill="currentColor"></path></svg>
								</a>
							</div>
							<div className="footer__news__list-icon__item  ">
								<a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="1.6428571428571428rem" height="1.6428571428571428rem" className="brandhub-icon"><path d="M25.604 30.968V18.852s-.359-3.241-3.495-3.241c-3.134 0-3.707 3.081-3.707 3.081v12.276h-6.459l.105-20.014h6.248l-.051 2.516s1.303-3.288 6.211-3.288c4.907 0 7.13 2.82 7.543 8.093v12.694h-6.396zM4.021 8.111C1.802 8.111 0 6.524 0 4.562s1.802-3.553 4.021-3.553S8.042 2.6 8.042 4.562 6.24 8.111 4.021 8.111zm3.986 22.881H.066V11.005l7.941-.051v20.038z" fill="currentColor"></path></svg>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div>
				<div className="fortem-line"></div>

				<p className="footer__copyright">
					<img src={fortemIcon} style={{width: '13px', marginTop: '-2px'}}/>Fortem ONE S.A. © 2022 Copyright : <a href="https://www.fortem1.com.br"> fortem1.com.br </a> | | Fortem Technologies Inc © 2018 - 2022 Copyright : <a href="https://www.fortem-one.tech/"> fortem-one.tech </a> 
				</p>
			</div>
		</div>
	);
};
