import { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap';
import CustomNavbar from '../Navbar/CustomNavbar';
import Footer from '../Footer/Footer';
import { createPost } from '../../States/postState';
import { useDispatch } from 'react-redux';
import { useSession } from '../../Middlewares/ProtectedRoutes';





const CreatePost = () => {

    const session = useSession();
    const dispatch = useDispatch()
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [cover, setCover] = useState('');

    const newPost = {
        title,
        content,
        category,
        cover,
        author: session.id, // Utilizza l'ID dell'utente corrente come autore del post
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPost({ payload: newPost }));
        setTitle('');
        setContent('');
        setCategory('');
        setCover('');
        console.log(newPost);
        console.log(session);
    };

    return (
        <>
            <CustomNavbar></CustomNavbar>
            <Container className='mt-5'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formTitle">
                        <Form.Label>Titolo</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Inserisci il titolo del post"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCategory">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Inserisci la categoria del post"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formContent">
                        <Form.Label>Contenuto</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            placeholder="Inserisci il contenuto del post"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCover">
                        <Form.Label>URL Copertina</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Inserisci l'URL dell'immagine di copertina"
                            value={cover}
                            onChange={(e) => setCover(e.target.value)}
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary">
                        Invia
                    </Button>
                </Form>
            </Container>
            <Footer></Footer>
        </>
    );
};

export default CreatePost
