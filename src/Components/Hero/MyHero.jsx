import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import './MyHero.css';
import Container from 'react-bootstrap/Container';

const MyHero = () => {


  return (
    <Container>
      <div className="carousel-container text-center">
        <Carousel className="custom-carousel">
          <Carousel.Item>
            <img
              className="d-block w-100 immageCarousel"
              src="https://img.freepik.com/free-photo/toy-bricks-table-with-word-blog_144627-47465.jpg?w=1380&t=st=1690405908~exp=1690406508~hmac=66679fdcb9799dfcdfce7a0786736d18a9e2dc08754fc5c302c73b267e71d421"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 immage-size"
              src="https://testipiu.it/wp-content/uploads/2018/10/O7MF5N0.jpg"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3></h3>
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://img.freepik.com/free-photo/handwriting-paper-fountain-pen-success-generated-by-ai_188544-53402.jpg?w=1380&t=st=1690456379~exp=1690456979~hmac=7462d25d35b2384f6b3df4f63b5cc106dd89520bdea6d70d214a337fe9c4bcf6"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3></h3>
              <p>
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </Container>
  );
};

export default MyHero;


