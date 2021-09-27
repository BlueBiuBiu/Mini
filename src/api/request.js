export default function request(config) {
	const {name,data} = config
	return new Promise(async (resolve, reject) => {
		const res = await uniCloud.callFunction({
			name,
			data
		});
		console.log(res);
		if (res.result.code == 200) {
			resolve(res.result.result)
		} else {
			reject(res.result)
		}
	})
}
