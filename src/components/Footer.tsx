
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-600 py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          <div>
            <h3 className="text-lg font-semibold mb-3">LU CSC Code Championships</h3>
            <p className="text-blue-100">
              An annual coding competition organized by the Lebanese University Computer Science Club.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Button variant="link" className="text-blue-100 hover:text-white p-0" asChild>
                  <div onClick={() => navigate("/")}>Home</div>
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-blue-100 hover:text-white p-0" asChild>
                  <div onClick={() => navigate("/leaderboard")}>Leaderboard</div>
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-blue-100 hover:text-white p-0" asChild>
                  <div onClick={() => navigate("/register")}>Register Team</div>
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-blue-100 hover:text-white p-0" asChild>
                  <div onClick={() => navigate("/quiz")}>Practice Quiz</div>
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-blue-100 hover:text-white p-0" asChild>
                  <div onClick={() => navigate("/typing")}>Typing Challenge</div>
                </Button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
            <p className="text-blue-100">
              Have questions about the competition?
              <br />
              Email us at: <a href="mailto:contact@lucsc.org" className="underline hover:text-white">contact@lucsc.org</a>
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-blue-500 text-center text-blue-100">
          <p>&copy; {currentYear} LU CSC Code Detective Championships. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
