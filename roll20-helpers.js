function sendChat(string){
  document.querySelector(`textarea.ui-autocomplete-input`).value = string;
  document.querySelector(`#chatSendBtn`).click();
}
