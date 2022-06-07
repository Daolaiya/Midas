const {BadRequestError} = require("../expressError");

function sqlForPartialUpdate(dataToUpdate) {
	// {firstName: 'Aliya', age: 32} => {query: '"firstName"=$1, "age"=$2', values: [ 'Aliya', 32 ]}
	const keys = Object.keys(dataToUpdate);

	if (keys.length === 0) throw new BadRequestError("No data");

	const cols = keys.map((colName, idx) => `"${colName}"=$${idx + 1}`);

	return {
		query: cols.join(", "),
		values: Object.values(dataToUpdate)
	};
}

module.exports = {sqlForPartialUpdate};
