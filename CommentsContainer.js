import React from "react";
import PropTypes from "prop-types";
import {
  getCommentsByPostId,
  editComment,
  deleteComment
} from "../../services/comment.service";
import CommentThread from "./CommentThread";

class CommentsContainer extends React.Component {
  state = {
    comments: [],
    newComment: "",
    showReplyInput: false,
    currentReply: null,
    showAllComments: false
  };

  toggleShowAllComments = e => {
    e.preventDefault();
    this.setState({
      showAll: !this.state.showAllComments
    });
  };

  renderComments = () => {
    let commentArray = [];
    let rootCommentCount = 0;
    getCommentsByPostId(parseInt(this.props.postId)).then(response => {
      if (response && response.data.length > 0) {
        response.data.map(post => {
          let year = new Date().getUTCFullYear();
          let month = new Date().getUTCMonth();
          let day = new Date().getUTCDate();
          let hours = new Date().getUTCHours();
          let minutes = new Date().getUTCMinutes();
          let seconds = new Date().getUTCSeconds();
          let milliseconds = new Date().getUTCMilliseconds();
          let nowElapsed = Date.UTC(
            year,
            month,
            day,
            hours,
            minutes,
            seconds,
            milliseconds
          );
          let pTime = post.dateCreated;
          let pYear = pTime.substring(0, 4);
          let pMonth = pTime.substring(5, 7) - 1;
          let pDay = pTime.substring(8, 10);
          let pHours = pTime.substring(11, 13);
          let pMinutes = pTime.substring(14, 16);
          let pSeconds = pTime.substring(17, 19);
          let pMilliseconds = pTime.substring(20, 21) * 100;
          let postElapsed = Date.UTC(
            pYear,
            pMonth,
            pDay,
            pHours,
            pMinutes,
            pSeconds,
            pMilliseconds
          );
          let elapsedTime = Math.round((nowElapsed - postElapsed) / 1000 / 60);
          let timeStamp;
          if (elapsedTime < 1) {
            timeStamp = "1min";
          } else if (elapsedTime < 60) {
            timeStamp = `${elapsedTime}mins`;
          } else if (elapsedTime < 90) {
            timeStamp = "1hr";
          } else if (elapsedTime < 1440) {
            let hrsTime = Math.round(elapsedTime / 60);
            timeStamp = `${hrsTime}hrs`;
          } else if (elapsedTime < 2160) {
            timeStamp = "1day";
          } else if (elapsedTime < 43200) {
            let daysTime = Math.round(elapsedTime / 1440);
            timeStamp = `${daysTime}days`;
          } else if (elapsedTime < 64800) {
            timeStamp = "1mon";
          } else if (elapsedTime < 518400) {
            let monsTime = Math.round(elapsedTime / 43200);
            timeStamp = `${monsTime}mons`;
          } else if (elapsedTime < 1036800) {
            timeStamp = "1yr";
          } else {
            let yrsTime = Math.round(elapsedTime / 518400);
            timeStamp = `${yrsTime}yrs`;
          }
          let comment = {
            postId: post.parentPost,
            commentId: post.id,
            parentComment: post.parentComment,
            user: post.userId,
            username: post.firstName + " " + post.lastName,
            userAvatar: post.avatarUrl,
            dateCreated: timeStamp,
            comment: post.comment
          };
          if (comment.parentComment === null) {
            rootCommentCount++;
          }
          commentArray.push(comment);
        });
        for (let i = 0; i < commentArray.length; i++) {
          if (commentArray[i].parentComment === null) {
            commentArray[i].commentKey = rootCommentCount;
            rootCommentCount--;
          }
        }
        this.setState({
          comments: commentArray
        });
      }
    });
  };

  addComment = () => {
    if (this.state.newComment.length > 0) {
      let commentPayload = {
        userId: this.props.currentUser.id,
        parentPost: this.props.postId,
        parentComment: this.state.currentReply,
        comment: this.state.newComment
      };
      postComment(commentPayload).then(response => {
        this.setState(
          {
            showReplyInput: false,
            currentReply: null,
            newComment: ""
          },
          this.renderComments()
        );
      });
    }
  };

  handleCommentChange = e => {
    let val = e.target.value;
    this.setState({
      newComment: val
    });
  };

  removeComment = e => {
    e.preventDefault();
    let commentKeys = e.target.name.split(" ");
    let commentId = parseInt(commentKeys[0]);
    let parentCommentId = parseInt(commentKeys[1]) || null;
    let hasReplies = false;
    for (let i = 0; i < this.state.comments.length; i++) {
      if (commentId === this.state.comments[i].parentComment) {
        let comment = {
          id: commentId,
          userId: this.props.currentUser.id,
          parentPost: this.props.postId,
          parentComment: parentCommentId,
          comment: "Content removed by author.",
          removed: true
        };
        editComment(comment).then(response => {
          this.renderComments();
        });
        hasReplies = true;
        break;
      }
    }

    if (hasReplies === false) {
      deleteComment(commentId).then(response => {
        this.renderComments();
      });
    }
  };

  showReply = e => {
    e.preventDefault();
    let replyKey = parseInt(e.target.name);
    if (!this.state.showReplyInput) {
      this.setState({
        currentReply: replyKey,
        showReplyInput: !this.state.showReplyInput
      });
    } else {
      this.setState({
        currentReply: null,
        showReplyInput: !this.state.showReplyInput
      });
    }
  };

  componentDidMount() {
    let commentArray = [];
    let rootCommentCount = 0;
    if (this.props.data && this.props.data.length > 0) {
      this.props.data.map(post => {
        let year = new Date().getUTCFullYear();
        let month = new Date().getUTCMonth();
        let day = new Date().getUTCDate();
        let hours = new Date().getUTCHours();
        let minutes = new Date().getUTCMinutes();
        let seconds = new Date().getUTCSeconds();
        let milliseconds = new Date().getUTCMilliseconds();
        let nowElapsed = Date.UTC(
          year,
          month,
          day,
          hours,
          minutes,
          seconds,
          milliseconds
        );
        let pTime = post.DateCreated;
        let pYear = pTime.substring(0, 4);
        let pMonth = pTime.substring(5, 7) - 1;
        let pDay = pTime.substring(8, 10);
        let pHours = pTime.substring(11, 13);
        let pMinutes = pTime.substring(14, 16);
        let pSeconds = pTime.substring(17, 19);
        let pMilliseconds = pTime.substring(20, 21) * 100;
        let postElapsed = Date.UTC(
          pYear,
          pMonth,
          pDay,
          pHours,
          pMinutes,
          pSeconds,
          pMilliseconds
        );
        let elapsedTime = Math.round((nowElapsed - postElapsed) / 1000 / 60);
        let timeStamp;
        if (elapsedTime < 1) {
          timeStamp = "1min";
        } else if (elapsedTime < 60) {
          timeStamp = `${elapsedTime}mins`;
        } else if (elapsedTime < 90) {
          timeStamp = "1hr";
        } else if (elapsedTime < 1440) {
          let hrsTime = Math.round(elapsedTime / 60);
          timeStamp = `${hrsTime}hrs`;
        } else if (elapsedTime < 2160) {
          timeStamp = "1day";
        } else if (elapsedTime < 43200) {
          let daysTime = Math.round(elapsedTime / 1440);
          timeStamp = `${daysTime}days`;
        } else if (elapsedTime < 64800) {
          timeStamp = "1mon";
        } else if (elapsedTime < 518400) {
          let monsTime = Math.round(elapsedTime / 43200);
          timeStamp = `${monsTime}mons`;
        } else if (elapsedTime < 1036800) {
          timeStamp = "1yr";
        } else {
          let yrsTime = Math.round(elapsedTime / 518400);
          timeStamp = `${yrsTime}yrs`;
        }
        let comment = {
          postId: post.ParentPost,
          commentId: post.Id,
          parentComment: post.ParentComment,
          user: post.UserId,
          username: post.FirstName + " " + post.LastName,
          userAvatar: post.AvatarUrl,
          dateCreated: timeStamp,
          comment: post.Comment
        };
        if (comment.parentComment === null) {
          rootCommentCount++;
        }
        commentArray.push(comment);
      });
      for (let i = 0; i < commentArray.length; i++) {
        if (commentArray[i].parentComment === null) {
          commentArray[i].commentKey = rootCommentCount;
          rootCommentCount--;
        }
      }
      this.setState({
        comments: commentArray
      });
    }
  }

  render() {
    return (
      <div>
        <CommentThread
          renderComments={this.renderComments}
          comments={this.state.comments}
          currentUser={this.props.currentUser}
          addComment={this.addComment}
          showReplyInput={this.state.showReplyInput}
          currentReply={this.state.currentReply}
          showReply={this.showReply}
          handleCommentChange={this.handleCommentChange}
          newComment={this.state.newComment}
          removeComment={this.removeComment}
          showAllComments={this.state.showAllComments}
          toggleShowAllComments={this.toggleShowAllComments}
        />
      </div>
    );
  }
}

CommentsContainer.propTypes = {
  postId: PropTypes.number.isRequired,
  currentUser: PropTypes.number.isRequired
};

export default CommentsContainer;
