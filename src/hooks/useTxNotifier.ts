import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTxsByPubKey } from '../providers/ArweaveProvider'
import { JWKInterface } from 'arweave/web/lib/wallet'
import { IStoreState, IPsnapPhoto } from '../redux/reducers'
import { deleteTxItem } from '../redux/actions'


export const useTxNotifier = (jwk: JWKInterface) => {
	const storeQueue = useSelector((state: IStoreState) => state.txList)
	const dispatch = useDispatch()
	const [txDatas, setTxDatas] = useState<IPsnapPhoto[]>([]) //this is our return
	const [minedTxs, setMinedTxs] = useState<IPsnapPhoto[]>([]) //this comes from arweave


	/** update mined list with a timer */
	let timerId: NodeJS.Timeout //ref of setInterval
	useEffect(() => {
		const getMined = async () => {
			const mined = await getAllTxsByPubKey(jwk.n)
			
			setMinedTxs(mined)
			console.log('uploadedTxs: ', mined)
			console.log('fetched data @'+ (new Date()))
		}
		getMined()
		timerId = setInterval(getMined,60000) //check every minute
		return () =>{
			clearInterval(timerId)
		}
	}, [jwk]) //once on componenet load (or wallet change)
	
	/** update hook's return if either list changes */
	useEffect(() => {
		let queue = storeQueue || [] //handle undefined queue
		let found: string[] = []

		console.log('queue before:')
		console.log(queue)

		queue.forEach(qPic => {
			minedTxs.forEach(minedTx => {
				if(qPic.id === minedTx.id){
					let id = qPic.id!
					found.push(id)
					dispatch(deleteTxItem(id))
					console.log('removed from pending queue: '+id)
				}
			})
		})
		console.log('found:', found)
		//remove found pics
		queue = queue.filter(pic => pic.id !== found.find(id => id === pic.id ))


		console.log('queue after:', queue)
		console.log('queue.concat(minedTxs):',queue.concat(minedTxs))

		console.log('setTxData triggered')
		setTxDatas(queue.concat(minedTxs))
	}, [minedTxs,storeQueue])
	
	
	return{
		txDatas,
	}
}

