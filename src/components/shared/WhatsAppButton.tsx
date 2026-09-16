const WHATSAPP_NUMBER = "917995328191"; // +91 79953 28191 (no spaces or +)
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello! I’m interested in AEI’s Automatic Fire Detection & Suppression Systems. Please share more information about the suitable system for my equipment."
);

export const WhatsAppButton = () => {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="whatsapp-float"
    >
      {/* WhatsApp SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="currentColor"
        className="whatsapp-icon"
      >
        <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.472 2.027 7.774L0 32l8.481-2.001A15.934 15.934 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.25a13.22 13.22 0 0 1-6.738-1.842l-.483-.287-4.993 1.178 1.23-4.857-.317-.5A13.183 13.183 0 0 1 2.75 16C2.75 8.682 8.682 2.75 16 2.75S29.25 8.682 29.25 16 23.318 29.25 16 29.25zm7.26-9.872c-.397-.199-2.35-1.16-2.714-1.292-.364-.133-.629-.199-.894.199-.265.398-1.027 1.292-1.258 1.558-.232.265-.464.298-.861.1-.397-.2-1.677-.618-3.194-1.972-1.18-1.053-1.977-2.353-2.208-2.75-.232-.398-.025-.613.174-.811.179-.178.397-.464.596-.696.199-.231.265-.397.397-.662.133-.265.066-.497-.033-.696-.1-.199-.894-2.155-1.225-2.95-.323-.775-.65-.67-.894-.682l-.762-.013c-.265 0-.695.099-1.059.497-.364.398-1.391 1.36-1.391 3.316s1.424 3.847 1.622 4.112c.199.265 2.8 4.274 6.784 5.993.948.409 1.688.653 2.265.836.951.302 1.817.26 2.501.157.763-.113 2.35-.96 2.681-1.888.33-.928.33-1.723.232-1.888-.099-.165-.364-.265-.762-.464z" />
      </svg>
      <span className="whatsapp-label">Chat with us</span>
    </a>
  );
};
