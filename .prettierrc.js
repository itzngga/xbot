module.exports = {
	...require('gts/.prettierrc.json'),
	tabWidth: 2,
	useTabs: true,
	semi: true,
	printWidth: 80,
	endOfLine: 'auto',
	overrides: [
		{
		  files: [".*", "*.json"],
		  options: { "parser": "json" }
		}
	  ],
	parser: "typescript"
};
