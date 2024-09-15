import React from 'react';
import InfoSection from '../../components/InfoSection/InfoSection';

function AboutUs() {
    return (
        <div className="content">
        <InfoSection
          title="Layla Scott"
          description="Senior in Computer Science @ Virgina Tech"
          imageSrc="/images/layla.jpg"
          isImageLeft={true}  // To align the image on the left side
        />
        <InfoSection
          title="Rayan Bouhal"
          description="Senior in Computer Science @ Virgina Tech"
          imageSrc="/images/rayan.jpg"
          isImageLeft={false}  // To align the image on the right side
        />
        <InfoSection
          title="Prinston Rebello"
          description="MS in Computer Science @ Indiana University Bloomington"
          imageSrc="/images/prinston.jpg"
          isImageLeft={true}  // To align the image on the left side
        />
      </div>
    );
}

export default AboutUs;
