import { Response } from './dtos';
import request from '@/utils/request';

export interface GetSymbolsOutput {
	id: number,
	securityType: number,
	securityTypeName: string,
	name: string,
	enName: string,
	enFullName: string,
	symbol: string,
	imagePath: string,
	orderInde: number,
	enabled: boolean,
	remark: string,
	isOptional: boolean
};


export const getDefaultList = async():Promise<Response<GetSymbolsOutput[]>> => {
	return request.get('/eapi/v1/symbol/getoptional',{})
}

export interface getPageInput {
	pageIndex: number,
	pageSize: number,
	order: [],
	securityType: number,
	name: string,
	symbol: string,
}

export interface GetSymbolsOutputPagedList {
	pageIndex: number;
	pageSize: number;
	totalCount:number;
	totalPages:number
	indexFrom:number;
	items:GetSymbolsOutput[],
	hasPreviousPage:boolean
	hasNextPage:boolean
}

export const getPage = async(data: getPageInput): Promise<Response<GetSymbolsOutputPagedList>> => {
	return request.post('/eapi/v1/symbol/getpage',{data})
}