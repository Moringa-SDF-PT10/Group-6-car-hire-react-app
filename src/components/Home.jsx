const Home = () => {
  return (
    <>
    <div>
      <h1>Welcome to the Car Hire App 🚗</h1>
      <p>Select a car to book or log in as admin to manage cars and users.</p>
    </div>
    <div>
        <h2>Available Cars</h2>
        <ul>
            <li><a href="/book/1">Book Car 1</a></li>
            <li><a href="/book/2">Book Car 2</a></li>
            <li><a href="/book/3">Book Car 3</a></li>
        </ul>
        {/* Add more cars as needed */}
    </div>
    <div>
      <h2>Admin Login</h2>
      <p>If you are an admin, please log in to manage cars and users.</p>
      <a href="/admin/login">Admin Login</a>
    </div>
    <div>
        <h2>Bookings</h2>
        <p>View and manage your bookings here.</p>
        <a href="book/:id">View Bookings</a>
    </div>
    </>
  );
};

export default Home;
