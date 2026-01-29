const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div>
        <p>© {year}</p>
      </div>
    </footer>
  );
};

export default Footer;
