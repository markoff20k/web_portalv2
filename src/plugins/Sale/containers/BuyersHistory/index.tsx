import { Table } from 'antd';
import format from 'date-fns/format';
import * as React from 'react';
import api from '../../../api';

interface BuyersHistoryProps {
	ieoID: number;
}

interface BuyersHistoryModel {
	id: number;
	uid: string;
	quantity: string;
	base_currency: string;
	total: string;
	quote_currency: string;
	created_at: string;
}

export const BuyersHistory: React.FC<BuyersHistoryProps> = (props: BuyersHistoryProps) => {
	const columns = [
		{
			title: 'FORTEM ID',
			dataIndex: 'uid',
			key: 'uid',
		},
		{
			title: 'Quantidade',
			dataIndex: 'quantity',
			key: 'quantity',
		},
		{
			title: 'Valor Total  	(R$)',
			dataIndex: 'total',
			key: 'total',
		},
		{
			title: 'Moeda Utilizada',
			dataIndex: 'quote_currency',
			key: 'quote_currency',
		},
		{
			title: 'Data da Compra',
			dataIndex: 'created_at',
			key: 'created_at',
		},
	];

	const [tableState, setTableState] = React.useState<{
		data: BuyersHistoryModel[];
		pagination: {
			current: number;
			pageSize: number;
			total: number;
		};
		loading: boolean;
	}>({
		data: [],
		pagination: {
			current: 1,
			pageSize: 10,
			total: 0,
		},
		loading: false,
	});

	const fetch = React.useCallback(
		(params: any) => {
			setTableState({ ...tableState, loading: true });
			api.get(
				`/ieo/fetch/buyers/ieo_id=${props.ieoID}&page=${params.pagination.current - 1}&size=${
					params.pagination.pageSize
				}`,
			)
				.then(response => {
					const data = [...response.data.payload] as BuyersHistoryModel[];
					const newData = data.map((buyer: BuyersHistoryModel) => {
						const newdata = {
							...buyer,
							key: buyer.id,
							base_currency: buyer.base_currency.toUpperCase(),
							quote_currency: buyer.quote_currency.toUpperCase(),
							quantity: Number(buyer.quantity).toFixed(4),
							total: Number(buyer.total).toFixed(4),
							created_at: format(new Date(buyer.created_at), 'HH:mm:ss dd/MM/yyyy'),
						};

						return newdata;
					});

					setTableState({
						loading: false,
						data: newData,
						pagination: {
							...params.pagination,
							pageSize: params.pagination.pageSize,
							total: response.data.total,
						},
					});
				})
				.catch(err => {
					//console.log(err);
				});
		},
		[props.ieoID, tableState],
	);

	const handleTableChange = (paginationParam: any) => {
		fetch({
			pagination: paginationParam,
		});
	};

	React.useEffect(() => {
		const { pagination } = tableState;
		fetch({ pagination });
	}, []);

	return (
		<React.Fragment>
			<p className="text-center">Histórico de Transações</p>
			<Table
				size="large"
				pagination={tableState.pagination}
				dataSource={tableState.data}
				loading={tableState.loading}
				columns={columns}
				onChange={handleTableChange}
			/>
		</React.Fragment>
	);
};
