export default class Alert {
    constructor(alertId) {
        this.alert = document.getElementById(alertId);
    }

    render() {}

    show (message) {
        this.alert.innerText = message;
        this.alert.classList.remove('d-none');        
    }

    hide() {
        this.alert.classList.add('d-none');   
    }
}