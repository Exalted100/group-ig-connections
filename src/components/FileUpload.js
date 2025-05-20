import React, { useState } from 'react';
import InstructionsModal from './InstructionsModal';

function FileUpload({ onProcess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [partialData, setPartialData] = useState({ followers: null, following: null });

  const processFile = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        
        // Get all profile links
        const links = Array.from(doc.querySelectorAll('a[href*="instagram.com"]'))
          .map(link => ({
            label: link.textContent.trim(),
            link: link.href
          }));

        resolve(links);
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const processResults = (followers, following) => {
    const mutuals = followers.filter(follower => 
      following.some(following => following.label === follower.label)
    );

    const fans = followers.filter(follower => 
      !following.some(following => following.label === follower.label)
    );

    const celebs = following.filter(following => 
      !followers.some(follower => follower.label === following.label)
    );

    onProcess({ mutuals, fans, celebs });
  };

  const handleFolderUpload = async (event) => {
    const files = event.target.files;
    if (!files.length) return;

    setIsLoading(true);
    setError(null);

    try {
      let newFollowers = null;
      let newFollowing = null;

      // Process all files in the folder
      for (const file of files) {
        if (file.type === 'text/html') {
          const links = await processFile(file);
          
          if (file.name === 'followers_1.html') {
            newFollowers = links;
          } else if (file.name === 'following.html') {
            newFollowing = links;
          }
        }
      }

      // Update partial data with any new files
      const updatedPartialData = {
        followers: newFollowers || partialData.followers,
        following: newFollowing || partialData.following
      };
      setPartialData(updatedPartialData);

      // Check if we have both files
      if (updatedPartialData.followers && updatedPartialData.following) {
        processResults(updatedPartialData.followers, updatedPartialData.following);
        setPartialData({ followers: null, following: null }); // Reset for next upload
      } else {
        // Prompt for the missing file
        if (!updatedPartialData.followers) {
          setError('Please upload followers_1.html');
        } else if (!updatedPartialData.following) {
          setError('Please upload following.html');
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="file-upload">
      <button 
        className="help-button"
        onClick={() => setShowInstructions(true)}
      >
        How to Get Your Instagram Data
      </button>
      <div className="file-input-container">
        <input
          type="file"
          webkitdirectory="true"
          directory="true"
          multiple
          onChange={handleFolderUpload}
          disabled={isLoading}
          id="file-input"
        />
        <label htmlFor="file-input" className="file-input-label">
          Choose Files
        </label>
      </div>
      {isLoading && <div className="loading">Processing files...</div>}
      {error && <div className="error">{error}</div>}
      {partialData.followers && !partialData.following && (
        <div className="partial-upload">
          ✓ followers_1.html uploaded successfully
        </div>
      )}
      {!partialData.followers && partialData.following && (
        <div className="partial-upload">
          ✓ following.html uploaded successfully
        </div>
      )}
      <InstructionsModal 
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
      />
    </div>
  );
}

export default FileUpload; 