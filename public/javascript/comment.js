async function commentFormHandler(event) {
  event.preventDefault();

  const comment_content = document.querySelector("#comment-body").value.trim();

  let post_id = document.querySelector("#comment-body").dataset.id;

  post_id = parseInt(post_id);
  if (comment_content) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        post_id,
        comment_content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
      document.querySelector("#comment-form").style.display = "block";
    }
  }
}

document
  .querySelector(".comment-form")
  .addEventListener("submit", commentFormHandler);
