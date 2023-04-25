const accessToken = {
	token: '',
	setToken(newToken) {
		this.token = newToken;
	},
	getToken() {
		return this.token;
	},
};

export { accessToken };
