const tf = require('@tensorflow/tfjs-node');
const nsfw = require('nsfwjs');
const fs = require('fs-extra');

process.on('message', async (out) => {
	const res = await run(out);
	process.send(res);
	process.exit();
});

async function run(res) {
	try {
		tf.engine().startScope();
		const file = fs.readFileSync(res);
		const model = await nsfw.load('file://nsfw_model/', { type: 'graph' });
		const readImage = tf.node.decodeImage(file, 3);
		const predictions = await model.classify(readImage);
		readImage.dispose();
		tf.disposeVariables();
		tf.engine().endScope();
		return predictions;
	} catch (error) {
		console.error(error);
		process.exit();
	}
}
