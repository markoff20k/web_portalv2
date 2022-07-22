import * as React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { ReactTable } from '../../components/ReactTable';
import { getTabName, localeDate } from '../../helpers';
import { selectChildCurrencies, selectCurrencies, selectDepositHistory } from '../../modules';

interface DepositHistoryProps {
	currency_id: string;
}
export const DepositHistory: React.FC<DepositHistoryProps> = (props: DepositHistoryProps) => {
	const intl = useIntl();

	// props
	const { currency_id } = props;

	// selector
	const list = useSelector(selectDepositHistory);
	const currencies = useSelector(selectCurrencies);
	const childCurrencies = useSelector(selectChildCurrencies);
	const childCurrenciesIds = childCurrencies.map(child => child.id);

	const formatTxState = (tx: string, confirmations?: number, minConfirmations?: number) => {
		const process = require('../../assets/status/wait.svg');
		const fail = require('../../assets/status/fail.svg');
		const success = require('../../assets/status/success.svg');
		const statusMapping = {
			succeed: <img src={success} alt="" />,
			failed: <img src={fail} alt="" />,
			accepted: <img src={process} alt="" />,
			collected: <img src={success} alt="" />,
			canceled: <img src={fail} alt="" />,
			rejected: <img src={fail} alt="" />,
			processing: <img src={process} alt="" />,
			prepared: <img src={process} alt="" />,
			fee_processing: <img src={process} alt="" />,
			skipped: <img src={success} alt="" />,
			submitted:
				confirmations !== undefined && minConfirmations !== undefined ? (
					`${confirmations}/${minConfirmations}`
				) : (
					<img src={process} alt="" />
				),
		};

		return statusMapping[tx];
	};

	const columns = React.useMemo(() => {
		return [
			{
				Header: intl.formatMessage({ id: `page.body.history.deposit.header.date` }),
				accessor: 'date',
			},
			{
				Header: intl.formatMessage({ id: `page.body.history.deposit.header.type` }),
				accessor: 'type',
			},
			{
				Header: intl.formatMessage({ id: `page.body.history.deposit.header.txid` }),
				accessor: 'txid',
			},
			{
				Header: intl.formatMessage({ id: `page.body.history.deposit.header.status` }),
				accessor: 'state',
			},
			{
				Header: intl.formatMessage({ id: `page.body.history.deposit.header.amount` }),
				accessor: 'amount',
			},
		];
	}, [intl]);

	const parentHistoryList = list
		.filter((history: any) => history.currency === currency_id.toLowerCase())
		.map((history: any) => {
			const currencyIndex = currencies.findIndex(currency => currency.id === history.currency);
			const blockchain = getTabName(currencies[currencyIndex].blockchain_key || '');

			return {
				...history,
				type: blockchain,
			};
		});

	const childHistoryList = list
		.filter((history: any) => childCurrenciesIds.includes(history.currency))
		.map((history: any) => {
			const currencyIndex = childCurrenciesIds.findIndex(childCurrencyID => childCurrencyID === history.currency);
			const blockchain = getTabName(childCurrencies[currencyIndex].blockchain_key);

			return {
				...history,
				type: blockchain,
			};
		});
	const newList = [...parentHistoryList, ...childHistoryList];

	const data = newList
		.sort((a, b) => {
			return new Date(a.created_at) > new Date(b.created_at) ? -1 : 1;
		})
		.map((history: any) => {
			const currency = currencies.find(cur => cur.id === history.currency);
			const blockchainAddress = currency ? currency.explorer_transaction : '';
			const blockchainTxidAddress = blockchainAddress ? blockchainAddress.replace('#{txid}', history.txid) : '';

			return {
				...history,
				date: localeDate(history.created_at, 'fullDate'),
				status: 'success',
				amount: history.amount,
				txid: (
					<a rel="noopener noreferrer" target="_blank" href={blockchainTxidAddress}>
						{history.txid}
					</a>
				),
				state: formatTxState(history.state),
			};
		});

	return (
		<div style={{ marginTop: '10px' }}>
			<h2>{intl.formatMessage({ id: `page.body.history.deposit` })}</h2>
			<ReactTable columns={columns} data={data} headColor="#182034" />
		</div>
	);
};
