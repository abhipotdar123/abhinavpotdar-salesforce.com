import { LightningElement } from 'lwc';
import BOOK_API_URL from '@salesforce/label/c.bookAppURL';

export default class BookApp extends LightningElement {
    query='Man'
    books
    timer
    connectedCallback(){
        this.fetchBookData()
    }

    fetchBookData(){
        fetch(BOOK_API_URL+this.query)
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            this.books = data;
        })
        .catch(error=>console.error(error))
    }
    fetchBooksHandler(event){
        this.query = event.target.value;
        window.clearTimeout(this.timer);
        this.timer= setTimeout(()=>{
            this.fetchBookData();
        }, 1000)
    }
}