import {
	commsionHistoryReducer,
	referralRanksReducer,
	estimatedCommisionReducer,
	commisionInfoReducer,
} from './plugins/referral/reducer';
import { combineReducers } from 'redux';
import { airdropReducer } from './airdrops/airdrop';
import { claimReducer } from './airdrops/claim';
import { ethFeeReducer } from './eth-withdraw/fee';
import { lunarReducer } from './events/lunar';
import { announcementReducer } from './info/announcement';
import { eventReducer } from './info/events';
import { airdropCoinClaimReducer, airdropCoinListReducer } from './plugins/airdropCoin';
import {
	BuyersHistoryReducer,
	BuyHistoryReducer,
	buyIEOReducer,
	IEODetailReducer,
	IEOItemReducer,
	IEOListReducer,
	totalIEOBuyersReducer,
} from './plugins/ieo';
import { IEOCautionReducer } from './plugins/ieo/caution';
import { friendsListReducer } from './plugins/referral';
import {
	createStakeReducer,
	stakeHistoryReducer,
	stakeWalletReducer,
	stakingListReducer,
	unStakeHistoryReducer,
	unStakeReducer,
} from './plugins/staking';
import { voteDonateReducer, voteHistoryReducer, voteListReducer } from './plugins/vote';
import { alertReducer } from './public/alert';
import { blocklistAccessReducer } from './public/blocklistAccess';
import { configsReducer } from './public/configs';
import { currenciesReducer } from './public/currencies';
import { customizationReducer } from './public/customization';
import { changeColorThemeReducer } from './public/globalSettings';
import { gridLayoutReducer } from './public/gridLayout/reducer';
import { changeLanguageReducer } from './public/i18n';
import { klineReducer } from './public/kline';
import { marketsReducer } from './public/markets';
import { memberLevelsReducer } from './public/memberLevels';
import { depthReducer, incrementDepthReducer, orderBookReducer } from './public/orderBook';
import { rangerReducer } from './public/ranger/reducer';
import { recentTradesReducer } from './public/recentTrades';
import { buyReducer, totalBuyersReducer } from './sale/buy';
import { priceReducer } from './sale/price';
import { saleItemReducer } from './sale/sale-item';
import { saleListReducer } from './sale/sale-list';
import { competitionsListReducer } from './trading_competitions/competitions';
import { competitionItemReducer } from './trading_competitions/competition_item';
import { rankingsReducer } from './trading_competitions/rankings';
import { apiKeysReducer } from './user/apiKeys';
import { authReducer } from './user/auth';
import { beneficiariesReducer } from './user/beneficiaries';
import { getGeetestCaptchaReducer } from './user/captcha';
import { customizationUpdateReducer } from './user/customization';
import { sendEmailVerificationReducer } from './user/emailVerification';
import { depositHistoryReducer, historyReducer, withdrawHistoryReducer } from './user/history';
import { addressesReducer, documentsReducer, identityReducer, labelReducer, phoneReducer } from './user/kyc';
import { newHistoryReducer } from './user/newHistory';
import { openOrdersReducer } from './user/openOrders';
import { ordersReducer } from './user/orders';
import { ordersHistoryReducer } from './user/ordersHistory';
import { passwordReducer } from './user/password';
import { profileReducer } from './user/profile';
import { userActivityReducer } from './user/userActivity';
import { allChildCurrenciesReducer, childCurrenciesReducer, walletsReducer } from './user/wallets';
import { withdrawLimitReducer } from './user/withdrawLimit';
import {
	CompetitionListReducer,
	CompetitionItemReducer,
	CompetitionVolumeReducer,
	rankingCompetitionReducer,
	competitionAwardReducer,
} from './plugins/competition';
import { holderInfoReducer, holderListReducer } from './plugins/holder';
export const eventsReducer = combineReducers({
	lunar: lunarReducer,
});

export const airdropsReducer = combineReducers({
	airdrops: airdropReducer,
	claims: claimReducer,
});

export const ethFeesReducer = combineReducers({
	ethFee: ethFeeReducer,
});

export const saleReducer = combineReducers({
	saleList: saleListReducer,
	saleItem: saleItemReducer,
	buy: buyReducer,
	price: priceReducer,
	totalBuyers: totalBuyersReducer,
});
export const IEOReducer = combineReducers({
	IEOItem: IEOItemReducer,
	IEOList: IEOListReducer,
	buyIEO: buyIEOReducer,
	buyHistory: BuyHistoryReducer,
	buyersHistory: BuyersHistoryReducer,
	totalIEOBuyers: totalIEOBuyersReducer,
	ieoDetail: IEODetailReducer,
	ieoCaution: IEOCautionReducer,
});

export const competitionReducer = combineReducers({
	competitionList: CompetitionListReducer,
	competitionItem: CompetitionItemReducer,
	competitionVolume: CompetitionVolumeReducer,
	competitionRanking: rankingCompetitionReducer,
	competitionAward: competitionAwardReducer,
});
export const tradingCompetitionsReducer = combineReducers({
	competitions: competitionsListReducer,
	competition_item: competitionItemReducer,
	rankings: rankingsReducer,
});
export const infoReducer = combineReducers({
	events: eventReducer,
	announcement: announcementReducer,
});

export const publicReducer = combineReducers({
	blocklistAccess: blocklistAccessReducer,
	colorTheme: changeColorThemeReducer,
	configs: configsReducer,
	currencies: currenciesReducer,
	customization: customizationReducer,
	recentTrades: recentTradesReducer,
	markets: marketsReducer,
	orderBook: orderBookReducer,
	depth: depthReducer,
	incrementDepth: incrementDepthReducer,
	ranger: rangerReducer,
	i18n: changeLanguageReducer,
	kline: klineReducer,
	alerts: alertReducer,
	rgl: gridLayoutReducer,
	memberLevels: memberLevelsReducer,
});

export const userReducer = combineReducers({
	auth: authReducer,
	beneficiaries: beneficiariesReducer,
	customizationUpdate: customizationUpdateReducer,
	label: labelReducer,
	orders: ordersReducer,
	password: passwordReducer,
	profile: profileReducer,
	wallets: walletsReducer,
	child_currencies: childCurrenciesReducer,
	all_child_currencies: allChildCurrenciesReducer,
	addresses: addressesReducer,
	documents: documentsReducer,
	identity: identityReducer,
	phone: phoneReducer,
	history: historyReducer,
	withdrawHistory: withdrawHistoryReducer,
	depositHistory: depositHistoryReducer,
	newHistory: newHistoryReducer,
	apiKeys: apiKeysReducer,
	userActivity: userActivityReducer,
	ordersHistory: ordersHistoryReducer,
	openOrders: openOrdersReducer,
	sendEmailVerification: sendEmailVerificationReducer,
	captchaKeys: getGeetestCaptchaReducer,
	withdrawLimit: withdrawLimitReducer,
});

const voteReducer = combineReducers({
	list: voteListReducer,
	history: voteHistoryReducer,
	donate: voteDonateReducer,
});

const airdropCoinReducer = combineReducers({
	list: airdropCoinListReducer,
	claims: airdropCoinClaimReducer,
});

const referralReducer = combineReducers({
	friends: friendsListReducer,
	history: commsionHistoryReducer,
	ranks: referralRanksReducer,
	estimatedCommision: estimatedCommisionReducer,
	commisionInfo: commisionInfoReducer,
});

const holderReducer = combineReducers({
	list: holderListReducer,
	info: holderInfoReducer,
});

export const pluginsReducer = combineReducers({
	staking_list: stakingListReducer,
	stake_wallet: stakeWalletReducer,
	stake_history: stakeHistoryReducer,
	create_stake: createStakeReducer,
	unstake: unStakeReducer,
	unstake_history: unStakeHistoryReducer,
	vote: voteReducer,
	airdropCoin: airdropCoinReducer,
	referral: referralReducer,
	holder: holderReducer,
});
