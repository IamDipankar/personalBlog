const titleInput = document.getElementById('title');
const bodyInput = document.getElementById('body');
const previewTitle = document.getElementById('previewTitle');
const previewBody = document.getElementById('previewBody');
const titleCounter = document.getElementById('titleCounter');

function updateTitle() {
    const titleLength = titleInput.value.length;
    previewTitle.textContent = titleInput.value || 'Blog Title Preview';

    if (titleLength < 13) {
        titleCounter.textContent = `Title must be at least 13 characters (${titleLength}/13)`;
    } else if (titleLength > 150) {
        titleCounter.textContent = `Title must not exceed 150 characters (${titleLength}/150)`;
    } else {
        titleCounter.textContent = '';
    }
}

function updateBody() {
    previewBody.innerHTML = bodyInput.value.replace(/\n/g, '<br>') || 'Blog body content will appear here as you write...';
}

// document.getElementById('blogForm').addEventListener('submit', function (event) {
//     event.preventDefault();
//     alert('Blog submitted successfully!');
// });


const textarea = document.querySelector('textarea#body');

textarea.addEventListener('paste', (event) => {
    // Prevent the default plain-text paste behavior
    event.preventDefault();

    // Get the HTML content from the clipboard
    const htmlData = event.clipboardData.getData('text/html');
    const plainData = event.clipboardData.getData('text/plain');

    // If HTML content exists, process it
    let contentToPaste = htmlData || plainData;

    if (htmlData) {
      // Remove <html> and <body> tags using a regular expression
      contentToPaste = contentToPaste
        .replace(/<\/?(html|body)[^>]*>/gi, '') // Remove <html>, </html>, <body>, </body>
        .trim(); // Remove any extra whitespace
    }

    const currentText = textarea.value;

    // Insert the content at the caret position
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    textarea.value = currentText.slice(0, start) + contentToPaste + currentText.slice(end);

    // Move the caret to the end of the pasted content
    textarea.selectionStart = textarea.selectionEnd = start + contentToPaste.length;
    updateBody();
  });


updateTitle();
updateBody();