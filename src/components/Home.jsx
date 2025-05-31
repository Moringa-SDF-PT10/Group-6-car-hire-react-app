
import { Link } from 'react-router-dom';


const Home = () => {


  return (
    <>
     <div> 
      <h1>Welcome to the Car Hire App 🚗</h1>
     <nav>
        <Link to="/car" style={{ color: 'black', textDecoration: 'none' }}>
          Booking
        </Link>
        <Link to="/admin/login" style={{ color: 'black', textDecoration: 'none' }}>
          Admin
        </Link>
      </nav>


    </div>
    </>
  );
}; 

export default Home;
