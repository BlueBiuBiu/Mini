import request from "./request.js"

const getComment = (data) => {
	return request({
		name: "getComment",
		data
	})
}

export { getComment }