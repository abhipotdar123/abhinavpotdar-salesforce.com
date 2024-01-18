import { LightningElement, wire, track } from 'lwc';
import getUsersByProfile from '@salesforce/apex/chatRoomController.getAllUsers';

export default class ChatRoomController extends LightningElement {
    users;

    @wire(getUsersByProfile)
    wiredUsers({ error, data }) {
        if (data) {
            this.users = data;
            console.log('USers ', this.users);
        } else if (error) {
            console.error(error);
        }
    }

    handleUserClick(event) {
        const userId = event.target.dataset.userId;
        this.navigateToUser(userId);
    }

    navigateToUser(userId) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: userId,
                actionName: 'view'
            }
        });
    }
    handleUserClick(event) {
        const userName = event.currentTarget.dataset.userName;
        console.log('Clicked user name:', userName);
        // Perform any additional actions with the user name
    }
}