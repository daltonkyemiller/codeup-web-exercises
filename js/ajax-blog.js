import { randomHSL } from '../playground/utils/utils.js';

$(() => {
    const BlogPost = (post, idx) => {
        //language=HTML
        return `
            <div class="post" style="--idx: ${idx};}">
                <div class="title"><h1>${post.title}</h1></div>
                <div class="content"><p>${post.content}</p></div>
                <div class="categories">
                    ${post.categories.map((category) =>
                            `<div class="category" style="background-color: ${randomHSL(60)}">${category}</div>`).join('')}
                </div>
            </div>
        `;
    };

    const updateBlogPosts = () => {
        const blogPosts = $('#blog-posts');
        $.get('./data/blog.json').done((data) => {
            blogPosts.html('');
            data.forEach((post, idx) => {
                blogPosts.append(BlogPost(post, idx));
            });
        });
    };

    updateBlogPosts();
});