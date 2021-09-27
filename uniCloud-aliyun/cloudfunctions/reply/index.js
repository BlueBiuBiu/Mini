'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	console.log(event);
	//event为客户端上传的参数
	const collection = db.collection('reply');
	const res = await collection.add({
		article: event.article,
		userName: event.userName,
		replyContent: event.replyContent
	})
	
	//返回数据给客户端
	return {
		code: 200,
		result: res
	}
};
