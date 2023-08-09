import React from 'react';
import './Home.css';
import Showcase from '../Showcase/Showcase';

const Home = () => {

    const homeBg = {
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1651%26quot%3b)' fill='none'%3e%3cpath d='M 0%2c241 C 144%2c294.8 432%2c551.2 720%2c510 C 1008%2c468.8 1296%2c130 1440%2c35L1440 560L0 560z' fill='rgba(244%2c 184%2c 183%2c 1)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1651'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    }

    return (
        <div>
             <div style={homeBg}>
                    <Showcase></Showcase>
            </div>
        </div>
    );
};

export default Home;