/* eslint-disable no-unused-vars */
// File: src/pages/HomePage.jsx
import React from 'react';

const HomePage = () => {
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Welcome to SquVault</h1>

            <p className="lead text-center">
                Dive into the world of Capture The Flag (CTF) challenges and sharpen your skills in cybersecurity!
            </p>

            <section className="mt-5">
                <h2>What is a CTF?</h2>
                <p>
                    Capture The Flag (CTF) competitions are cybersecurity challenges where participants solve a series of tasks
                    to find hidden pieces of information, known as flags. These flags are concealed within various challenges,
                    requiring participants to use skills in areas like cryptography, reverse engineering, web exploitation, and
                    digital forensics. Each challenge completed reveals a flag, adding points to your score and advancing you up the leaderboard!
                </p>
            </section>

            <section className="mt-5">
                <h2>About SquVault</h2>
                <p>
                    SquVault is your ultimate CTF platform, where you can explore diverse, well-crafted challenges in a variety of categories.
                    Whether you are a beginner or a seasoned pro, SquVault offers an engaging environment to test your skills, improve
                    your knowledge, and join a community of cybersecurity enthusiasts.
                </p>
                <p>
                    Our challenges are designed to help you practice real-world scenarios and develop a deeper understanding
                    of cybersecurity principles. Join us and see if you can capture the vault!
                </p>
            </section>

            <section className="mt-5">
                <h2>Flag Format</h2>
                <p>
                    Each challenge in SquVault has a unique flag hidden within it. Once you find the flag, submit it to earn points
                    and gain recognition on the leaderboard. Flags in SquVault follow the format:
                </p>
                <pre className="bg-light p-3 border rounded text-center">SQU&#123;Here_is_the_flag&#125;</pre>
                <p className="text-muted text-center">Replace <code>Here_is_the_flag</code> with the actual flag you discover.</p>
            </section>

            <section className="mt-5 text-center">
                <h3>Ready to take on the challenge?</h3>
                <a href="/challenges" className="btn btn-primary mt-3">Get Started</a>
            </section>
        </div>
    );
};

export default HomePage;
