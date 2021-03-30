import React from "react";
import "./footer.css";

let width = 22;
let height = 25;

let whatsapp = `https://wa.me/233245086885 `;
let facebook = `https://www.facebook.com/Okukus-Marketplace-108501647170509/`;
let twitter = `https://twitter.com/okukus_com `;

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_wrapper ">
        <div className="company_overview ">
          <h5>Company Overview</h5>

          <p>
            Online marketplace for shops with a wide selection of books,
            magazines & just about anything else.
          </p>
        </div>

        <div className="mission ">
          <h5>Mission</h5>
          <p>
            Our aim is to be the digital marketplace for local and physical
            shops. We are a total customer focused company.
          </p>
        </div>

        <div className="visit ">
          <h5>Visit Our Office</h5>
          <p>
            OKUKUS
            <br />
            Community 1, Site 4, F7 Tema
            <br />
            <span className="d-none d-sm-block ">+233 30 321 7258</span>
          </p>
        </div>

        <div className="reach ">
          <h5>Reach out</h5>

          <div className="social-media">
            <div className="whatsapp">
              <a
                href={whatsapp}
                tccltracking="click"
                typography="ButtonAlpha"
                rel="noopener noreferrer"
                data-ux="Button"
                target="_blank"
                data-aid="CONTACT_INFO_WHATS_APP_REND"
                data-route="whatsApp"
                data-tccl="ux2.contact.whatsapp.click,click"
              >
                <svg
                  fill="currentColor"
                  className="bi bi-whatsapp"
                  viewBox="0 0 16 16"
                  id="whatsapp"
                  xmlns="http://www.w3.org/2000/svg"
                  width={width}
                  height={height}
                >
                  <path d="M13.601 2.326A7.854 7.854 0 007.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 003.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0013.6 2.326zM7.994 14.521a6.573 6.573 0 01-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 01-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 014.66 1.931 6.557 6.557 0 011.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 00-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />{" "}
                </svg>
              </a>
            </div>

            <div className="facebook">
              <a href={facebook}>
                <svg
                  fill="currentColor"
                  className="bi bi-facebook"
                  viewBox="0 0 16 16"
                  id="facebook"
                  xmlns="http://www.w3.org/2000/svg"
                  width={width}
                  height={height}
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />{" "}
                </svg>
              </a>
            </div>

            <div className="twitter">
              <a href={twitter}>
                <svg
                  fill="currentColor"
                  className="bi bi-twitter"
                  viewBox="0 0 16 16"
                  id="twitter"
                  xmlns="http://www.w3.org/2000/svg"
                  width={width}
                  height={height}
                >
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0016 3.542a6.658 6.658 0 01-1.889.518 3.301 3.301 0 001.447-1.817 6.533 6.533 0 01-2.087.793A3.286 3.286 0 007.875 6.03a9.325 9.325 0 01-6.767-3.429 3.289 3.289 0 001.018 4.382A3.323 3.323 0 01.64 6.575v.045a3.288 3.288 0 002.632 3.218 3.203 3.203 0 01-.865.115 3.23 3.23 0 01-.614-.057 3.283 3.283 0 003.067 2.277A6.588 6.588 0 01.78 13.58a6.32 6.32 0 01-.78-.045A9.344 9.344 0 005.026 15z" />{" "}
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        &#169; Copyright {new Date().getFullYear()}. All rights reserved. Okukus
      </div>
    </div>
  );
};

export default Footer;
