import Tabs, { TabPane } from 'rc-tabs';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useIntl } from 'react-intl';
import { LockIcon } from '../../assets/images/LockIcon';
import { DepositBody } from '../../components';
import { getTabName } from '../../helpers';
import { ChildCurrency, selectCurrencies, selectWallets, walletsAddressFetch, walletsFetch } from '../../modules';

interface DepositAddressProps {
	currency_id: string;
	selectedCurrencyID: string;
	currencyIcon: string;
	childCurrencies: ChildCurrency[];
	changeCurrency: (selectedCurrencyID: string) => void;
}

export const DepositAddress: React.FC<DepositAddressProps> = (props: DepositAddressProps) => {
	const { currency_id, selectedCurrencyID, childCurrencies, changeCurrency } = props;
	const intl = useIntl();
	const [generateAddressTriggered, setGenerateAddressTriggered] = React.useState(false);
	const dispatch = useDispatch();
	const wallets = useSelector(selectWallets) || [];
	const currencies = useSelector(selectCurrencies) || [];
	const mainCurrency = currencies.find(cur => cur.id.toLowerCase() === currency_id.toLowerCase()) || {
		blockchain_key: '',
		deposit_enabled: false,
	};
	const selectedCurrency = currencies.find(cur => cur.id.toLowerCase() === selectedCurrencyID.toLowerCase()) || {
		blockchain_key: '',
		deposit_enabled: false,
	};

	const mainWallet = wallets.find(item => item.currency === currency_id.toLowerCase()) || {
		name: '',
		currency: '',
		balance: '',
		type: '',
		address: '',
	};
	const childWallets = childCurrencies.map(childCurrency => {
		return {
			...childCurrency,
			wallet: wallets.find(item => item.currency === childCurrency.id),
		};
	});
	const isAccountActivated = mainWallet.type === 'fiat' || mainWallet.balance;

	const handleGenerateAddress = (wallet: { address?: string; type?: string; currency: string }) => {
		if (!wallet.address && wallets.length && wallet.type !== 'fiat') {
			dispatch(walletsAddressFetch({ currency: wallet.currency }));
			dispatch(walletsFetch());
			setGenerateAddressTriggered(true);
		}
	};

	React.useEffect(() => {
		dispatch(walletsAddressFetch({ currency: currency_id }));
	}, [currency_id, dispatch]);

	React.useEffect(() => {
		dispatch(walletsAddressFetch({ currency: selectedCurrencyID }));
	}, [selectedCurrencyID, dispatch]);

	React.useEffect(() => {
		dispatch(walletsAddressFetch({ currency: selectedCurrencyID }));
	}, [dispatch, selectedCurrencyID]);

	const renderChildWallets = () => {
		if (childWallets.length <= 0) {
			return '';
		}

		return childWallets.map((childWallet, index) => (
			<TabPane tab={getTabName(childWallet.blockchain_key)} key={childWallet.id}>
				<div style={{ position: 'relative', width: '100%', height: '100%' }}>
					{childWallet.wallet ? (
						<DepositBody
							wallet_index={index + 1}
							wallet={childWallet.wallet}
							isAccountActivated={isAccountActivated}
							handleGenerateAddress={() => {
								if (childWallet.wallet) {
									handleGenerateAddress({
										address: childWallet.wallet.address,
										type: childWallet.wallet.type,
										currency: childWallet.wallet.currency,
									});
								}
							}}
							generateAddressTriggered={generateAddressTriggered}
						/>
					) : (
						''
					)}
					<div hidden={childWallet.deposit_enabled} className="blur-disabled">
						<LockIcon className="pg-blur__content__icon" />
						{intl.formatMessage({
							id: 'page.body.wallets.tabs.deposit.disabled.message',
						})}
					</div>
				</div>
			</TabPane>
		));
	};

	const renderParentWallet = () => {
		if (!mainWallet) {
			return '';
		}

		return (
			<TabPane tab={getTabName(mainCurrency.blockchain_key || '')} key={currency_id}>
				<div style={{ position: 'relative', width: '100%', height: '100%' }}>
					<DepositBody
						wallet_index={0}
						wallet={mainWallet}
						isAccountActivated={isAccountActivated}
						handleGenerateAddress={() =>
							handleGenerateAddress({
								address: mainWallet.address,
								type: mainWallet.type,
								currency: mainWallet.currency,
							})
						}
						generateAddressTriggered={generateAddressTriggered}
					/>
					<div hidden={selectedCurrency.deposit_enabled} className="blur-disabled">
						<LockIcon className="pg-blur__content__icon" />
						{intl.formatMessage({
							id: 'page.body.wallets.tabs.deposit.disabled.message',
						})}
					</div>
				</div>
			</TabPane>
		);
	};

	return (
		<div id="deposit-address">
			<div
				className="container d-flex flex-column justify-content-between"
				style={{ backgroundColor: '#181819', padding: '30px', borderRadius: '5px', height: '100%', fontSize: '16px' }}
			>
				<div>
					{/* <div className="row">
						<div className="col-12 d-flex justify-content-between">
							<span>Blockchain</span>
							<span>Tempo médio de processamento do blockchain: 5-10 minutos</span>
						</div>
					</div> */}
					<div className="row">
						<div className="col-12">
							<div className="react-tabs">
								<Tabs defaultActiveKey={currency_id} onChange={changeCurrency}>
									{renderParentWallet()}
									{renderChildWallets()}
								</Tabs>
							</div>
						</div>
					</div>
				</div>
				<div className="row mt-5">
					<div className="col-12 d-flex justify-content-between">
						<p className="pr-5">
							<strong>Envie somente {selectedCurrencyID.toUpperCase()} para este endereço de depósito.</strong>
							<br />
							Enviar outra moeda ou token diferente de {selectedCurrencyID.toUpperCase()} para este endereço resultará na perda definitiva
							dos seus recursos.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
