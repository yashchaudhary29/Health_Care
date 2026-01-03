document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully with Backend!');

    // 1. Smooth scrolling
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 2. Add Comment Section UI
    const sections = document.querySelectorAll('section');
    const conclusion = sections[sections.length - 1]; 

    const commentSection = document.createElement('div');
    commentSection.id = 'comment-section';
    commentSection.innerHTML = `
        <h3>Comments</h3>
        <form id="comment-form">
            <input type="text" id="comment-name" placeholder="Your Name" required>
            <textarea id="comment-text" placeholder="Share your thoughts!" required></textarea>
            <button type="submit">Post Comment</button>
        </form>
        <div id="comments-list"></div>
    `;
    conclusion.appendChild(commentSection);

    const form = document.getElementById('comment-form');
    const commentsList = document.getElementById('comments-list');

    // 3. Display Comments (GET)
    async function displayComments() {
        try {
            const response = await fetch('http://localhost:5000/api/comments');
            const comments = await response.json();
            commentsList.innerHTML = ''; 
            
            comments.forEach(c => {
                const div = document.createElement('div');
                div.className = 'comment';
                const dateString = new Date(c.date).toLocaleString();
                div.innerHTML = `<strong>${c.name}</strong> (${dateString}): ${c.text}`;
                commentsList.appendChild(div);
            });
        } catch (error) {
            console.log("Backend offline hai!", error);
        }
    }

    displayComments();

    // 4. Submit Comment (POST) - FIXED PORTION
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Yahan 'value' likhna zaroori hai
        const nameInput = document.getElementById('comment-name').value;
        const textInput = document.getElementById('comment-text').value;

        try {
            const response = await fetch('http://localhost:5000/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: nameInput, text: textInput })
            });

            if (response.ok) {
                form.reset();
                displayComments(); 
            }
        } catch (error) {
            alert("Server se connection nahi ho paya!");
        }
    });

    // 5. Image Hover Effect
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('mouseenter', () => img.style.transform = 'scale(1.03)');
        img.addEventListener('mouseleave', () => img.style.transform = 'scale(1)');
    });
});