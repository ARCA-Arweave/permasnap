// import { Media } from 'capacitor-media';
// import { isPlatform } from '@ionic/react';
// const media = new Media();



// export const assertPermasnapAlbum = async () => {

// 	//empty folders do not get added to Albums list on android :-| , ios untested
// 	const getPSnapAlbum = async () => {
// 		let res = await media.getAlbums() // -> { albums: [{name:'My Album', identifier:'A1-B2-C3-D4'}, {name:'My Another Album', identifier:'E5-F6-G7-H8'}]}
// 		for (const album of res.albums) {
// 			if(album.name === 'Permasnap'){
// 				return album
// 			}
// 		}
// 	}

// 	let psnapAlbum = await getPSnapAlbum()
// 	if(psnapAlbum !== undefined){
// 		return psnapAlbum
// 	}else{
// 		let name = 'Pictures/Permasnap'
// 		media.createAlbum({name})
// 			.then(()=>console.log('Created album '+name))
// 			.catch(()=>console.log('ERROR! failed to create album '+name))
// 		return await getPSnapAlbum() //this returns undefined on Android as folder/album is empty and/or takes some time to appear in media library
// 	}
// }

// // export interface MediaSaveOptions {
// //   path: string;
// //   album?: string;
// // }
// export const savePhoto = async (path:string) => {
// 	let album = await assertPermasnapAlbum()
// 	if(album !== undefined){
// 		media.savePhoto({path: path, album: isPlatform('ios') ? album.identifier : album.name  })
// 	} else {
// 		media.savePhoto({path:path, album:'Permasnap'})
// 			.then(console.log)
// 			.catch(console.log)
// 	}
// }
import { Plugins } from '@capacitor/core'
const { Filesystem } = Plugins

export const checkFileExists = async (uri: string): Promise<boolean> => {
	try{
		const res =  await Filesystem.stat({
			path: uri,
		})
		console.log(`File ${uri} found`)
		// console.log(res)
		return true
	
	}	catch(err){
		console.log(`File ${uri} not found`)
		// console.log(err)
		return false
	}
}