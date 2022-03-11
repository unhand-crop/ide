export interface Response<T> {
	success: boolean;
	data: T;
	statusCode: number;
	message: string;
}