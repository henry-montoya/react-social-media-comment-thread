import React from "react";
import { Button, Textarea } from "reactstrap";

class CommentForm extends React.Component {
  render() {
    return (
      <div className="mt-0 mb-0 pt-1 pb-1">
        <form>
          <div className="row justify-content-center">
            <div className="col-md-1 mr-1">
              <img
                src={this.props.currentUser && this.props.currentUser.avatarUrl}
                style={{ height: "35px", width: "35px", borderRadius: "50%" }}
                className="img-circle"
              />
            </div>
            <div className="col-md-8 pl-3 mr-0">
              <textarea
                required
                value={this.props.newComment}
                disabled={this.props.showReplyInput && "true"}
                onChange={this.props.handleCommentChange}
                rows="1"
                style={{
                  borderRadius: "15px",
                  width: "100%",
                  resize: "none",
                  outline: "0",
                  padding: "7px"
                }}
                placeholder="Write a comment..."
              />
            </div>
            <div className="col-md-2 ml-0 pl-0">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.props.addComment}
                disabled={(this.props.showReplyInput || this.props.newComment === "") && "true"}
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default CommentForm;
