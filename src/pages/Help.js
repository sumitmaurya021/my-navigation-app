import React, { useState } from 'react'; // Import React
import { motion, AnimatePresence } from 'framer-motion'; // Import Framer Motion
import './Help.css'; // Make sure to import your CSS for styles

function Help() {
  // State to manage modal visibility and data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ title: '', content: '', steps: [], image: '' });

  // FAQ data
  const faqData = [
    {
      title: "Reset Password",
      content: "To reset your password, follow these steps:",
      steps: [
        "Go to the login page.",
        "Click on 'Forgot Password'.",
        "Enter your registered email and submit.",
        "Check your email for the reset link.",
        "Follow the link to reset your password."
      ],
      image: "https://media.istockphoto.com/id/638770456/photo/reset-password-computer-monitor-button.jpg?s=612x612&w=0&k=20&c=Ql-G5EGAfqopaCQtBIlctc0tJQkrCcoyzkjaqduulP0="
    },
    {
      title: "Contact Customer Support",
      content: "You can contact our customer support team by following these steps:",
      steps: [
        "Go to the 'Contact Us' page.",
        "Fill out the contact form with your issue details.",
        "You can also directly email us at support@example.com."
      ],
      image: "https://media.istockphoto.com/id/1004108910/photo/woman-customer-service-agents-working-in-call-center.jpg?s=612x612&w=0&k=20&c=wEU1FC8xvzCDId0aK86zEi0CaFAw8Azct-X3rtpDh38="
    },
    {
      title: "Find Purchase History",
      content: "To find your purchase history:",
      steps: [
        "Log in to your account.",
        "Navigate to 'My Account'.",
        "Go to the 'Orders' section.",
        "You will find a detailed history of all your purchases."
      ],
      image: "https://shippingeasy.com/wp-content/uploads/2017/05/Blog-Illustration-3-Types-of-eCommerce-Purchase-History-Campaigns-01.png"
    }
  ]; // Array of FAQ data 

  // Function to open the modal with the clicked FAQ's data
  const openModal = (faq) => {
    setModalData(faq); // Set the modal data to the clicked FAQ
    setIsModalOpen(true); // Open the modal
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false); // Set modal visibility to false
  };

  return (
    <div className="help-container"> {/* Main container for Help page */}
      <motion.h1 
        className="help-heading" 
        initial={{ opacity: 0, y: -20 }}  // Initial opacity and position for heading
        animate={{ opacity: 1, y: 0 }}    // Animate to visible position
        exit={{ opacity: 0, y: -20 }}      // Exit animation
        transition={{ duration: 0.5 }}      // Animation duration
      >
        How can we assist you? {/* Main heading */}
      </motion.h1>

      <motion.p 
        className="help-description" 
        initial={{ opacity: 0, y: -20 }} // Initial state for description
        animate={{ opacity: 1, y: 0 }}   // Animate to visible state
        exit={{ opacity: 0, y: -20 }}     // Exit state
        transition={{ duration: 0.5, delay: 0.1 }} // Delay for description animation
      >
        Click on any question to view the detailed answer. {/* Description text */}
      </motion.p>

      <motion.div 
        className="faq-section" 
        initial={{ opacity: 0 }}          // Initial state for FAQ section
        animate={{ opacity: 1 }}          // Animate to visible state
        exit={{ opacity: 0 }}             // Exit state
        transition={{ duration: 0.5, delay: 0.2 }} // Delay for section animation
      >
        <h2 className="faq-heading">Frequently Asked Questions</h2>
        {faqData.map((faq, index) => (
          <motion.div 
            className="faq-item" 
            key={index}                     // Unique key for each FAQ item
            onClick={() => openModal(faq)}  // Open modal with clicked FAQ
            initial={{ opacity: 0, y: 20 }} // Initial state for each FAQ item
            animate={{ opacity: 1, y: 0 }}  // Animate to visible state
            exit={{ opacity: 0, y: 20 }}    // Exit state
            transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered effect
            whileHover={{ scale: 1.03 }}     // Scale up on hover
            transitionHover={{ type: "spring", stiffness: 300 }} // Spring effect for hover
          >
            <h3 className="faq-question">{faq.title}</h3> {/* FAQ title */}
          </motion.div>
        ))}
      </motion.div>

      {/* Modal for displaying FAQ details */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="modal-overlay" // Overlay for modal background
            onClick={closeModal}      // Close modal on overlay click
            initial={{ opacity: 0 }}   // Initial state for overlay
            animate={{ opacity: 1 }}    // Animate to visible state
            exit={{ opacity: 0 }}       // Exit state
            transition={{ duration: 0.3 }} // Animation duration
          >
            <motion.div
              className="modal-content" // Content of the modal
              onClick={(e) => e.stopPropagation()} // Prevent closing modal on inner click
              initial={{ y: "-100vh", opacity: 0 }} // Initial position and opacity
              animate={{ y: 0, opacity: 1 }} // Animate to visible position
              exit={{ y: "100vh", opacity: 0 }} // Exit position and opacity
              transition={{ type: "spring", stiffness: 100, damping: 20 }} // Spring animation for modal
            >
              <span className="close-button" onClick={closeModal}>&times;</span> {/* Close button */}
              <h2 className="modal-title">{modalData.title}</h2> {/* Modal title */}
              <p className="modal-description">{modalData.content}</p> {/* Modal description */}

              <ul className="modal-steps"> {/* List of steps */}
                {modalData.steps.map((step, idx) => (
                  <li key={idx}>{step}</li> // List item for each step
                ))}
              </ul>

              {/* Image Display */}
              {modalData.image && (
                <img className="modal-image" src={modalData.image} alt={modalData.title} /> // Display image if present
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Help; // Exporting the Help component
