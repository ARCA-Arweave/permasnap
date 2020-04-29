import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonInput, IonButton } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import { DEBUGlistAlbums, DEBUGmakeAlbum, assertPermasnapAlbum } from '../providers/FilesystemProvider'
import { FilesystemDirectory } from '@capacitor/core';

const Tab3: React.FC = () => {
  const [txtInput, setTxtInput] = useState('')
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3 dog</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonInput value={txtInput} placeholder="Enter text" onIonChange={ev => setTxtInput(ev.detail.value!)}></IonInput>
        <IonButton onClick={ () => {
          assertPermasnapAlbum().then(album => {
            console.log('got album: '+JSON.stringify(album))
          })
          .catch(()=>console.log('assertPermasnapAlbum FAILURE!'))
          .finally( ()=>
            DEBUGlistAlbums()
          )
          //DEBUGmakeAlbum(txtInput)
        }}>Press</IonButton>
        <ExploreContainer name="Tab 3 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
