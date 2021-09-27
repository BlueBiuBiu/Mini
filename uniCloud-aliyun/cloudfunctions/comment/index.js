'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const collection = db.collection('userInfo');
	const res = await collection.add({
		avatar: event.avatar,
		nickName: event.nickName,
		content: event.content,
		imgArr: event.imgArr,
		createAt: event.createAt
	})
	
	//返回数据给客户端
	return {
		code: 200,
		result: res
	}
};
