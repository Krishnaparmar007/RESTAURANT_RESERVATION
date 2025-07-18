
import React from "react";

const Dishes = () => {
  return ( 
    
<div >
<h1>Our Menu</h1>
  <div>
  <h1 style={{
  fontSize: '75px',
  fontWeight: 'bold',
  marginBottom: '20px',
  textAlign: 'center',
  color: '#111',
  textShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
}}>
 
</h1>

      <div className="flex flex-wrap gap-8 justify-center">
      <img src="./eatry.jpg" alt="Tasty Dish" style={{
  display: 'block',
  margin: 'auto',
  width: '50%',
  height: '20vh',
  objectFit: 'cover',
}}/>
  <h1 style={{
  fontSize: '80px',
  fontWeight: 'bold',
  marginBottom: '20px',
  textAlign: 'center',
  color: '#111',
  textShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
}}>
  <center>The Family Restaurant</center>
</h1>

      <img src="./menu1.jpg" alt="Tasty Dish" />
      <img src="./menu2.jpg" alt="Tasty Dish"  />
      <img src="./menu3.jpg" alt="Tasty Dish" />
      <img src="./menu4.jpg" alt="Tasty Dish"/>
      </div>
    </div>
    </div>
    
    
  );
};

export default Dishes;

