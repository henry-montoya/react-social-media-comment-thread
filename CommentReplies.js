import React from "react";
import CommentForm from "./CommentForm";

class CommentReplies extends React.Component {
  render() {
    return (
      <React.Fragment>
        <li className="list" style={{ listStyle: "none" }} className="pl-1">
          <div className="row mt-1">
            <div className="col-md-1 mr-4">
              <img
                src={this.props.reply.userAvatar}
                className="img-circle ml-0"
                style={{ height: "35px", width: "35px", borderRadius: "50%" }}
              />
            </div>

            <div
              className="col-md-7 mr-0"
              style={{
                backgroundColor: "rgb(225, 227, 232)",
                borderRadius: "20px",
                padding: "2%"
              }}
            >
              <p style={{ overflowWrap: "break-word" }}>
                <b>{this.props.reply.username}</b>
                &nbsp;&nbsp;
                {this.props.reply.comment}
              </p>
            </div>
            <div className="col-md-3">
              <div className="row mb-0">
                <div className="col-md-12">
                  <h6 style={{ fontSize: "xx-small" }}>
                    {this.props.reply.dateCreated}
                  </h6>
                </div>
              </div>
              {this.props.reply.user !== null && (
                <div className="row">
                  <div className="col-md-12">
                    <a
                      href="#"
                      onClick={this.props.showReply}
                      name={this.props.reply.commentId}
                    >
                      {this.props.showReplyInput &&
                      this.props.currentReply === this.props.reply.commentId
                        ? "cancel"
                        : "reply"}
                    </a>
                  </div>
                </div>
              )}
              {this.props.currentUser.id === this.props.reply.user &&
                this.props.reply.user !== null && (
                  <div className="row">
                    <div className="col-md-12">
                      <a
                        href="#"
                        onClick={this.props.removeComment}
                        name={
                          this.props.reply.commentId +
                          " " +
                          this.props.reply.parentComment
                        }
                      >
                        delete
                      </a>
                    </div>
                  </div>
                )}
            </div>
          </div>
          {this.props.showReplyInput &&
            this.props.currentReply === this.props.reply.commentId && (
              <CommentForm
                currentUser={this.props.currentUser}
                addComment={this.props.addComment}
                handleCommentChange={this.props.handleCommentChange}
              />
            )}
          {this.props.comments.map((reply, index) => {
            if (reply.parentComment === this.props.reply.commentId) {
              return (
                <ul key={index} style={{ listStyle: "none" }} className="pl-3">
                  <CommentReplies
                    reply={reply}
                    currentUser={this.props.currentUser}
                    addComment={this.props.addComment}
                    handleCommentChange={this.props.handleCommentChange}
                    comments={this.props.comments}
                    currentUser={this.props.currentUser}
                    showReplyInput={this.props.showReplyInput}
                    currentReply={this.props.currentReply}
                    showReply={this.props.showReply}
                    removeComment={this.props.removeComment}
                    showAllComments={this.props.showAllComments}
                  />
                </ul>
              );
            }
          })}
        </li>
      </React.Fragment>
    );
  }
}

export default CommentReplies;
