import UI from "./utils/utils.js";
import{Api} from "./utils/api.js";


function createBlogPostContainer() {
    const blogPostContainer = UI.createElement('div', {class: 'container__newBlogPost h-600px display-flex jc-space-between fd-column ai-center'},[
        UI.createElement('header', {class: 'header w-90 h-100px display-flex ai-center js-flex-end' },[
            UI.createElement('a', {class: 'header__link td-none transition-5', href: 'home.html'}, 'Home')
        ]),
        UI.createElement('form', {class: 'form__box w-400px h-500px display-flex fd-column jc-space-between ai-center', id: 'createPostForm'},[ 
            UI.createElement('h2', {class: 'title__newBlogPost'}, 'New Blog Post'),
            UI.createElement('input', {class: 'input__title__newBlogPost w-200px h-40px', placeholder: 'Title', type: 'text' }),
            UI.createElement('textarea', {class: 'textarea__newBlogPost w-200px h-200px ta-center', placeholder: 'Post Story'}),
            UI.createElement('input', {type: 'url',  placeholder:"https://wellsvillesun.com/wp-content/uploads/2024/01/pride-and-prejudice-book-summary.jpg.webp" , class: 'input-url w-200px'}),
            UI.createElement('input', {class: 'input input-authorName w-200px', placeholder: 'Author Name'}),
            UI.createElement('button', {type: 'submit', class: 'submit-btn submit-createNewPost w-100px h-30px' },'Create Blog')
        ])
    ]);

    UI.render(blogPostContainer, 'body');

}

createBlogPostContainer();


function fetchPostById(postId) {
    return fetch(`https://simple-blog-api-red.vercel.app/api/posts/${postId}`)
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching post:', error);
            return null;
        });
}


const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('postId');

if (postId) {
    
    fetchPostById(postId).then(postData => {
        if (postData) {
          
            document.querySelector('.input__title__newBlogPost').value = postData.title;
            document.querySelector('.textarea__newBlogPost').value = postData.story;
            document.querySelector('.input-url').value = postData.img;
            document.querySelector('.input-authorName').value = postData.authorName;
            document.querySelector('.submit-btn').textContent = 'Update Blog';

         
            const form = document.getElementById('createPostForm');
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                const updatedPostData = {
                    title: document.querySelector('.input__title__newBlogPost').value,
                    story: document.querySelector('.textarea__newBlogPost').value,
                    img: document.querySelector('.input-url').value,
                    authorName: document.querySelector('.input-authorName').value
                };

                setTimeout(()=>{
                    updatePost(postId, updatedPostData);
                })
                
            });
        }
    });
} else {
    
    const form = document.getElementById('createPostForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.querySelector('.input__title__newBlogPost').value;
        const story = document.querySelector('.textarea__newBlogPost').value;
        const img = document.querySelector('.input-url').value;
        const authorName = document.querySelector('.input-authorName').value;

        createNewPost(title, story, img, authorName);
        setTimeout(()=>{
            window.location.href = 'home.html';
    
            
        },1000)
    });
}


function createNewPost(title, story, img,  authorName) {
    const postData = {
        title: title,
        story: story ,
        authorName: authorName,
        img: img
    };

        

    return new Api('https://simple-blog-api-red.vercel.app')
    .post("/api/posts/", postData)  
    .then(post => {
        return post
    })
    .catch(error => {
        console.error('Error creating post:', error);
    });

}


function updatePost(postId,  updatedPostData){
    return new Api('https://simple-blog-api-red.vercel.app/api/posts/')

    .update(postId, updatedPostData)
        .then(updatedPost =>{

            clearForm();
            
            window.location.href = 'home.html' ; 
        })
        .catch(error => {
            console.error('Error updating post:', error) ;
        });
}


function clearForm(){
    document.querySelector('.input__title__newBlogPost').value = '' ;
    document.querySelector('.textarea__newBlogPost').value =  '';
    document.querySelector('.input-url').value  = '' ;
    document.querySelector('.input-authorName').value = '';
    document.querySelector('.submit-btn').textContent =   'Create Blog';  
}














