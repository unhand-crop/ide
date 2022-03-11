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

export const getDefaultList = async():Promise<Response<GetSymbolsOutput>> => {
	return request.get('/eapi/v1/symbol/getoptional',{})
}