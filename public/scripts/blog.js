const commentForm = document.getElementById('commentForm');
const commentsSection = document.querySelector('.comments-section');

commentForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const commenterName = document.getElementById('commenterName').value;
    const commentText = document.getElementById('commentText').value;

    const newComment = document.createElement('div');
    newComment.classList.add('comment');

    const nameElement = document.createElement('div');
    nameElement.classList.add('commenter-name');
    nameElement.textContent = commenterName;

    const timeElement = document.createElement('div');
    timeElement.classList.add('comment-time');
    const currentTime = new Date();
    timeElement.textContent = `Posted on: ${currentTime.toDateString()}`;

    const textElement = document.createElement('p');
    textElement.textContent = commentText;

    newComment.appendChild(nameElement);
    newComment.appendChild(timeElement);
    newComment.appendChild(textElement);

    commentsSection.appendChild(newComment);

    commentForm.reset();
});