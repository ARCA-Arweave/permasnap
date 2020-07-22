import { ArweaveId } from "arweave-id"
import { useSelector, useDispatch } from "react-redux"
import { IStoreState, ICachedImage } from '../redux/reducers'
import { saveTimestamp, updateImage } from '../redux/actions'
import axios from "axios"
import { isPlatform } from "@ionic/react"
import { Plugins, FilesystemDirectory, FilesystemEncoding, Capacitor } from '@capacitor/core'

const placeholder = require('../assets/img/placeholder.svg')
const HOST = process.env.REACT_APP_ARWEAVE_GW_HOST

// export interface ICachedImage {
// 	txid: string
// 	fileUri: string // mobile: file:// or web data://
// 	description: string
// 	hashtags: string[]
// 	user?: ArweaveId
// 	timestamp?: number
// 	// last_accessed: number
// }

/**
 * React hook to return cached data from the store. If data is not present it will fetch 
 * and store it in an efficient manner
 */
const useGetCache = () => {
	const { Filesystem } = Plugins
	const imageCache = useSelector((state:IStoreState) => state.imageCache)
	const timestampsCache = useSelector((state:IStoreState) => state.timestampsCache)
	const arweaveIdCache = useSelector((state:IStoreState) => state.arweaveIdCache)
	const dispatch = useDispatch() 

	// const getTimestamp = async (blockHeight: number): Promise<void> => {
	// 	//prevent further network calls for same block
	// 	dispatch(saveTimestamp({blockHeight, timestamp: 0}))

	// 	//we really want to avoid this next line which downloads a whole block
	// 	let block = await axios(`https://arweave.net/block/height/${blockHeight}`)
	// 	let timestamp = block.data.timestamp

	// 	dispatch(saveTimestamp({blockHeight,timestamp}))
	// }
	/* Download the file and save to device cache */
	const getData = async (img: ICachedImage): Promise<void> => {
		let data = await axios.get(`https://${HOST}/${img.txid}`,{responseType: 'arraybuffer'})
		let contentType:string = data.headers["content-type"]
		let b64File = new Buffer(data.data,'binary').toString('base64')
		let ext = contentType.split('/')[1]
		console.log('Content-Type', contentType)
		console.log('file extension', ext)
		console.log('base64 file', b64File)

		let fileUri: string
		if(isPlatform('hybrid')){
			const res = await Filesystem.writeFile({
				data: b64File,
				path: img.txid + '.' + ext,
				directory: FilesystemDirectory.Cache,
			})
			fileUri = Capacitor.convertFileSrc(res.uri) // file: -> http://localhost/
		}else{
			fileUri = `data:${contentType};base64,${b64File}`
		}
		img.fileUri = fileUri
		dispatch(updateImage({
			...img,
			fileUri
		}))

		console.log(img)

	}

	/* The idea here is to create many async calls to dispatch to update data */
	const getImage = (
			txid: string,
			description: string,
			hashtags: string[],
			user?: ArweaveId,
	) => {
		
		/* If it's already cached, return */
		//!! THIS SHOULD BE IN THE CALLING COMPONENT ??
		if(imageCache[txid] !== undefined){
			return //imageCache[txid]
		}

		/* Else fetch image details */

		// create a placeholder for initial dispatch ("return")
		let image: ICachedImage = {
			txid,
			fileUri: placeholder,
			description,
			hashtags
		}
		//prevent further calls for same image & insert placeholder by dispatching immediately
		dispatch(updateImage(image))


		getData(image)


		// axios.get(`https://${HOST}/tx/${txid}/status`)
		// .then((status) => {

		// 	let blockHeight = status.data.block_height
		// 	console.log('block_height', blockHeight)
			
		// 	/* get timestamp */
		// 	let timestamp: number
		// 	if(timestampsCache[blockHeight]!==undefined){
		// 		timestamp = timestampsCache[blockHeight]
		// 	}else {
		// 		getTimestamp(blockHeight)
		// 	}
		// })//then get status
			


	}

	return {
		getImage,
		imageCache,
		timestampsCache,
		arweaveIdCache,
	}
}

export default useGetCache
