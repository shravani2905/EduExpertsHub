import "./Footer.css";
function Footer() {
  return (
    <div className="footer">
      <div className="Userinfo">
        <ul>
          <b> USER INFORMATION</b>
          <li>Account</li>
          <li>Profile</li>
          <li>Rewards Program</li>
          <li>Refer a Friend</li>
          <li>Newsletter Subscription</li>
        </ul>
      </div>
      <div className="Connect">
        <ul>
          <b>CONNECT WITH US</b>
          <li>Follow Us on Social Media</li>
          <li>Subscribe to Newsletter</li>
          <li>Blog</li>
          <li>Careers</li>
          <li>Affiliate Program</li>
        </ul>
      </div>
      <div className="about">
        <ul>
          <b> ABOUT US</b>
          <li>Our Story</li>
          <li>Mission & Values</li>
          <li>Press</li>
          <li>Collaborations</li>
          <li>Reviews</li>
        </ul>
      </div>
    </div>
  );
}
export default Footer;