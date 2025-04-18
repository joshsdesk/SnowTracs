import React, { useState } from 'react';
import '../styles/userprofileimage.css'; // Ensure you have the correct path for your CSS

const presetImages = [
  'profile1.png',
  'profile2.png',
  'profile3.png',
  'profile4.png',
  'profile5.png',
  'profile6.png',
  'profile7.png',
  'profile8.png',
  'profile9.png',
];

const UserProfileImage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handlePresetSelect = (imageName: string) => {
    setSelectedImage(`/assets/images/profileIMGs/${imageName}`);
    setUploadedImage(null);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setSelectedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const imageSrc = uploadedImage || selectedImage || '/assets/images/profileIMGs/default.png';

  return (
    <div className="profile-image-selector">
      <h3>Select Your Profile Image</h3>

      <div className="current-image">
        <img src={imageSrc} alt="Current Profile" />
      </div>

      <div className="preset-gallery">
        {presetImages.map((img) => (
          <img
            key={img}
            src={`/assets/images/profileIMGs/${img}`}
            alt={img}
            onClick={() => handlePresetSelect(img)}
            className={selectedImage?.includes(img) ? 'selected' : ''}
          />
        ))}
      </div>

      <div className="upload-section">
        <label htmlFor="upload">Or upload your own:</label>
        <input type="file" id="upload" accept="image/*" onChange={handleUpload} />
      </div>
    </div>
  );
};

export default UserProfileImage;
