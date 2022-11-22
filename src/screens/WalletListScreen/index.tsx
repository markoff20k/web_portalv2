import * as React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Decimal } from '../../components';
import { ReactTable } from '../../containers';
import { EstimatedValue } from '../../containers/Wallets/EstimatedValue';
import { setDocumentTitle } from '../../helpers';
import {
	walletsFetch,
	currenciesFetch,
	allChildCurrenciesFetch,
	beneficiariesFetch,
	selectWallets,
	selectCurrencies,
	selectAllChildCurrencies,
} from '../../modules';
import NP from 'number-precision';

import './WalletListScreen.pcss'
NP.enableBoundaryChecking(false); // default param is true

export interface WalletItem {
	key: string;
	address?: string;
	currency: string;
	name: string;
	balance?: string;
	locked?: string;
	type: 'fiat' | 'coin';
	fee: number;
	active?: boolean;
	fixed: number;
	iconUrl?: string;
}

export const WalletListScreen = () => {
	setDocumentTitle('Wallets');
	const intl = useIntl();

	// state
	const [hideSmallBalanceState, setHideSmallBalanceState] = React.useState<boolean>(false);

	// intl
	const withdrawButtonLabel = React.useMemo(() => intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw' }), [intl]);
	const depositButtonLabel = React.useMemo(() => intl.formatMessage({ id: 'page.body.wallets.tabs.deposit' }), [intl]);

	// history
	const history = useHistory();

	// dispatch
	const dispatch = useDispatch();
	const dispatchFetchWallets = React.useCallback(() => dispatch(walletsFetch()), [dispatch]);
	const dispatchcFetchCurrencies = React.useCallback(() => dispatch(currenciesFetch()), [dispatch]);
	const dispatchcFetchAllChildCurrencies = React.useCallback(() => dispatch(allChildCurrenciesFetch()), [dispatch]);
	const dispatchFetchBeneficiaries = React.useCallback(() => dispatch(beneficiariesFetch()), [dispatch]);

	// side effect
	React.useEffect(() => {
		dispatchFetchWallets();
		dispatchcFetchCurrencies();
		dispatchcFetchAllChildCurrencies();
		dispatchFetchBeneficiaries();
	}, [dispatchFetchBeneficiaries, dispatchFetchWallets, dispatchcFetchCurrencies, dispatchcFetchAllChildCurrencies]);

	// selector
	const wallets = useSelector(selectWallets);
	const currencies = useSelector(selectCurrencies);
	const all_child_currencies = useSelector(selectAllChildCurrencies);

	// function
	const findIcon = (code: string): string => {
		const currency = currencies.find((currency: any) => currency.id === code);
		try {
			return require(`../../../node_modules/cryptocurrency-icons/128/color/${code.toLowerCase()}.png`);
		} catch (err) {
			if (currency !== undefined && currency.icon_url) {
				return currency.icon_url;
			}
			return require('../../../node_modules/cryptocurrency-icons/svg/color/generic.svg');
		}
	};

	const columns = React.useMemo(
		() => [
			{ Header: 'Ativo', accessor: 'coin' },
			{ Header: 'Total', accessor: 'total' },
			{ Header: 'Disponível', accessor: 'available' },
			{ Header: 'Em uso', accessor: 'in_order' },
			{ Header: 'Transferir', accessor: 'action' },
		],
		[],
	);

	const [searchInputState, setSearchInputState] = React.useState('');

	const data = wallets
		.filter(wallet => !all_child_currencies.map(cur => cur.id).includes(wallet.currency))
		.map(wallet => {
			const childCurrencies = all_child_currencies
				.filter(childCurrency => childCurrency.parent_id === wallet.currency)
				.map(childCurrency => childCurrency.id);

			const totalChildBalances = wallets
				.filter(wal => childCurrencies.includes(wal.currency))
				.map(child => Number(child.balance))
				.reduce((x, y) => x + y, 0);

			const totalChildLocked = wallets
				.filter(wal => childCurrencies.includes(wal.currency))
				.map(child => Number(child.locked))
				.reduce((x, y) => x + y, 0);

			return {
				...wallet,
				total: Number(wallet.balance) + Number(wallet.locked) + totalChildBalances + totalChildLocked,
				balance: Number(wallet.balance) + totalChildBalances,
				locked: Number(wallet.locked) + totalChildLocked,
			};
		})
		.filter(wallet => wallet.currency.toLowerCase().includes(searchInputState.toLowerCase()))
		.filter(wallet => (hideSmallBalanceState ? wallet.total > 0 : true))
		.sort((prev_wallet, next_wallet) => {
			//sort desc
			return next_wallet.total - prev_wallet.total;
		})
		.map((wallet, index) => {
			const total = NP.plus(wallet.balance || 0, wallet.locked || 0);
			const currency_icon = (
				<img
					width="36px"
					height="36px"
					src={wallet.iconUrl ? wallet.iconUrl : findIcon(wallet.currency)}
					alt={wallet.currency + '_icon'}
				style={{verticalAlign: 'center'}}/>
			);
			const isWithdrawEnabled = wallet.type === 'fiat' || wallet.balance;
			const { fixed } = wallets.find(w => w.currency === wallet.currency) || { fixed: 8 };

			return {
				coin: (
					<span className="text-left">
						{'   '}
						{currency_icon} {wallet.currency.toUpperCase()} <span className="text-secondary">{wallet.name}</span>
					</span>
				),
				total: (
					<Decimal key={index} fixed={fixed}>
						{total > 0 ? total : 0}
					</Decimal>
				),
				available: (
					<span>
						<Decimal key={index} fixed={fixed}>
							{wallet.balance > 0 ? wallet.balance : 0}
						</Decimal>
					</span>
				),
				in_order: (
					<span className="text-secondary">
						<Decimal key={index} fixed={fixed}>
							{wallet.locked > 0 ? wallet.locked : 0}
						</Decimal>
					</span>
				),
				action: (
					<div className="text-center">
						<button
							className="deposit-button"
							onClick={() =>
								history.push({ pathname: '/wallets/deposit/' + String(wallet.currency).toUpperCase() })
							}
						>
							{depositButtonLabel}
						</button>
						<button
							className="withdraw-button"
							disabled={!isWithdrawEnabled}
							onClick={() =>
								history.push({ pathname: '/wallets/withdraw/' + String(wallet.currency).toUpperCase() })
							}
						>
							{withdrawButtonLabel}
						</button>
					</div>
				),
			};
		});

	const renderTable = () => {
		return <ReactTable columns={columns} data={[...data]} headColor="#555555" />;
	};

	const onChange = e => {
		setSearchInputState(String(e.target.value).toUpperCase());
	};

	return (
		<div id="wallet-list-screen">
			<div
				className="container-fluid"
				style={{
					backgroundColor: 'transparent',
					verticalAlign: 'center',
					minHeight: '100vh',
					
				
				}}
			>{
				<div className="row">
					<div className="col-12">
						<p style={{fontSize: '19px', color: '#f5f5f5', fontWeight: 600, paddingBottom: '40px', paddingTop: '40px', }}>Minhas Carteiras </p>
					</div>
				</div>

			}
				<div className="row mt-3">
					<div className="col-12 d-flex justify-content-between align-items-center flex-row">
						<input
							className="search-input"
							autoFocus
							type="text"
							value={searchInputState}
							placeholder="Localizar ativo ..."
							onChange={e => onChange(e)}
						/>
						<div className="checkbox-input">
							<span className="mr-2 text-white">
								{intl.formatMessage({ id: 'page.body.plugins.wallet.list.button.hideSmallBalance' })}
							</span>
							<label className="checkbox bounce">
								<input
									type="checkbox"
									checked={hideSmallBalanceState}
									onChange={e => setHideSmallBalanceState(e.target.checked)}
								/>
								<svg viewBox="0 0 21 21">
									<polyline points="5 10.75 8.5 14.25 16 6"></polyline>
								</svg>
							</label>
						</div>
					</div>
				</div>
				<div className="row mt-6">
					<div className="col-16">{renderTable()}</div>
				</div>
			</div>
		</div>
	);
};
