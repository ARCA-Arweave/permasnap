import React from 'react';
import { IonContent, IonPage, IonGrid, IonRow, IonLabel, IonTitle } from '@ionic/react';
import * as CSS from 'csstype'
import './SearchTab.css';
import PictureCard from '../components/PictureCard';
import { useSearch } from '../hooks/useSearch';
import PictureCardConfirmed from '../components/PictureCardConfirmed';



const SearchTab: React.FC = ({match}:any) => {
	var {txData, text: queryString} = useSearch({match})


  // const [txtInput, setTxtInput] = useState('')
{/* <IonInput value={txtInput} placeholder="Enter text" onIonChange={ev => setTxtInput(ev.detail.value!)}></IonInput> */}

  return (
		<IonPage>
			<IonContent>
				<IonGrid id="screenGrid" style={screenGridStyle} >
          <IonRow><IonTitle>{queryString}</IonTitle></IonRow>
					<IonRow style={brandingRowStyle}>
						<img src={require('../assets/img/branding.png')} alt="Permasnap logo" width='100%'/>
					</IonRow>
					<IonRow>
							{ (txData.length > 0) ? txData.map(data => (
								<PictureCardConfirmed key={data.id} data={data} />
							)) : <IonLabel>No pictures found.</IonLabel>}
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
  );
};

export default SearchTab;

const screenGridStyle: CSS.Properties = {
	height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
	alignItems: 'center',
	overflow: 'scroll',
	scrollbarWidth: 'none', //Firefox: invisible scrollbars
	WebkitOverflowScrolling: 'touch',
}
const brandingRowStyle: CSS.Properties = {
	width: '80%',
	// border: '1px solid red'
}