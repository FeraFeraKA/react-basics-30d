const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <p>&copy; {year}</p>
      </div>
    </footer>
  );
};

export default Footer;
