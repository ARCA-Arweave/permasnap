import React, { useEffect } from 'react'
import useGetCache from '../hooks/useGetCache'
import { useParams } from 'react-router'

const TestGetCache:React.FC = () => {
	const { getImage, arweaveIdCache, imageCache, timestampsCache } = useGetCache()
	const {txid} = useParams() //'oaz5iTyL3L9K_SvLF0WhhqgXR5zg21JXsMMQQDbVA1g'
	
	useEffect(() => {
		if(imageCache[txid!] === undefined){
			getImage(txid!,'fake description',[])
		}
	}, [imageCache[txid!]])

	return (
		<>
		{ (imageCache[txid!] !== undefined) ? (
		<div>
			<img src={imageCache[txid!].fileUri} alt='image here'/>
			<p>description:{imageCache[txid!].description}</p>
			
		</div>
		// {(imageCache[txid].timestamp !== undefined) && 
		// 	<h1>ts:{imageCache[txid].timestamp}</h1>
		// }
		): <h1>Loading..</h1>}
		</>

	)
}

export default TestGetCache
