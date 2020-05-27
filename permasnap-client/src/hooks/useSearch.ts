import { useParams, useLocation } from 'react-router';
import { useState, useEffect } from 'react'
import { IPsnapPhoto } from '../redux/reducers';
import { getAllTxsByHashtag } from '../providers/ArweaveProvider'

export const useSearch = ({match}:any) => {
	const [txData, setTxData] = useState<IPsnapPhoto[]>([])
	const [text, setText] = useState('no output')
	let { search } = useParams()
	let query = new URLSearchParams(useLocation().search)

	useEffect(() => {
		const getter = async () => {
			if(search){
				let tag = query.get('hashtag')
				if(tag){
					console.log('hashtag query:- ' + tag )
					setText('#'+ tag)
					let data = await getAllTxsByHashtag(tag)
					setTxData(data)
				}
				if(query.get('pubkey')){
					console.log('pubkey query:- ' + query.get('pubkey'))
				}
			}else{ //!search
				console.log('no search - default query')
			}
						
		}
		getter()
	}, [match]) //query is causing infinite loop



	return {
		txData,
		text,
	}
}
