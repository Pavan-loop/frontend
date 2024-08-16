import React from "react";

const Home = () => {
  return (
    <div className="home-container">
      <nav>
        <div className="logo"> 
          <img src="LOGO.PNG" alt="ZeeCare Logo" />
        </div>
        <div className="nav">
          <ul>
            <li>Home</li>
            <li>Appointment</li>
            <li>About Us</li>
          </ul>
        </div>
        <div className="login">
          <button className="btn1">Login</button>
          <button className="btn2">Patient Login</button>
        </div>
      </nav>
      
      <section id="home" className="hero">
        <div className="hero-text">
          <h1>Welcome to ZeeCare Medical Institute | Your Trusted Healthcare Provider</h1>
          <p>ZeeCare Medical Institute is a state-of-the-art facility dedicated to providing comprehensive healthcare services with compassion and expertise. Our team of skilled professionals is committed to delivering personalized care tailored to each patient's needs. At ZeeCare, we prioritize your well-being, ensuring a harmonious journey towards optimal health and wellness.</p>
        </div>
        <div className="hero-image">
          <img src="hero.png" alt="Doctor" />
        </div>
      </section>

      <section id="about" className="about">
        <div className="about-content">
          <div className="about-image">
            <img src="about.png" alt="About Us" />
          </div>
          <div className="about-text">
            <h3>Biography</h3>
            <h2>Who We Are</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque maximus sapien sed ligula fringilla, vel aliquet urna fringilla. Integer ac lacus at quam bibendum ullamcorper. Vivamus suscipit sapien sit amet libero dapibus, vel feugiat dolor aliquet.</p>
            <p>We are working on a MERN STACK PROJECT. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque maximus sapien sed ligula fringilla, vel aliquet urna fringilla.</p>
          </div>
        </div>
      </section>

      <section id="departments" className="departments">
        <h2>Our Departments</h2>
        <div className="department-cards">
          <div className="card">
            <img src="pedia.jpg" alt="Pediatrics" />
            <h3>Pediatrics</h3>
          </div>
          <div className="card">
            <img src="ortho.jpg" alt="Orthopedics" />
            <h3>Orthopedics</h3>
          </div>
          <div className="card">
            <img src="cardi.png" alt="Cardiology" />
            <h3>Cardiology</h3>
          </div>
          <div className="card">
            <img src="neuro.jpg" alt="Neurology" />
            <h3>Neurology</h3>
          </div>
        </div>
      </section>

      <footer>
        <p>&copy; 2024 ZeeCare Medical Institute. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
