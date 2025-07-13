# Useful stuffs

## Functions

### Send a message to chat log
```
function sendChat(string){
  document.querySelector(`textarea.ui-autocomplete-input`).value = string;
  document.querySelector(`#chatSendBtn`).click();
}
```
