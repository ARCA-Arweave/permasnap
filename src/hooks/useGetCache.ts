import { ArweaveId } from "arweave-id"
import { useSelector, useDispatch } from "react-redux"
import { IStoreState, ICachedImage } from '../redux/reducers'
import { saveTimestamp, createImage, updateImageTime, updateImageURI } from '../redux/actions'
import axios from "axios"
import { isPlatform } from "@ionic/react"
import { Plugins, FilesystemDirectory, Capacitor } from '@capacitor/core'
import { checkFileExists } from "../providers/FilesystemProvider"

const placeholder = require('../assets/img/placeholder.svg')
const HOST = process.env.REACT_APP_ARWEAVE_GW_HOST


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

	const getBlockTime = async (blockHeight: number): Promise<number> => {
		//prevent further network calls for same block
		dispatch(saveTimestamp(blockHeight, 0))

		//we really want to avoid this next line which downloads a whole block
		let block = await axios(`https://${HOST}/block/height/${blockHeight}`)
		let timestamp = block.data.timestamp
		console.log(`block:${blockHeight}, timestamp:${timestamp}`)

		dispatch(saveTimestamp(blockHeight, timestamp))
		return timestamp
	}

	/* Download the file and save to device cache */
	const getImageFile = async (txid: string): Promise<void> => {
		// insert a placeholder while waiting for download 
		dispatch(updateImageURI(txid, 'placeholder', placeholder))

		let data = await axios.get(`https://${HOST}/${txid}`, {responseType: 'arraybuffer'})
		let b64File = new Buffer(data.data,'binary').toString('base64')
		let contentType:string = data.headers["content-type"]
		let ext = contentType.split('/')[1]
		console.log('Content-Type', contentType)
		console.log('file extension', ext)

		const res = await Filesystem.writeFile({
			data: b64File,
			path: txid + '.' + ext,
			directory: FilesystemDirectory.Cache,
		})
		console.log('Cached to '+res.uri)
		let imgSrc: string
		if(isPlatform('hybrid')){
			imgSrc = Capacitor.convertFileSrc(res.uri) // file: -> http://localhost/
		}else{
			imgSrc = `data:${contentType};base64,${b64File}` //web, for development only
		}

		dispatch(updateImageURI(txid, res.uri, imgSrc))
		console.log('updated image', txid)
	}

	/**
	 * The idea here is to create several async calls to dispatch updates to the image's 
	 * data. We want to return ASAP and give feedback. Minimizing & caching expensive 
	 * network transfers wherever possible.
	 */
	const updateImageCache = async (
			txid: string,
			description: string,
			hashtags: string[],
			user?: ArweaveId,
	) => {

		// create a placeholder for initial dispatch
		let image: ICachedImage = {
			txid,
			imgSrc: placeholder,
			uri: 'placeholder',
			description,
			hashtags,
		}

		/* If it's already cached, return. Check file was not purged also */

		if(imageCache[txid] !== undefined){
			if(await checkFileExists(imageCache[txid].uri)){
				return //nothing to do
			}
			getImageFile(txid) //this re-downloads the file
			return 
		}

		/* Else fetch image details */

		//prevent further calls for same image & insert placeholder by dispatching immediately
		dispatch(createImage(image))

		getImageFile(txid) // download and insert the image

		// get timestamp 
		axios.get(`https://${HOST}/tx/${txid}/status`)
		.then((status) => {
			let blockHeight = status.data.block_height
			console.log('block_height', blockHeight)

			let ts = timestampsCache[blockHeight]
			if(ts!==undefined){
				dispatch(updateImageTime(txid, timestampsCache[blockHeight]))
			}else if(ts !== 0) {
				getBlockTime(blockHeight).then(timeStamp=>{
					dispatch(updateImageTime(txid,timeStamp))
				})
			}
		})//get timestamp

		// get user 
		


	}

	return {
		updateImageCache,
		imageCache,
		arweaveIdCache,
	}
}

export default useGetCache
