import { LightningElement, track } from "lwc";
import getResponse from "@salesforce/apex/ChatGPTAPIController.getResponse";

export default class ChatGPTAPI extends LightningElement {
  @track inputText = "";
  @track outputText = "";
  @track chatHistory = [];
  @track isLoading = false;

  handleInputChange(event) {
    this.inputText = event.target.value;
  }

  handleInputKeypress(event) {
    if (event.key === "Enter") {
      this.sendRequest();
    }
  }

  sendRequest() {
    this.isLoading = true;
    // Send request to backend and update output text
    getResponse({ question: this.inputText })
      .then((response) => {
        this.outputText = response;
        console.log('[Output TEXT] :: 🚀'+this.outputText);
        this.chatHistory.push({input: this.inputText, output: this.outputText});
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.isLoading = false;
      });

    this.inputText = "";
  }

  get outputText() {
    return this._outputText;
  }

  set outputText(value) {
    this._outputText = value;
    const outputDiv = this.template.querySelector(".output-text");
    if (outputDiv) {
      outputDiv.innerHTML = value;
    }
  }

  get chatHistoryExists() {
    return this.chatHistory.length > 0;
  }

  handleClearHistory() {
    this.chatHistory = [];
  }
}