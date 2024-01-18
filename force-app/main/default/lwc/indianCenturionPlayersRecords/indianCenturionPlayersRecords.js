import { LightningElement, api, wire, track } from 'lwc';
import viratResource from '@salesforce/resourceUrl/virat';
import bcciLogo from '@salesforce/resourceUrl/bcci';
import brandPalette from '@salesforce/resourceUrl/worldCupLogos';
import viratWithBat from '@salesforce/resourceUrl/ViratKohliWithBat';
import getAllPlayerInfo from '@salesforce/apex/indianPlayerHandlerClass.getAllPlayerInfo';
export default class IndianCenturionPlayersRecords extends LightningElement {
  NavarasaAnguish = viratResource + '/NavarasaAnguish.png';
  NavarasaBravery = viratResource + '/NavarasaBravery.png';
  NavarasaGlory = viratResource + '/NavarasaGlory.png';
  NavarasaJoy = viratResource + '/NavarasaJoy.png';
  NavarasaPassion = viratResource + '/NavarasaPassion.png';
  NavarasaPower = viratResource + '/NavarasaPower.png';
  NavarasaPride = viratResource + '/NavarasaPride.png';
  NavarasaRespect = viratResource + '/NavarasaRespect.png';
  NavarasaWonder = viratResource + '/NavarasaWonder.png';
  BCCI_LOGO = bcciLogo;
  BRAND_PALETTE = brandPalette;
  VIRAT_IMAGE = viratResource + '/Virat.png';
  VIRAT_WITH_BAT = viratWithBat;
  isFirstPage = true;
  viratPage = false;
  @track styleCard = '';
  @api playerName;
  @track playersRecords = [];
  handleCardClick(event) {
    this.isFirstPage = false;
    this.viratPage = true;
    this.playerName = 'Virat Kohli';
    
  }

  @wire(getAllPlayerInfo, { playerName: '$playerName' })
  selectedUsersInfo({ data, error }) {
    if (data) {
      data.forEach(player => {
        this.playersRecords.push(player);
      });
      
      console.log('Players Records: '+JSON.stringify(this.playersRecords));
    } else if (error) {
      console.log('ERROR Occurred: ' + JSON.stringify(error));
    }
  }
}