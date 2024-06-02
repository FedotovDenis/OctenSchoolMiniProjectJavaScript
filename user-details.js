if (window.location.href.includes('user-details.html')) {
    let urlParams = new URLSearchParams(window.location.search);
    let userId = urlParams.get('id');

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            let userDetails = document.getElementById('userDetails');
            userDetails.innerHTML = `
                    <h2>${user.name}</h2>
                    <p><strong>ID:</strong> ${user.id}</p>
                    <p><strong>Username:</strong> ${user.username}</p>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Address:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
                    <p><strong>Phone:</strong> ${user.phone}</p>
                    <p><strong>Website:</strong> ${user.website}</p>
                    <p><strong>Company:</strong> ${user.company.name}</p>
                `;
        })
        .catch(error => console.error('Помилка при отриманні данных:', error));

    let userPostsButton = document.getElementById('userPostsButton');
    userPostsButton.addEventListener('click', () => {
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
            .then(response => response.json())
            .then(posts => {
                let userPosts = document.getElementById('userPosts');
                userPosts.innerHTML = '';
                posts.forEach(post => {
                    let postBlock = document.createElement('div');
                    postBlock.className = 'post';

                    let postTitle = document.createElement('h3');
                    postTitle.textContent = post.title;

                    let postLink = document.createElement('a');
                    postLink.href = `post-details.html?id=${post.id}`;
                    postLink.textContent = 'Подробнее';

                    postBlock.appendChild(postTitle);
                    postBlock.appendChild(postLink);

                    userPosts.appendChild(postBlock);
                });
            })
            .catch(error => console.error('Помилка при отриманні данных', error));
    });
}