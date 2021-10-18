'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const { page, size } = event
	const collection = await db.collection('userInfo').limit(page * size).orderBy("createAt", "desc").get();
	const res = Object.assign({},collection)
	for (let item of res.data) {
		const reply = await db.collection('reply').where({
			article: item._id
		}).get()
		item.replys = reply.data
	}

	//返回数据给客户端
	return {
		code: 200,
		result: res.data
	}
};
