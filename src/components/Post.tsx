import React, { useState } from 'react';
import { Card, Container, Row, Col, Carousel } from 'react-bootstrap';
import Comments from './Comments';
import AddComment from './AddComment';
import ShowComments from './ShowComments';

export interface IPost {
  _id: string;
  title: string;
  location: string;
  description: string;
  photos: string[];
  userId: string;
}

interface PostProps {
  post: IPost;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [commentAdded, setCommentAdded] = React.useState(false);

  const handleCommentAdded = () => {
    setCommentAdded((prev) => !prev);
  };


  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={8} xl={6}>
          <Card className="mb-4 shadow-sm">
            <Carousel interval={null}>
              {post.photos.map((photo, index) => (
                <Carousel.Item key={index}>
                  <img className="d-block w-100" src={photo} alt={`Slide ${index}`} />
                </Carousel.Item>
              ))}
            </Carousel>
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted">
                {`By ${post.userId}`}
              </Card.Subtitle>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.description}</Card.Text>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <i className="fas fa-map-marker-alt text-muted mr-2"></i>
                  {" " + post.location}
                </div>
                <div className="text-end">
                  <ShowComments postId={post._id} />
                  <AddComment postId={post._id} onCommentAdded={handleCommentAdded} />
                </div>
              </div>
            </Card.Body>
            <Comments postId={post._id} key={commentAdded ? 'new' : 'old'} />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Post;