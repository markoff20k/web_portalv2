// import { sliceArray } from '../../../../helpers';
import { EventActions } from './actions';
import { EVENT_DATA, EVENT_ERROR, EVENT_FETCH } from './constants';
import { EventsState } from './types';

import info1 from '../../../assets/animation/crypto-animation.gif'
//import info1 from './img/info1.png';
import info2 from '../../../assets/animation/crypto-animation2.gif'
import info3 from '../../../assets/animation/crypto-animation3.gif'
import info4 from '../../../assets/animation/crypto-animation2.gif'



export const initialEvent: EventsState = {
	payload: [
		{
			event_id: 1,
			event_name: "Nova listagem: ",
			description: "Tokens KART5 serão listados na plataforma a partir de 12/10/2022. Fique atento e não perca essa oportunidade de investimento. ",
			image_link: info1,
			ref_link: "/tokens",
			created_at: "Lorem Ipsum"
		},
	
		{
			event_id: 2,
			event_name: "Novidade: ",
			description: "Nosso marketplace de NFT está no ar. Venha conferir.",
			image_link: info2,
			ref_link: "/nft",
			created_at: "Lorem Ipsum"
		},
	
		{
			event_id: 3,
			event_name: "Novidade: ",
			description: "Fique por dentro de tudo que acontece no universo de ativos digitais. Conheça nosso blog.",
			image_link: info3,
			ref_link: "/blog",
			created_at: "Lorem Ipsum"
		},
		{
			event_id: 4,
			event_name: "Tokens:",
			description: "Aberto o ciclo 1 de venda do Token FORTEM ($FTK). Conheça os benefícios.",
			image_link: info4,
			ref_link: "/tokens",
			created_at: "Lorem Ipsum"
		}


	],
	loading: false,
};

const payload2 = [
	{
		event_id: 1,
		event_name: "Initial Offering",
		description: "Lorem Ipsum1",
		image_link: info1,
		ref_link: "Lorem Ipsum",
		created_at: "Lorem Ipsum"
	},

	{
		event_id: 2,
		event_name: "Initial Offering",
		description: "Lorem Ipsum2",
		image_link: info2,
		ref_link: "Lorem Ipsum",
		created_at: "Lorem Ipsum"
	},

	{
		event_id: 3,
		event_name: "Initial Offering",
		description: "Lorem Ipsum3",
		image_link: info3,
		ref_link: "Lorem Ipsum",
		created_at: "Lorem Ipsum"
	},
	{
		event_id: 4,
		event_name: "Initial Offering",
		description: "Lorem Ipsum4",
		image_link: info4,
		ref_link: "Lorem Ipsum",
		created_at: "Lorem Ipsum"
	}


]

export const eventReducer = (state = initialEvent, action: EventActions): EventsState => {
	switch (action.type) {
		case EVENT_FETCH:
			return {
				...state,
				loading: true,
				error: undefined,
			};
		case EVENT_DATA:
			const { payload } = action.payload;

			return {
				...state,
				payload: payload,
				loading: false,
				error: undefined,
			};
		case EVENT_ERROR:
			return {
				...state,
				loading: false,
				payload: payload2,
				error: undefined,
				//error: action.error,
			};
		default:
			return state;
	}
};
