import React, { useEffect } from 'react'
import useGetCache from '../hooks/useGetCache'

const TestGetCache:React.FC = () => {
	const { updateImageCache, arweaveIdCache, imageCache } = useGetCache()
	const txid = 'XVmKczg5snUI5zcp3xzN6T3XFQyyccmL9RlV7w8p_QY'
	
	useEffect(() => {

		updateImageCache(txid!,'fake description',[])

	}, [])



	const Timestamp: React.FC = () => {
		let ts = imageCache[txid].timestamp 
		return (ts !== undefined) ? 
				<p>
					ts:{ts}<br/>
					datestring: {(new Date(ts*1000)).toLocaleString()}
				</p>
			: <h2>no timestamp yet</h2>
	}

	return (
		<>
			{ (imageCache[txid!] !== undefined) ? (
			<div>
				<img src={imageCache[txid!].imgSrc} alt='image here'/>
				<p>description:{imageCache[txid!].description}</p>
				
				<Timestamp/>
			</div>
			): <h1>Loading..</h1>}
		</>
	)
}

export default TestGetCache
