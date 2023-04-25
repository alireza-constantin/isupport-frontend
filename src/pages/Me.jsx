import { accessToken } from '../config/accessToken';

export function Me() {
	const token = accessToken.getToken();

	return <div>{token ? token : 'sorry no token'}</div>;
}
