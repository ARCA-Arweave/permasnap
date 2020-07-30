import React, { useEffect } from 'react'
import useGetCache from '../hooks/useGetCache'
import { useDispatch } from 'react-redux'
import { changeWallet } from '../redux/actions'
import { JWKInterface } from 'arweave/web/lib/wallet'
import { IonPage, IonContent, IonItem, IonLabel, isPlatform, IonButton } from '@ionic/react'
import Header from '../components/Header'
import { useWallet } from '../hooks/useWallet'
import { Plugins, FilesystemDirectory } from '@capacitor/core'
const { Filesystem } = Plugins

const TestOnly:React.FC = () => {
	// const { updateImageCache, arweaveIdCache, imageCache } = useGetCache()
	// const txid = 'XVmKczg5snUI5zcp3xzN6T3XFQyyccmL9RlV7w8p_QY'
	
	// useEffect(() => {

	// 	updateImageCache(txid!,'fake description',[])

	// }, [])



	// const Timestamp: React.FC = () => {
	// 	let ts = imageCache[txid].timestamp 
	// 	return (ts !== undefined) ? 
	// 			<p>
	// 				ts:{ts}<br/>
	// 				datestring: {(new Date(ts*1000)).toLocaleString()}
	// 			</p>
	// 		: <h2>no timestamp yet</h2>
	// }

	// return (
	// 	<>
	// 		{ (imageCache[txid!] !== undefined) ? (
	// 		<div>
	// 			<img src={imageCache[txid!].imgSrc} alt='image here'/>
	// 			<p>description:{imageCache[txid!].description}</p>
				
	// 			<Timestamp/>
	// 		</div>
	// 		): <h1>Loading..</h1>}
	// 	</>
	// )

	const { arAddress, arWallet } = useWallet()
	const dispatch = useDispatch()

	const loadWallet = async (ev: React.ChangeEvent<HTMLInputElement>) => {
		let file = ev.target.files![0]
		let jwk: JWKInterface
		let fr = new FileReader()
		fr.readAsText( file )
		fr.onload = async (ev) => {
			try {
				jwk = JSON.parse( (fr.result as string) )
				dispatch(changeWallet(jwk))
			} catch (err) { alert('Error loading wallet: ' + err) }
		}
	}
	const saveWallet = async () => {
		let res = await Filesystem.writeFile({
			data: btoa(JSON.stringify(fixedWallet())),
			path: arAddress+'.json',
			directory: FilesystemDirectory.ExternalStorage,
		})
		alert('saved '+ res.uri)
	}
	const fixedWallet = () => {
		let wallet:any = arWallet
		delete wallet["_persist"]
		return wallet as JWKInterface
	}
  return (
    <IonPage>
      <IonContent>
        <IonItem>
          <IonLabel>Wallet Address</IonLabel>
          {arAddress ? arAddress : 'Wallet not loaded'}
        </IonItem>
        <IonItem>
					<IonLabel>LOAD Wallet :</IonLabel>
          <input type='file' onChange={loadWallet}/>
        </IonItem>
				<IonItem>
					<IonLabel>SAVE Wallet : </IonLabel>
					{ isPlatform('hybrid') 
						? <IonButton onClick={saveWallet} >Save to Filesystem</IonButton>
						: <a 
								href={'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fixedWallet()))} 
								download={arAddress+'.json'} 
								target='_blank' 
							>	{arAddress+'.json'} </a>
					}
				</IonItem>
      </IonContent>
    </IonPage>
  );

}

export default TestOnly
