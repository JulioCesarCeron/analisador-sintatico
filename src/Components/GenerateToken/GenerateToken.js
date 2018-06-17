const GenerateToken = () => {
	const production = {
		S: [ 'bBa', 'cC' ],
		A: [ 'cCa', 'bS', 'ε' ],
		B: [ 'cCA', 'b' ],
		C: [ 'Bd', 'a' ]
	};
	let generateToken = '';
	let charReplace = '';
	let keyObj = 'S';
	let sizeRandom;

	sizeRandom = Math.floor(Math.random() * production[keyObj].length);
	generateToken = production[keyObj][sizeRandom];
	let count = 0;

	let i;
	while (count < 800 && generateToken !== generateToken.toLowerCase) {
		count += 1;

		for (i = 0; i < generateToken.length && !isUpperCase(generateToken.charAt(i)); i++) {}
		if (generateToken.length === i) {
			break;
		}
		keyObj = generateToken.charAt(i);
		sizeRandom = Math.floor(Math.random() * production[keyObj].length);
		charReplace = production[keyObj][sizeRandom];
		if (charReplace === 'ε') {
			generateToken = generateToken.replace(keyObj, '');
		} else {
			generateToken = generateToken.replace(keyObj, charReplace);
		}
	}

	return generateToken;
};

export default GenerateToken;


const isUpperCase = (aCharacter) => {
    return aCharacter >= 'A' && aCharacter <= 'Z';
};