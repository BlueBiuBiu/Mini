const requireApi = require.context('.',false,/.js$/)

let module = {}
requireApi.keys().forEach((item,index) => {
	if (item === "./request.js" || item === "./index.js") return
	Object.assign(module, requireApi(item))
})

export default module