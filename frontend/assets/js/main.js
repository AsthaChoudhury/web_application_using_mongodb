document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.querySelector('.header__login-btn');
  const registerButton = document.querySelector('.header__register-btn');
  const commentToggle = document.querySelector(".comment-toggle");
  const commentSection = document.querySelector(".comment-section");

  loginButton.addEventListener('click', () => {
    fetch('login.html')
      .then(response => response.text())
      .then(data => {
        const mainContainer = document.querySelector('.main');
        mainContainer.innerHTML = data;
      })
      .catch(error => {
        console.error('Error fetching login page:', error);
      });
  });

  registerButton.addEventListener('click', () => {
    fetch('register.html')
      .then(response => response.text())
      .then(data => {
        const mainContainer = document.querySelector('.main');
        mainContainer.innerHTML = data;
      })
      .catch(error => {
        console.error('Error fetching register page:', error);
      });
  });

  document.addEventListener('submit', async (event) => {
    if (event.target.classList.contains('auth-form')) {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);

      try {
        const response = await fetch('/api/user/login', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          window.location.href = 'index.html'; 
        } else {
          console.error('Login failed');
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    }
  });

  const likeButtons = document.querySelectorAll('.like-button');
  likeButtons.forEach((button) => {
    button.addEventListener('click', async (event) => {
      const recipeId = event.target.dataset.recipeId;

      try {
        const response = await fetch(`/api/recipe/${recipeId}/like`, {
          method: 'POST',
        });
        const data = await response.json();
        const likeIcon = event.target.querySelector('.like-icon');
        likeIcon.src = 'assets/img/like.jpg';
      } catch (error) {
        console.error(error);
      }
    });
  });

  const saveButtons = document.querySelectorAll('.save-button');
  saveButtons.forEach((button) => {
    button.addEventListener('click', async (event) => {
      const recipeId = event.target.dataset.recipeId;

      try {
        const response = await fetch(`/api/recipe/${recipeId}/save`, {
          method: 'POST',
        });
        const data = await response.json();
        const saveIcon = event.target.querySelector('.save-icon');
        saveIcon.src = 'assets/img/save.jpg';
      } catch (error) {
        console.error(error);
      }
    });
  });

  const commentForms = document.querySelectorAll('.comment-form');
  commentForms.forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const recipeId = event.target.dataset.recipeId;
      const commentText = form.querySelector('.comment-input').value;

      try {
        const response = await fetch(`/api/recipe/${recipeId}/comment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ comment: commentText }),
        });
        const data = await response.json();
        const commentContainer = form.querySelector('.comments-container');
        const newComment = document.createElement('div');
        newComment.textContent = commentText;
        commentContainer.appendChild(newComment);
        form.reset();
      } catch (error) {
        console.error(error);
      }
    });
  });

  commentToggle.addEventListener("click", () => {
    commentSection.style.display = commentSection.style.display === "none" ? "block" : "none";
  });
});
