import request from "./request.js"

const comment = (data) => {
	return request({
		name: "comment",
		data
	})
}

export { comment }