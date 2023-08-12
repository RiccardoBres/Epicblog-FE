import React, { useState, useEffect } from 'react';
import './Author.css';
import { allPosts, getPost } from "../../States/postState";
import { useSelector, useDispatch } from 'react-redux';



const AuthorsLateralNav = () => {


  const [modalShow, setModalShow] = useState(false)
  const dispatch = useDispatch();
  const posts = useSelector(allPosts);
  console.log(posts);

  useEffect(() => {
    dispatch(getPost());
  }, []);

  const [showNavbar, setShowNavbar] = useState(false); // Mostra inizialmente la navbar

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 715; // Imposta l'altezza alla quale vuoi mostrare la navbar
      const scrollTop = window.scrollY;//Questa costante ottiene la posizione verticale dello scroll (scrollTop) della finestra del browser al momento dell'esecuzione della funzione handleScroll().
      setShowNavbar(scrollTop > scrollThreshold); // Mostra la navbar quando lo scroll è al di sotto dell'altezza specificata
    };

    window.addEventListener('scroll', handleScroll);

    return () => {//All'interno di questa funzione, viene rimosso il listener dell'evento di scroll, in modo da evitare perdite di memoria o problemi di prestazioni quando il componente non è più in uso.
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getUniqueAuthors = () => {/* Questa riga di codice controlla se posts è effettivamente un array.
  Se posts non è un array (o è un array vuoto o un valore non definito), la funzione restituisce un array vuoto [].
  Questa verifica è utile per garantire che la funzione non fallisca se posts non è una struttura dati valida. */
    if (!Array.isArray(posts)) {
      return [];
    }

    const uniqueAuthors = posts.reduce((authors, post) => {
      //La funzione some controlla se l'array authors contiene almeno un elemento che soddisfa la condizione specificata all'interno della funzione di callback.
      if (!authors.some((author) => author.nome === post.author.nome)) {
      //La condizione in questo caso confronta il nome dell'autore post.author.nome con il nome di ogni autore presente nell'array authors.
        authors.push(post.author);
      }
      return authors;
    }, []);
    return uniqueAuthors;
  };

  const authors = getUniqueAuthors();

  return (
    <>
    <div className={`navbar-author ${showNavbar ? 'show' : 'hide'}`}>
      <ul>
        <li className='li-auth'></li>
        <em className='em'>Autori</em>
        {authors.map((author) => (
          <li className='avatar li-auth' key={author.nome}>
            <img 
            className='text-center'
            src={author.avatar}/>
            {author.nome + " " + author.cognome}
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default AuthorsLateralNav;
