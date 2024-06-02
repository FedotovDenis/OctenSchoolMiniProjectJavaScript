if (window.location.href.includes('post-details.html')) {
    let urlParams = new URLSearchParams(window.location.search);
    let postId = urlParams.get('id');

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(response => response.json())
        .then(post => {
            let postDetails = document.getElementById('postDetails');
            postDetails.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
                `;

            fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
                .then(response => response.json())
                .then(comments => {
                    let postComments = document.getElementById('postComments');
                    comments.forEach(comment => {
                        let commentBlock = document.createElement('div');
                        commentBlock.className = 'comment';

                        let commentName = document.createElement('h4');
                        commentName.textContent = comment.name;

                        let commentBody = document.createElement('p');
                        commentBody.textContent = comment.body;

                        commentBlock.appendChild(commentName);
                        commentBlock.appendChild(commentBody);

                        postComments.appendChild(commentBlock);
                    });
                })
                .catch(error => console.error('Помилка при отриманні коментарів:', error));
        })
        .catch(error => console.error('Помилка при отриманні даних:', error));
}