import facebook from '../../assets/images/facebook.png';
import instagram from '../../assets/images/instagram.png';

function Footer() {
  return (
    <footer>
      <div className="foter">
        <p>© 2025 Davas Studio</p>

        <div className="footerlinks">
          <h3>Information</h3>

          <ul>
            <li>
              <a href="#">Terms of Use</a>
            </li>

            <li>
              <a href="#">Payment Method</a>
            </li>

            <li>
              <a href="#">Data protection</a>
            </li>
          </ul>
        </div>

        <div className="footerlinks1">
          <h3>Customer Support</h3>

          <ul>
            <li>
              <a href="#">Contact</a>
            </li>

            <li>
              <a href="#">Help</a>
            </li>

            <li>
              <a href="#">FAQ</a>
            </li>
          </ul>
        </div>

        <div className="footercontact">
          <a href="#">
            <img src={facebook} alt="facebook" />
          </a>

          <a href="#">
            <img src={instagram} alt="instagram" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
