import { JWKInterface } from 'arweave/web/lib/wallet';
import { ArweaveId } from "arweave-id"


//export interface IWallet <- single object already defined by JWKInterface

export interface IPsnapPhoto {
  id?: string //txid
  url?: string //permaweb url
  dataUri?: string //full pic data here
  completed: boolean
  status?: string //debug
  exif?: any
  description?: string
  owner?: string
  hashtags: string[]
}

export interface ICachedImage {
	txid: string
	fileUri: string // mobile: file:// or web data://
	description: string
	hashtags: string[]
	user?: ArweaveId
  timestamp?: number
  // last_accessed: number
}
export interface CachedImagesObject {
  [txid:string]: ICachedImage
}

export interface Timestamp {
  blockHeight: number
  timestamp: number
}
export interface TimestampsCache {
  [blockHeight:number]: number
}
export interface ArweaveIdCache {
  [address: string]: ArweaveId
}

// this is the interface for use in useSelector
export interface IStoreState {
  wallet: JWKInterface | {}; // remove these nulls later
  currentPhoto: IPsnapPhoto //only 1 of these
  txList: IPsnapPhoto[]
  imageCache: CachedImagesObject //fast index
  timestampsCache: TimestampsCache //fast index
  arweaveIdCache: ArweaveIdCache //fast index
}

