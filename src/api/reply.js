import request from "./request.js"

const reply = (data) => {
	return request({
		name: "reply",
		data
	})
}

export { reply }