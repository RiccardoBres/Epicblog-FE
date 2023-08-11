import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Posts from "./Posts";
import { getPost } from "../../States/postState";
import { nanoid } from '@reduxjs/toolkit';
import { FormControl } from 'react-bootstrap';

const ContainerPosts = () => {

  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]); 
  const posts = useSelector((state) => state.postState.posts);
  console.log(posts);

  useEffect(() => {
    dispatch(getPost());
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value === '') {
      setFilteredPosts([]); // Ripristina l'array filtrato quando il valore di ricerca è vuoto
    }
  };

  const handleSearch = () => {
    if (searchValue) {
      const filtered = posts.filter((post) => post.title.toLowerCase().includes(searchValue.toLowerCase()));
      setFilteredPosts(filtered);
      setSearchValue("");
    } else {
      setFilteredPosts([]); // Ripristina l'array filtrato se la ricerca è vuota
    }
  };

  return (
    <>
      <Container fluid className='mb-5'>
        <Row className='d-flex justify-content-center flex-wrap'>
          <Col sm={12} md={8}>
            <div className='em-position'>
              <em className='text-center mt-5' style={{ fontSize: '34px' }}>
                Articoli in evidenza
              </em>
            </div>
            <div className='d-flex my-5'>
              <FormControl
                type="search"
                placeholder="Trova un articolo"
                className="me-2"
                onChange={handleInputChange}
              />
              <Button variant="outline-success" onClick={handleSearch}>
                Cerca
              </Button>
            </div>
            <hr className="hr-container-width" />
            <Row className='d-flex justify-content-center'>
              {filteredPosts.length > 0 ?
                filteredPosts.map((post) => (
                  <Col key={nanoid()} sm={12} md={6} lg={4} className='d-flex justify-content-center gap-3'>
                    <Posts
                      title={post.title}
                      author={post.author}
                      category={"Categoria: " + post.category}
                      cover={post.cover}
                      content={post.content}
                      id={post._id}
                      authorId={post.author._id}
                    />
                  </Col>
                )) :
                posts.map((post) => ( // Utilizza tutti i post se la ricerca è vuota
                  <Col key={nanoid()} sm={12} md={6} lg={4} className='d-flex justify-content-center gap-3'>
                    <Posts
                      title={post.title}
                      author={post.author}
                      category={"Categoria: " + post.category}
                      cover={post.cover}
                      content={post.content}
                      id={post._id}
                      authorId={post.author._id}
                    />
                  </Col>
                ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ContainerPosts;
