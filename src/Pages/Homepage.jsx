import React from 'react'
import CustomNavbar from '../Components/Navbar/CustomNavbar'
import MyHero from '../Components/Hero/MyHero'
import ContainerPosts from '../Components/Posts/ContainerPosts'
import AuthorsLateralNav from '../Components/Author/AuthorsLateralNav'
import Facilities from '../Components/Facilities/Facilities'
import Footer from '../Components/Footer/Footer';
import { useSession } from '../Middlewares/ProtectedRoutes'



const Homepage = () => {

  const session = useSession();



  return (
    <>
      <CustomNavbar />
      <AuthorsLateralNav />
      <Facilities />
      <MyHero />
      <ContainerPosts />
      <Footer />
    </>
  )
}

export default Homepage
