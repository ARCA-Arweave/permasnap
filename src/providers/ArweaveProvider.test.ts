import * as arwewaveProvider from './ArweaveProvider'

// const isInstanceofJwkInterface = (obj: object):boolean => {
// 	['kty', 'n', 'e', 'd', 'p', 'q', 'dp', 'dq', 'qi'].forEach(keyname => {
// 		if( obj.hasOwnProperty(keyname) === false){
// 			return false
// 		}
// 	})
// 	return true
// }

const goodJwkMock = {
	"kty": "RSA",
	"e": "AQAB",
	"n": "1234567890qwertyuiuop",
	"d": "1234567890qwertyuiuop",
	"p": "1234567890qwertyuiuop",
	"q": "1234567890qwertyuiuop",
	"dp": "1234567890qwertyuiuop",
	"dq": "1234567890qwertyuiuop",
	"qi": "1234567890qwertyuiuop"
}
const badJwkMock = {
	"kty": "RSA",
	"e": "AQAB",
	"n": "1234567890qwertyuiuop",
	"blah": " blah data"
}

describe('isInstanceofJwk', ()=> {
	it('is detecting valid jwk', () => {
		// expect.assertions(1)
		// await 
		expect(arwewaveProvider.isInstanceofJwkInterface(goodJwkMock)).toBe(true)
	})
	it('is detecting invalid jwk', () => {
		// expect.assertions(1)
		// await 
		expect(arwewaveProvider.isInstanceofJwkInterface(badJwkMock)).toBe(false)
	})
})