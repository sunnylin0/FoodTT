
export const FormTest = () => {
    function action(data) {
        const title = data.get('title')
        const content = data.get('content')

        if (title && content) {
            setPosts([...posts, { title, content }])
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();     //停止跳轉
        const formData = new FormData(event.target);
        const formValues = Object.fromEntries(formData);
        console.log(formValues);

    };
    return <form id="form" method="post" onSubmit={handleSubmit}>
        First name:
        <input type="text" defaultValue="Jake" name="fname" />
        Last name:
        <input type="text" defaultValue="Ma" name="lname" />
        <input type="submit" value="提交" />
    </form>
}


export const FormTest2 = () => {
    function action(data) {
        const title = data.get('title')
        const content = data.get('content')

        if (title && content) {
            setPosts([...posts, { title, content }])
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();     //停止跳轉
        const formData = new FormData(event.target);
        const formValues = Object.fromEntries(formData);
        console.log(formValues);

    };
    return <form id="form" method="post" action="/order">
        <p>有 action </p>
        First name:
        <input type="text" defaultValue="Jake" name="fname" />
        Last name:
        <input type="text" defaultValue="Ma" name="lname" />
        <input type="submit" value="提交" />
    </form>
}