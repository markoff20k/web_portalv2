import * as React from 'react';
import { selectIEODetail, fetchIEODetail } from '../../../../modules';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';

export const InformationIEO = () => {
	const toUpperCaseFirstChar = (str: string) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};
	const { ieoID } = useParams<{ ieoID: string }>();
	const ieoDetail = useSelector(selectIEODetail);
	const dispatch = useDispatch();
	React.useEffect(() => {
		dispatch(
			fetchIEODetail({
				ieo_id: Number(ieoID),
			}),
		);
	}, []);

	const {
		name,
		date,
		price,
		homepage,
		bonus,
		bonus_lockup,
		softcap,
		hardcap,
		usage,
		whitepaper,
		tech,
		twitter,
		telegram,
		bottom_banner,
	} = ieoDetail.payload || {
		name: '',
		date: '',
		price: '',
		homepage: '',
		bonus: '',
		bonus_lockup: '',
		softcap: '',
		hardcap: '',
		usage: '',
		whitepaper: '',
		tech: '',
		twitter: '',
		bottom_banner: '',
	};
	const information = {
		name: name,
		date: date,
		price: price,
		homepage: homepage,
		bonus: bonus,
		bonusLookup: bonus_lockup,
		softcap: softcap,
		hardcap: hardcap,
		usage: usage,
		whitepaper: whitepaper,
		tech: tech,
		sns: {
			twitter: twitter || '#',
			telegram: telegram || '#',
		},
	};
	const renderValueOfKey = (key: string) => {
		if (key == 'sns') {
			const urlTwitter = information[key].twitter;
			const urlTelegram = information[key].telegram;
			return (
				<div className="d-flex">
					<a className="text-white" href={`${urlTwitter}`} style={{ paddingRight: '0.5rem' }}>
						Twitter
					</a>
					<a className="text-white" href={`${urlTelegram}`}>
						Telegram
					</a>
				</div>
			);
		}

		return (
			<React.Fragment>
				<p>{information[key]}</p>
			</React.Fragment>
		);
	};

	const loadingSpinner = () => {
		return (
			<div className="loading d-flex -justify-content-center w-100">
				<div className="spinner-border text-primary m-auto" role="status">
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		);
	};
	const showInformationComponent = () => {
		let content: Array<JSX.Element> = [];
		for (let key in information) {
			const jsx = (
				<div key={key} className="col-md-6 col-sm-12 d-flex detail" style={{ padding: '0px' }}>
					<div className="content-key col-md-5 col-xl-3">
						<p>{toUpperCaseFirstChar(key)}</p>
					</div>
					<div className="content-value col-md-7 co-xl-9">{renderValueOfKey(key)}</div>
				</div>
			);
			content.push(jsx);
		}
		return content;
	};
	return (
		<div id="information-ieo">
			<div className="information-ieo-title">
				<h3>DETAIL</h3>
			</div>
			<div className="col-11 content row" style={{ padding: '0px' }}>
				{ieoDetail.loading ? loadingSpinner() : showInformationComponent()}
			</div>
			<div className="information-ieo-image col-11 d-flex justify-content-center" style={{ padding: '0px' }}>
				<img src={bottom_banner} alt="banner-description"></img>
			</div>
		</div>
	);
};
