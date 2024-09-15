// Handle creating an article and saving it in localStorage
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("article-form");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const title = document.getElementById("title").value;
            const content = document.getElementById("content").value;

            // Get articles from localStorage
            let articles = JSON.parse(localStorage.getItem("articles")) || [];

            // Create a new article object
            const newArticle = {
                id: articles.length + 1,
                title: title,
                content: content
            };

            // Save article in localStorage
            articles.push(newArticle);
            localStorage.setItem("articles", JSON.stringify(articles));

            // Redirect to home page
            window.location.href = "index.html";
        });
    }

    // Display articles on the index.html page
    const articleList = document.getElementById("article-list");
    if (articleList) {
        const articles = JSON.parse(localStorage.getItem("articles")) || [];
        articles.forEach(article => {
            const listItem = document.createElement("li");
            const articleLink = document.createElement("a");
            articleLink.href = `article.html?id=${article.id}`;
            articleLink.textContent = article.title;
            listItem.appendChild(articleLink);
            articleList.appendChild(listItem);
        });
    }

    // Display article on article.html page
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get("id");
    if (articleId) {
        const articles = JSON.parse(localStorage.getItem("articles")) || [];
        const article = articles.find(a => a.id == articleId);
        if (article) {
            document.getElementById("article-title").textContent = article.title;
            document.getElementById("article-content").textContent = article.content;
        }
    }
});
