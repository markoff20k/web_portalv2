export const getTabName = (blockchainKey: string) => {
	const tabNames = [
		{
			name: 'Bitcoin',
			blockchain_key: 'btc-main',
		},
		{
			name: 'Dogecoin',
			blockchain_key: 'doge-main',
		},
		{
			name: 'ERC20-T',
			blockchain_key: 'eth-testnet',
		},
		{
			name: 'TRON20-T',
			blockchain_key: 'tron-test',
		},
		{
			name: 'BEP20-T',
			blockchain_key: 'bsc-testnet',
		},
		{
			name: 'ETH',
			blockchain_key: 'eth-main',
		},
		{
			name: 'TRON',
			blockchain_key: 'trx-main',
		},
		{
			name: 'BSC',
			blockchain_key: 'bsc-main',
		},
	];
	const foundTab = tabNames.find(tabName => tabName.blockchain_key.toLowerCase() === blockchainKey.toLowerCase());

	return foundTab ? foundTab.name : 'not found';
};
