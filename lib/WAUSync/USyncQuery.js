const { getBinaryNodeChild } = require('../WABinary/index.js');
const { USyncBotProfileProtocol } = require('./Protocols/USyncBotProfileProtocol.js');
const { USyncLIDProtocol } = require('./Protocols/USyncLIDProtocol.js');
const { USyncBusinessProtocol } = require('./Protocols/USyncBusinessProtocol.js');
const { USyncPictureProtocol } = require('./Protocols/USyncPictureProtocol.js');
const { USyncTextStatusProtocol } = require('./Protocols/USyncTextStatusProtocol.js');
const { USyncSidelistProtocol } = require('./Protocols/USyncSidelistProtocol.js');
const { USyncFeatureProtocol } = require('./Protocols/USyncFeatureProtocol.js');
const { USyncContactProtocol, USyncDeviceProtocol, USyncDisappearingModeProtocol, USyncStatusProtocol, USyncUsernameProtocol } = require('./Protocols/index.js');

class USyncQuery {
	constructor() {
		this.protocols = []
		this.users = []
		this.context = 'interactive'
		this.mode = 'query'
	}

	withMode(mode) {
		this.mode = mode
		return this
	}

	withContext(context) {
		this.context = context
		return this
	}

	withUser(user) {
		this.users.push(user)
		return this
	}

	parseUSyncQueryResult(result) {
		if (result?.attrs.type !== 'result') {
			return
		}
		const protocolMap = Object.fromEntries(
			this.protocols.map(protocol => [protocol.name, protocol.parser])
		)
		const queryResult = {
			list: [],
			sideList: []
		}
		const usyncNode = getBinaryNodeChild(result, 'usync')

		const parseUserNodes = nodes => {
			return nodes.reduce((acc, node) => {
				const id = node?.attrs.jid
				if (id) {
					const data = Array.isArray(node?.content)
						? Object.fromEntries(
							node.content.map(content => {
								const protocol = content.tag
								const parser = protocolMap[protocol]
								if (!parser) {
									return [protocol, null]
								}
								try {
									return [protocol, parser(content)]
								} catch (err) {
									return [protocol, null]
								}
							})
						)
						: {}
					acc.push({ ...data, id })
				}
				return acc
			}, [])
		}

		const listNode = usyncNode ? getBinaryNodeChild(usyncNode, 'list') : undefined
		if (listNode?.content && Array.isArray(listNode.content)) {
			queryResult.list = parseUserNodes(listNode.content)
		}

		const sideListNode = usyncNode ? getBinaryNodeChild(usyncNode, 'side_list') : undefined
		if (sideListNode?.content && Array.isArray(sideListNode.content)) {
			queryResult.sideList = parseUserNodes(sideListNode.content)
		}

		return queryResult
	}

	withDeviceProtocol() {
		this.protocols.push(new USyncDeviceProtocol())
		return this
	}

	withContactProtocol() {
		this.protocols.push(new USyncContactProtocol())
		return this
	}

	withStatusProtocol() {
		this.protocols.push(new USyncStatusProtocol())
		return this
	}

	withDisappearingModeProtocol() {
		this.protocols.push(new USyncDisappearingModeProtocol())
		return this
	}

	withBotProfileProtocol() {
		this.protocols.push(new USyncBotProfileProtocol())
		return this
	}

	withLIDProtocol() {
		this.protocols.push(new USyncLIDProtocol())
		return this
	}

	withUsernameProtocol() {
		this.protocols.push(new USyncUsernameProtocol())
		return this
	}

	withBusinessProtocol(profileVersion) {
		this.protocols.push(new USyncBusinessProtocol(profileVersion))
		return this
	}

	withPictureProtocol(type) {
		this.protocols.push(new USyncPictureProtocol(type))
		return this
	}

	withTextStatusProtocol() {
		this.protocols.push(new USyncTextStatusProtocol())
		return this
	}

	withSidelistProtocol(useLidAddressing) {
		this.protocols.push(new USyncSidelistProtocol(useLidAddressing))
		return this
	}

	withFeatureProtocol(features) {
		this.protocols.push(new USyncFeatureProtocol(features))
		return this
	}
}


module.exports.USyncQuery = USyncQuery;