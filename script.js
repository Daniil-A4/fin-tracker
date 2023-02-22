const { createServer } = require('http')
const { readFileSync } = require('fs')

const server = createServer()

server.listen(2007)

server.addListener('request', handleRequest)

function handleRequest(request, response) {
	try {
		const file = readFileSync(request.url.slice(1) || 'index.html')
		response.end(file)
	} catch (error) {
		response.end('file not found')
	}

}