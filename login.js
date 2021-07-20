class Error{
    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const avatar = document.querySelector('.avatar');
        const header = document.querySelector('.header');
        avatar.insertBefore(div, header);

        //vanish alerts
        setTimeout(()=> document.querySelector('.alert').remove(), 3000)
    }
}



//validate

document.querySelector('.login').addEventListener('submit', (e) =>{
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    if(username === '' || password === ''){
        Error.showAlert('Please fill all the details!', 'danger');
    }else{
        return true;
    }
});