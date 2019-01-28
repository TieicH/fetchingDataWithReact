import React from "react";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import "./Posts.css";

class Posts extends React.Component {
  state = {
    posts: []
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get("/posts")
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: "TH"
          };
        });
        this.setState({ posts: updatedPosts });
      })
      .catch(e => console.log(e));
  }

  postSelectedHandler(id) {
    this.setState({ selectedPostId: id });
  }

  render() {
    const post = this.state.posts.map(post => {
      return (
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => this.postSelectedHandler(post.id)}
        />
      );
    });

    return <section className="Posts">{post}</section>;
  }
}

export default Posts;
