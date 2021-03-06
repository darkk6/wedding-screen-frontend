import React from 'react';
import CommentInput from './comment-input';
import BulletCommentRiver from './bulletcomment-river';
import styles from './slideshow.css';

function PicSlider({ index, pictures }) {
  return (
    <div>
      {
        pictures.map((url, i) => {
          if ((i + 1) % pictures.length === index) {
            return <div key={i} className={`${styles.blur} ${styles.hidden}`} style={{ backgroundImage: `url("${url}")` }}></div>
          } else if (i === index) {
            return (<div key={i} className={`${styles.blur} ${styles.visible}`} style={{ backgroundImage: `url("${url}")` }}></div>)
          }
          return <div key={i} className={`${styles.blur} ${styles.hidden}`} style={{ backgroundImage: `url("${url}")` }}></div>
        })
      }
      {
        pictures.map((url, i) => {
          if ((i + 1) % pictures.length === index) {
            return <div key={i} className={`${styles.slide} ${styles.hidden}`} style={{ backgroundImage: `url("${url}")` }}></div>
          } else if (i === index) {
            return (<div key={i} className={`${styles.slide} ${styles.visible}`} style={{ backgroundImage: `url("${url}")` }}></div>)
          }
          return <div key={i} className={`${styles.slide} ${styles.hidden}`} style={{ backgroundImage: `url("${url}")` }}></div>
        })
      }
    </div>
  )
}

class Slideshow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      silence: false
    };
    this.toggleSilence = this.toggleSilence.bind(this);
    this.addComment = this.addComment.bind(this);
  }
  addComment(comment) {
    this.setState({ silence: false });
    this.props.addComment(comment);
  }
  toggleSilence() {
    this.setState((preState) => {
      return { silence: !preState.silence }
    });
  }
  render() {
    const { silence } = this.state;
    const { index, pictures, newComment } = this.props;
    return (
      <div>
        <PicSlider index={index} pictures={pictures} />
        <BulletCommentRiver silence={silence} newComment={newComment} />
        <CommentInput silence={silence} toggleSilence={this.toggleSilence} addComment={this.addComment} />
      </div>
    );
  }
}

export default Slideshow;
