/* eslint-disable no-unused-vars */
// File: src/pages/AboutUs.jsx
import React from 'react';

const AboutUs = () => {
    return (
        <div className="container mt-5">
            <div className="text-center mb-5">
                <h1 className="display-4" style={{ fontWeight: 'bold', color: '#007bff' }}>About SquVault</h1>
                <p className="text-muted" style={{ fontSize: '1.2rem' }}>
                    SquVault is a platform dedicated to providing engaging and educational Capture The Flag (CTF) challenges to enhance your cybersecurity skills.
                </p>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card mb-4 shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title">Our Mission</h2>
                            <p className="card-text">
                                SquVault is designed to help enthusiasts and professionals alike to practice and hone their cybersecurity skills through hands-on challenges.
                                Our platform offers a variety of challenges covering different aspects of cybersecurity, tailored for both beginners and advanced users.
                            </p>
                        </div>
                    </div>

                    <div className="card mb-4 shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title">Meet the Creator</h2>
                            <p className="card-text">
                                <strong>Ahmed Sadiq Al-Gharibi</strong>, a student at Sultan Qaboos University, is the creator of SquVault. With a passion for cybersecurity and a commitment to helping others learn,
                                Ahmed has developed this platform to bring the excitement and challenges of Capture The Flag events to a wider audience.
                            </p>
                        </div>
                    </div>

                    <div className="card mb-4 shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title">Our Inspiration</h2>
                            <p className="card-text">
                                The inspiration behind SquVault is drawn from the AMAN CTF platform, which provided a foundation for creating engaging and diverse challenges.
                                SquVault builds on this inspiration, adding unique challenges and a welcoming environment for all cybersecurity enthusiasts.
                            </p>
                        </div>
                    </div>

                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title">Why Choose SquVault?</h2>
                            <ul className="list-unstyled">
                                <li>✓ Real-world inspired challenges</li>
                                <li>✓ Skill-building for both beginners and professionals</li>
                                <li>✓ Community-driven development and continuous updates</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
