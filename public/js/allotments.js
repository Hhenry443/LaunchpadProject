const postContainer = document.getElementById("postContainer");

const form = document.getElementById("postForm");

// board page

if (postContainer) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  function displayPosts() {
    postContainer.innerHTML = "";

    posts.forEach((post, index) => {
      if (!post.interested) {
        post.interested = [];
      }

      const card = document.createElement("div");

      card.classList.add("post-card");

      card.innerHTML = `
                <h2>${post.produce}</h2>

                <p class="post-info">
                    <strong>Name:</strong>
                    ${post.name}
                </p>

                <p class="post-info">
                    <strong>Allotment:</strong>
                    ${post.allotment}
                </p>

                ${
                  post.plot
                    ? `
                <p class="post-info">
                    <strong>Plot:</strong>
                    ${post.plot}
                </p>
                `
                    : ""
                }

                <p class="post-info">
                    <strong>Amount:</strong>
                    ${post.amount}
                </p>

                ${
                  post.time
                    ? `
                <p class="post-info">
                    <strong>Available:</strong>
                    ${post.time}
                </p>
                `
                    : ""
                }

                <div class="button-row">

                    <button
                        class="interest-btn"
                        onclick="showInterest(${index})">

                        I'm Interested
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deletePost(${index})">

                        Remove
                    </button>

                </div>

                <div class="interest-list">
                    ${post.interested
                      .map(
                        (person) =>
                          `<p>${person} is interested in this post</p>`,
                      )
                      .join("")}
                </div>
            `;

      postContainer.prepend(card);
    });
  }

  window.showInterest = function (index) {
    const personName = prompt("Enter your name:");

    if (!personName) return;

    posts[index].interested.push(personName);

    localStorage.setItem("posts", JSON.stringify(posts));

    displayPosts();
  };

  window.deletePost = function (index) {
    if (confirm("Remove this post?")) {
      posts.splice(index, 1);

      localStorage.setItem("posts", JSON.stringify(posts));

      displayPosts();
    }
  };

  displayPosts();
}

// offer pahe

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const post = {
      name: document.getElementById("name").value,

      allotment: document.getElementById("allotment").value,

      plot: document.getElementById("plot").value,

      produce: document.getElementById("produce").value,

      amount: document.getElementById("amount").value,

      time: document.getElementById("time").value,

      interested: [],
    };

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts.push(post);

    localStorage.setItem("posts", JSON.stringify(posts));

    window.location.href = "/allotment-board";
  });
}
