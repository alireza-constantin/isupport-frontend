const accessToken = {
	token: '',
	setToken(newToken) {
		localStorage.setItem('jwt-access', newToken)
	},
	getToken() {
		return localStorage.getItem('jwt-access')
	},
};

export { accessToken };
