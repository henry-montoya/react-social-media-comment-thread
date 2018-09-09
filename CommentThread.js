import React from "react";
import CommentForm from "./CommentForm";
import CommentReplies from "./CommentReplies";

class CommentThread extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <ul className="pl-0" style={{ listStyle: "none" }}>
                {this.props.comments.length > 3 &&
                  this.props.showAll && (
                    <div className="row justify-content-end">
                      <div className="col-md-6">
                        <a href="#" onClick={this.props.toggleShowAll}>
                          hide comments...
                        </a>
                      </div>
                    </div>
                  )}
                {this.props.comments.map((comments, index) => {
                  if (comments.parentComment === null) {
                    return (
                      <React.Fragment key={index}>
                        {this.props.comments.length > 2 &&
                          !this.props.showAll &&
                          comments.commentKey === 2 && (
                            <div className="row justify-content-end" key={comments.commentId}>
                              <div className="col-md-7">
                                <a href="#" onClick={this.props.toggleShowAll}>
                                  view previous comments...
                                </a>
                              </div>
                            </div>
                          )}
                        {(comments.commentKey < 3 || this.props.showAll) && (
                          <li className="pl-0" style={{ listStyle: "none" }}>
                            <div className="row mt-1">
                              <div className="col-md-1 mr-3">
                                <img
                                  src={comments.userAvatar}
                                  style={{ height: "35px", width: "35px", borderRadius: "50%" }}
                                  className="img-circle ml-0"
                                />
                              </div>
                              <div
                                className="col-md-7 mr-0"
                                style={{ backgroundColor: "rgb(225, 227, 232)", borderRadius: "20px", padding: "2%" }}
                              >
                                <p style={{ overflowWrap: "break-word" }}>
                                  <b>{comments.username}</b>
                                  &nbsp;&nbsp;
                                  {comments.comment}
                                </p>
                              </div>
                              <div className="col-md-3">
                                <div className="row mb-0">
                                  <div className="col-md-12">
                                    <h6 style={{ fontSize: "xx-small" }}>{comments.dateCreated}</h6>
                                  </div>
                                </div>
                                {comments.user !== null && (
                                  <div className="row">
                                    <div className="col-md-12">
                                      <a href="#" onClick={this.props.showReply} name={comments.commentId}>
                                        {this.props.showReplyInput && this.props.currentReply === comments.commentId
                                          ? "cancel"
                                          : "reply"}
                                      </a>
                                    </div>
                                  </div>
                                )}
                                {this.props.currentUser.id === comments.user &&
                                  comments.user !== null && (
                                    <div className="row">
                                      <div className="col-md-12">
                                        <a href="#" onClick={this.props.removeComment} name={comments.commentId}>
                                          delete
                                        </a>
                                      </div>
                                    </div>
                                  )}
                              </div>
                            </div>

                            {this.props.showReplyInput &&
                              this.props.currentReply === comments.commentId && (
                                <CommentForm
                                  currentUser={this.props.currentUser}
                                  addComment={this.props.addComment}
                                  handleCommentChange={this.props.handleCommentChange}
                                  newComment={this.props.newComment}
                                />
                              )}
                            <div className="row justify-content-end">
                              <div className="col-md-12">
                                <ul style={{ listStyle: "none" }} className="pl-3">
                                  {this.props.comments.map((reply, index) => {
                                    if (reply.parentComment === comments.commentId) {
                                      return (
                                        <CommentReplies
                                          key={index}
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
                                          showAll={this.props.showAll}
                                          //confirmDelete={this.props.confirmDelete}
                                        />
                                      );
                                    }
                                  })}
                                </ul>
                              </div>
                            </div>
                          </li>
                        )}
                      </React.Fragment>
                    );
                  }
                })}
              </ul>
            </div>
          </div>
        </div>
        {!this.props.showReplyInput && (
          <ul className="pl-0" style={{ listStyle: "none" }}>
            <li className="pl-0" style={{ listStyle: "none" }}>
              <CommentForm
                showReplyInput={this.props.showReplyInput}
                currentUser={this.props.currentUser}
                addComment={this.props.addComment}
                handleCommentChange={this.props.handleCommentChange}
                newComment={this.props.newComment}
              />
            </li>
          </ul>
        )}
      </React.Fragment>
    );
  }
}

export default CommentThread;
