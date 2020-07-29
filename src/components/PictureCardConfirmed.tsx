import React, { useState, useEffect } from 'react'
import { IonCol, IonCard, IonText, IonSpinner } from '@ionic/react'
import { IPsnapPhoto } from '../redux/reducers'
import Hashtag from './Hashtag'
import { getArweaveId, IArIdData } from '../providers/ArweaveProvider'
import useGetCache from '../hooks/useGetCache'
import { Link } from 'react-router-dom'
import * as CSS from 'csstype'

interface IProps {
	data:IPsnapPhoto	
}

// completed: boolean
// id?: string //txid
// url?: string //permaweb url
// dataUri?: string //full pic data here
// status?: string //debug
// exif?: any
// description?: string
// owner?: string
// hashtags: string[]



const PictureCardConfirmed = ({data}:IProps) => {
	const [arweaveId, setArweaveId] = useState<IArIdData>()
	const { updateImageCache, imageCache } = useGetCache()
	const [datetime, setDatetime] = useState<string>()

	useEffect(() => {
		/* get arweave-id (will be updated/removed later) */
		const init = async () => {
			let arid = await getArweaveId(data.owner!)
			console.log('Found arweave-id name: ' + arid.name)
			setArweaveId(arid)
		}
		if(data.owner){
			init()
		}

		/* use the new caching system */
		if(data.completed){//if it's mined
			updateImageCache(data.id!, data.description ||'', data.hashtags)
		}
	}, [data])

	useEffect(() => {
		let cached = imageCache[data.id!]
		if(cached){
			data.imgSrc = cached.imgSrc
			if(cached.timestamp)
				setDatetime((new Date(cached.timestamp*1000)).toLocaleString()) 
			//user = cached.user to be updated
		}
	}, [imageCache[data.id!]]) 

	return (
		<IonCol sizeXs="12" sizeSm="6" sizeMd="4" sizeLg="3" >
		<IonCard style={cardStyle} >
			<a href={data.imgSrc} key={data.imgSrc} target="_blank">
				<img slot="start" src={data.imgSrc ? data.imgSrc : data.dataUri} style={{marginBottom: '-5px'}} />
			</a>
			{ !data.completed && (<><IonSpinner  name="crescent" style={spinnerStyle} /></>) }
			{ arweaveId && (<>
				<Link to={`/searchtab/search?pubkey=${data.owner}`}>
					<span  style={nameStyle} >{arweaveId.name}</span>
				</Link>
			</>)}
			
			<span style={timeStyle}>{datetime}</span>

			<div style={containerStyle}>

				{ data.hashtags.length>0 && data.hashtags.map(tag=> 
					<Hashtag key={data.id+tag} term={tag} style={hashtagsStyle} />
				)}					
				<br />
				{ data.description && (<>
					<IonText style={captionStyle} >{data.description}</IonText><br /><br />
				</>)}
				
			</div>

		</IonCard>
	</IonCol>
	)
}

export default PictureCardConfirmed

//#region styles
const cardStyle: CSS.Properties = {
	margin: '0px',
	padding: '0px',
}
const spinnerStyle: CSS.Properties = {
  position: 'absolute',
  top: '20px',
  right: '20px',
  color: 'medium',
}
const nameStyle: CSS.Properties = {
  position: 'absolute',
  top: '10px',
  left: '10px',
	padding: '10px',
  backgroundColor: 'rgba(128, 128, 128, 0.5)',
	color: 'white',
	borderRadius: '10px', 
}
const timeStyle: CSS.Properties = {
  position: 'absolute',
  top: '10px',
  right: '10px',
	padding: '10px',
  backgroundColor: 'rgba(128, 128, 128, 0.5)',
	color: 'white',
	borderRadius: '10px', 
}

const containerStyle: CSS.Properties = {
	position: 'absolute',
	width: '100%',
	bottom: '0px',
	left: '0px',
	padding: '0px',
	margin: '0px',
}
const hashtagsStyle: CSS.Properties = {
	position: 'relative',
	top: '-15px',
	padding: '10px',
	margin: '2px',
	backgroundColor: 'rgba(128, 128, 128, 0.5)',
	color: 'white',
	borderRadius: '10px', 
}
const captionStyle: CSS.Properties = {
	position: 'absolute',
	bottom: '0px',
	padding: '10px',
	width: '100%',	
	marginBottom: '0px',
	backgroundColor: 'rgba(128, 128, 128, 0.5)',
	color: 'white',
}
//#endregion
