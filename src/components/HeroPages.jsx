import { Link } from "react-router-dom";
import "../styles/login.css";

function HeroPages({ name }) {
  return (
    <>
      <section className="bg-image h-full">
        <div className=""></div>
        <div className="container">
          <div className="hero-pages__text">
            <h3>{name}</h3>
            <p>
              <Link to="/">Home</Link> / {name}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroPages;
