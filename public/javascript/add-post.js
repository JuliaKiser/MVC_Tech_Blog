async function newFormHandler(event) {
    event.preventDefault();

const title = document.querySelector('input[name="post-title"]').nodeValue;
const post_content = document.querySelector('textarea[name="post_content"]').nodeValue;

const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
        title,
        post_content
    }),
    headers: {
        'Content-Type': 'application/json'
    }
});

if(response.ok){
    document.location.replace('/dashboard');
}else {
    alert(response.statusText);
}
};

document.querySelector('#add-post-form').addEventListener('submit', newFormHandler);