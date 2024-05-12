import React, { useState, useEffect } from 'react';
import "../Sptilization/index.css"
function Index() {
    const [currentImage, setCurrentImage] = useState(0);
    
    const images = [
        'https://media.post.rvohealth.io/wp-content/uploads/2020/08/Doctors_For_Men-732x549-thumbnail.jpg',
        'https://familydoctor.org/wp-content/uploads/2018/02/41808433_l.jpg'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
        }, 2000);
        
        return () => clearInterval(interval);
    }, [currentImage, images.length]);

    return (
        <div className="image-container">
            <img src={images[currentImage]} alt={`image ${currentImage + 1}`} />
        </div>
    );
}

export default Index;
