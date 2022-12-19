import { useEffect, useState } from "react";
import { fetchImages } from "./api";

function Header() {
    return (
      <header className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">日本大学文理学部情報科学科Webプログラミングの演習課題</h1>
            <h1 className="title">三谷涼輔　2021040251400580</h1>
            <h2>ここでは柴犬・鳥・猫の画像を見ることができます。(本来は"動物の種類"と"画像表示枚数"で検索できるようにしたかったができなかったのでは5枚画像表示枚数は5枚とした。)</h2>
          </div>
        </div>
      </header>
    );
  }
  
  function Image(props) {
    return (
      <div className="card">
        <div className="card-image">
          <figure className="image">
          <img src={props.src} alt="cute dog" />
          </figure>
        </div>
      </div>
    );
  }
  
  function Loading() {
    return <p>Loading...</p>;
  }

  function Gallery(props) {
    const { urls } = props;
    if (urls == null) {
        return <Loading />;
    }
    return (
      <div className="columns is-vcentered is-multiline">
       {urls.map((url) => {
        return (
          <div key={url} className="column is-3">
            <Image src={url} />
          </div>
        );
      })} 
      </div>
    );
  }
  
  function Form(props) {
    function handleSubmit(event) {
      event.preventDefault();
      const { animal } = event.target.elements;
      const { count } = event.target.elements;
      props.onFormSubmit(animal.value);
    }
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="field has-addons">
            <div className="control is-expanded">
              <div className="select is-fullwidth">
                <select name="animal" defaultValue="shibes">
                  <option value="shibes">Shibe</option>
                  <option value="cats">Cats</option>
                  <option value="birds">Birds</option>
                </select>
              </div>
            </div>
            <div className="control">
              <button type="submit" className="button is-primary">
                検索
              </button>
            </div>
          </div>
        </form>

      </div>
    );
  }

  function Main() {
    const [urls, setUrls] = useState(null);
    useEffect(() => {
      fetchImages("shibes").then((urls) => {
        setUrls(urls);
      });
    }, []);
    function reloadImages(animal,count) {
        fetchImages(animal,count).then((urls) => {
          setUrls(urls);
        });
      }
    return (
      <main>
        <section className="section">
          <div className="container">
          <Form onFormSubmit={reloadImages} />
          </div>
        </section>
        <section className="section">
          <div className="container">
            <Gallery urls={urls} />
          </div>
        </section>
      </main>
    );
  }
  
  function Footer() {
    return (
      <footer className="footer">
        <div className="content has-text-centered">
          <p>Joke sentences are retrieved from shibe.online</p>
          <p>
            <a href="https://shibe.online/">Donate to shibe.online</a>
          </p>
        </div>
      </footer>
    );
  }
  
  function App() {
    return (
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
  
  export default App;