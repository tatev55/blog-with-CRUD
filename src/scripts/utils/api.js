export class Api {
    constructor(baseUrl) {
        this.baseUrl = baseUrl; 
    }

    buildUrl(path = '') {
        return `${this.baseUrl}${path}`;
    }

    get(path = '') {
        return fetch(this.buildUrl(path))
            .then(response => {
                if (!response.ok){

                    throw new Error('Posts not found: ' + response.statusText);
                }
                return response.json();
            })
            .catch(error =>  {
                console.error('Error in GET request for posts:', error) ;
                throw error;
            });
    }

    delete(path = ''){
        return fetch(this.buildUrl(path), {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete: ' + response.statusText);
            }
            if (response.status === 204) {
                return;
            }
        })
        .catch(error => {
            console.error('Error in DELETE request:', error);
            throw error ;
        });
    }

    post(path = '', postData){
        return fetch(this.buildUrl(path), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
        .then(response => {
            if (!response.ok){
                throw new Error('Failed to create post: ' + response.statusText) ;
            }
            return response.json();
        })

        .catch(error => {
            console.error('Error:', error) ;
            throw error;
        });
    }

    update(path = '',  updatedPost) {
        return fetch(this.buildUrl(path),{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json' ,
            },
            body: JSON.stringify(updatedPost),
        })

        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update post: ' + response.statusText) ;
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
    }
}
