import { LightningElement, track, wire, api } from 'lwc';
import getAllUsers from '@salesforce/apex/usersHandler.getAllUsers';
import getLoggedInUser from '@salesforce/apex/usersHandler.getLoggedInUser';
import getUser from '@salesforce/apex/usersHandler.getUser';
import USER_OBJECT from '@salesforce/schema/User__c';

export default class TeamTime extends LightningElement {
  @track usersCurrentTime = '';
  @track selectedUsersTime = '';
  @track selectedUsersTimeZone = '';
  @track userRecords;
  @api userId;
  @track firstUserRecord;
  loggedInUser = '';
  zone;
  @track profileLogo;
  arrayOfObjects = [];
  users = USER_OBJECT;
  @track nameField;
  @track emailField;
  @track timeZones;
  @track contactNumber;
  @track cityName;
  @track userInfo; // Declare userInfo as a tracked variable
  @track textColor;
  @track isFalse = true;
  @track initial = false;
  @track statusOfUser;
  @track statusColor;
  @track usersSkills;
  @track userProfile = false;
  @track loadProfileCard = false;

  connectedCallback() {
    setInterval(() => {
      this.usersCurrentTime = new Date().toLocaleTimeString();
    }, 1000);
  }
  
  @wire(getAllUsers)
  getAllUsersRecords({ data, error }) {
    if (data) {
      console.log('All users Data: ' + JSON.stringify(data));
      this.userRecords = data.map((userRecord) => {
        return {
          value: userRecord.Id,
          label: userRecord.Name
        };
      });
    } else if (error) {
      console.log('ERROR Occurred: ' + error);
    }
  }

  @wire(getLoggedInUser)
  getLoggedInUserInfo({ data, error }) {
    if (data) {
      this.loggedInUser = data.Name;
    } else if (error) {
      this.error = error;
    }
  }

  @wire(getUser, { recordId: '$userId' })
  selectedUsersInfo({ data, error }) {
    
    if (data) {
      console.log('DATA: ' + JSON.stringify(data));
      this.userProfile = true;
      var initials = '';
      this.userInfo = data.map((item) => {
        
        if (item.Name) {
          this.nameField = item.Name;
        }
        
        if (item.Email__c) {
          this.emailField = item.Email__c;
          this.textColor = 'normalText';
        }
        else {
          this.emailField = 'Email Field is Empty';
          this.textColor = 'redText';
        }
        
        if (item.Contact_Number__c) {
          this.contactNumber = item.Contact_Number__c;
          this.textColor = 'normalText';
        }
        else {
          this.contactNumber = 'Email Field is Empty';
          this.textColor = 'redText';
        }

        if (item.Gender__c == 'Male') {
          initials = '';
          this.initial = true;
          this.profileLogo = 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg';
          const mYdiv = this.template.querySelector('.profile-initials-Image');
          if(mYdiv){
            mYdiv.textContent = '';
          }
          this.template.querySelector('.logo').classList.remove('profile-initials-Image');
        }
        else if (item.Gender__c == 'Female') {
          initials = '';
          this.initial = true;
          this.profileLogo = 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';
          
          const mYdiv = this.template.querySelector('.profile-initials-Image');
          if(mYdiv){
            mYdiv.textContent = '';
          }
          this.template.querySelector('.logo').classList.remove('profile-initials-Image');
        }
        else {
          this.template.querySelector('.logo').classList.remove('profile-initials-Image');
          this.template.querySelector('.logo').classList.add('profile-initials-Image');
          this.initial = false;
          this.profileLogo = '';
          const nameArray = this.nameField.split(' ');
          const firstName = nameArray[0];
          const lastName = nameArray[1];
          initials = firstName.charAt(0) + lastName.charAt(0);
          const mYdiv = this.template.querySelector('.profile-initials-Image');
          if(mYdiv){
            mYdiv.textContent = initials;
          }
        }
        
        this.cityName = item.City__c;

        if (item.Timezone__c) {
          this.selectedUsersTimeZone = item.Timezone__c;
          setInterval(() => {
          this.selectedUsersTime = new Date().toLocaleTimeString('en-US', { timeZone: this.selectedUsersTimeZone});
          const timeString = new Date().toLocaleTimeString('en-US', { timeZone: this.selectedUsersTimeZone,hours:'numeric',hour12:false});
          const timePart = timeString.split(":");
          const hours = parseInt(timePart[0],10);
          const minut = parseInt(timePart[1],10);
          console.log('If check1: '+(hours >= 8 && hours <= 18));
          if (hours >= 8 && hours <= 18)  {
            if (hours == 18 && minut >= 30) {
              console.log('If check2: '+(hours == 18 && minut > 30));
              this.statusOfUser = 'unavailable';
              this.statusColor = 'redStatus';
            }  else {
              this.statusOfUser = 'Available';
              this.statusColor = 'greenStatus';
            }
          }
          else{
            this.statusOfUser = 'unavailable';
            this.statusColor = 'redStatus';
          }
            
          }, 1000);
        }
        if (item.Skills__c) {
          this.usersSkills = item.Skills__c.split(';');
          console.log('Skills: ' + this.usersSkills);
        }
      });
    } else if (error) {
      console.log('Error: ' + error);
    }
  }

  handleChange(event) {
    this.userId = event.target.value;
    this.loadProfileCard = true;
  }
}