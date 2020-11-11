const authorization = (req, res, next) => {
	const { role } = req.usuario;
	if (role !== 'admin') {
		res.status(401).json('insufficient permissions');
	} else {
		next();
	}
};
module.exports = authorization;
