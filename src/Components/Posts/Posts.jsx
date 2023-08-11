import { useState, useEffect } from 'react'
import { Card, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { allComment, getComment, postComment } from '../../States/commentState';
import { nanoid } from '@reduxjs/toolkit';
import './Post.css'





const Posts = ({ title, content, category, cover, author, id, }) => {

  const dispatch = useDispatch();
  const comments = useSelector(allComment).comments;

  const [showModal, setShowModal] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [showAuthorDetails, setShowAuthorDetails] = useState(false);
  const [currentAuthorId, setCurrentAuthorId] = useState(null)

  const handleCloseModal = () => setShowModal(false);

  const handleOpenModal = (postId) => {
    setCurrentPostId(postId);
    setShowModal(true);
    dispatch(getComment(id))
  }


  const handleChangeComment = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();

    dispatch(postComment({ postId: id, payload: { content: newComment } }))
      .then(() => {
        setNewComment("");
        dispatch(getComment(id));
      })
  }

  const handleAuthor = (authorId) => {
    setCurrentAuthorId(authorId);
    console.log("Current Author ID:", authorId);
  };

  return (
    <>
      <Container>
        <Row>
          <Col xs={12} md={6} >
            <div className="card-container">
              <div className="card-image">
                <img src={cover} alt="immagine Post" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div className="card-content">
                <div className="card-title">{title}</div>
                <div
                  className="card-text author"
                  onClick={() => handleAuthor(author._id)}
                >{"di " + author.nome + " " + author.cognome}
                </div>
                <div className="card-text">{category}</div>
                <div className="card-text">{content}</div>
                <div onClick={() => handleOpenModal(id)}>
                  <FontAwesomeIcon icon={faComment} />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton className='modal-login-header'>
          <Modal.Title>Commenti</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {comments && comments.map((comment) => (
            <div
              className='comment'
              key={comment._id}>
              <em>{comment.content}</em>
            </div>
          ))}
          <form onSubmit={handleSubmitComment}>
            <div className="mb-3">
              <label htmlFor="commentInput" className="form-label">
                Inserisci un nuovo commento:
              </label>
              <input
                type="text"
                className="form-control"
                id="commentInput"
                value={newComment}
                onChange={handleChangeComment}
              />
            </div>
            <button type="submit" className="modal-buttons-color ">
              Invia
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Posts
