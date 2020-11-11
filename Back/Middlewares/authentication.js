const jwt = require('jsonwebtoken');
const authentication = (req, res, next) => {
	let authorization = req.headers.authorization;
	if (authorization) {
		let token = authorization.split(' ')[1];
		jwt.verify(token, process.env.S, (error, decoded) => {
			if (error) {
				res.status(400).json('User could not be verified');
			}
			req.usuario = decoded;
			next();
		});
	} else {
		res.status(401).json('You must enter with your username and password to use this service');
	}
};

module.exports = authentication;