import axios, { AxiosError, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
	switchURL,
	authzURL,
	ieoURL,
	infoURL,
	newKycURL,
	statisticUrl,
	transactionURL,
	withCredentials,


} from './config';

export type HTTPMethod = 'get' | 'post' | 'delete' | 'put' | 'patch';

export interface JsonBody {
	// tslint:disable-next-line no-any
	[key: string]: any;
}

export interface RequestOptions {
	apiVersion: 'switch'	| 'core'	| 'authz'	| 'ieo' |	'info'  | 'newKyc' | 'statistic';
	withHeaders?: boolean;
	headers?: Object;
}

export interface Request {
	method: HTTPMethod;
	url: string;
	body?: JsonBody;
}

export interface ApiVariety {
	authz: string;
	switch: string;
	sunshine: string;
	core: string;
}

const getAPI = () => ({
	authz: authzURL(),
	switch: switchURL(),
	core: transactionURL(),
	ieo: ieoURL(),
	info: infoURL(),
	newKyc: newKycURL(),
	statistic: statisticUrl(),
});

const buildRequest = (request: Request, configData: RequestOptions) => {
	const { body, method, url } = request;
	const { apiVersion, headers } = configData;
	const api = getAPI();

	const contentType = body instanceof FormData ? 'multipart/form-data' : 'application/json';

	const defaultHeaders = {
		'content-type': contentType,
		'Access-Control-Allow-Origin': '*',
	};

	const apiUrl = api[apiVersion];

	const requestConfig: AxiosRequestConfig = {
		baseURL: apiUrl,
		data: body,
		headers: { defaultHeaders },
		method,
		url,
		withCredentials: withCredentials(),	};

	return requestConfig;
};

export const defaultResponse: Partial<AxiosError['response']> = {
	status: 500,
	data: {
		error: 'Bloqueado por segurança. Entre em contato com o suporte Fortem.',
	},
};

export const formatError = (responseError: AxiosError) => {
	const response = responseError.response || defaultResponse;
	const errors = (response.data && (response.data.errors || [response.data.error])) || [];

	return {
		code: response.status,
		message: errors,
	};
};

export const makeRequest = async (request: Request, configData: RequestOptions) => {
	const requestConfig = buildRequest(request, configData);

	return new Promise((resolve, reject) => {
		const axiosRequest: AxiosPromise = axios(requestConfig);
		axiosRequest
			.then((response: AxiosResponse) => {
				if (configData.withHeaders) {
					resolve(response);
				} else {
					resolve(response.data);
				}
			})
			.catch((error: AxiosError) => {
				reject(formatError(error));
			});
	});
};
