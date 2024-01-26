import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Carousel } from 'react-bootstrap';
import { apiClient, cancelRequest } from '../utils/apiClient';

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


const Post = ({ post }: PostProps) => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={8} xl={6}> {/* Adjusted for a narrower card */}
          <Card className="mb-4 shadow-sm">
          <Carousel interval={null}>
              {post.photos.map((photo, index) => (
                <Carousel.Item key={index}>
                  <img className="d-block w-100" src={photo} alt={`Photo ${index + 1}`} />
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
                  <span className="align-middle">{" " + post.location}</span>
                </div>
                <div style={{ cursor: 'pointer' }}>
                  <i className="fas fa-comment text-muted mr-2"></i>
                  <span className="align-middle"> Comment (52)</span> {/* Replace with dynamic comment count */}
                </div>
              </div>
              <div className="mt-2 d-flex justify-content-end">
                <div style={{ cursor: 'pointer' }}>
                  <i className="fas fa-plus mr-2"></i>
                  <span className="align-middle"> Add comment</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Post;
