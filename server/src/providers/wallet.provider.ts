import { Injectable } from '@nestjs/common'
const wallet = require('../secrets/arweave-keyfile.json')
import log from '../utils/logger'

@Injectable()
export class WalletProvider {
	get wallet() {
		return wallet
	}
}
