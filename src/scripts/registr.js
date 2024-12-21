import UI from "./utils/utils.js";
import{Api} from "./utils/api.js";  

function createRegisterContainer() {
    const container = UI.createElement('div', { class: 'container w-100 display-flex jc-space-between  fd-column ai-center' }, [
        UI.createElement('header', { class: 'header w-90 h-100px display-flex  ai-center js-flex-end' }, [
            UI.createElement('a', { class: 'header__link td-none transition-5', href: 'home.html' }, 'Home'),
            UI.createElement('a', { class: 'header__link td-none transition-5', href: 'index.html' }, 'Login')
        ]),
        UI.createElement('form', { class: 'formBox__register w-400px h-500px display-flex ai-center fd-column relative', id: 'formBox__register' }, [
            UI.createElement('input', { type: 'text', placeholder: 'Last Name', class: 'formBox__register__input lastName w-300px h-40px' }),
            UI.createElement('input', { type: 'text', placeholder: 'First Name ', class: 'formBox__register__input firstName w-300px h-40px' }),
            UI.createElement('input', { type: 'email', placeholder: 'Email', class: 'formBox__register__input input_email w-300px h-40px' }),
            UI.createElement('input', { type: 'text', placeholder: 'UserName', class: 'formBox__register__input userName  w-300px h-40px' }),
            UI.createElement('input', { type: 'password', placeholder: 'password', class: 'formBox__register__input password w-300px h-40px' }),
            UI.createElement('div', { class: 'gender w-300px h-40px display-flex ai-center' }, [
                UI.createElement('label', { for: 'male-gender' }, [
                    UI.createElement('input', { type: 'radio', name: 'gender', value: 'male', id: 'male-gender', class: 'radio' }),
                    ' Male'
                ]),
                UI.createElement('label', { for: 'female-gender' }, [
                    UI.createElement('input', { type: 'radio', name: 'gender', value: 'female', id: 'female-gender', class: 'radio-two' }),
                    ' Female'
                ])
            ]),
            UI.createElement('div', {class: 'inputBox w-300px h-40px display-flex js-flex-end ai-center absolute'},[
                UI.createElement('button', { type: 'submit', class: 'submit-btn w-100px h-30px', id: 'submit-btn'}, 'Submit')
            ])
        ])
    ]);

    UI.render(container, 'body');
}
createRegisterContainer();



document.getElementById('formBox__register').addEventListener('submit', (event)=>{
    event.preventDefault();
    const lastName = document.querySelector('.lastName').value ;
    const firstName = document.querySelector('.firstName').value;
    const email = document.querySelector('.input_email').value;
    const userName = document.querySelector('.userName').value ;
    const password = document.querySelector('.password').value;

    
    if (!lastName || !firstName || !email || !userName || !password){
        alert('Please fill out all fields  ') ;
        return;
    }

    createNewBlog( lastName, firstName, email, userName, password);
    setTimeout(() =>{
        window.location.href = 'home.html'
    }, 1000)
    
})




function createNewBlog( lastName, firstName, email, userName, password) {
    const blogData = {
        lastName: lastName,
        firstName: firstName ,
        email: email,
        userName: userName,
        password: password
    };

        return new Api('https://simple-blog-api-red.vercel.app')
            .post('/auth/register', blogData )
            .then(blogger => {
                
               return blogger
                
            })
            .catch(error =>{
                console.error('Error creating post:', error) ;
            });    

}

