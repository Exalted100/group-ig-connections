import React, { useState } from 'react';
import InstructionsModal from './InstructionsModal';

function FileUpload({ onProcess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);

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

  const handleFolderUpload = async (event) => {
    const files = event.target.files;
    if (!files.length) return;

    setIsLoading(true);
    setError(null);

    try {
      let followers = [];
      let following = [];

      // Process all files in the folder
      for (const file of files) {
        if (file.type === 'text/html') {
          const links = await processFile(file);
          
          if (file.name === 'followers_1.html') {
            followers = links;
          } else if (file.name === 'following.html') {
            following = links;
          }
        }
      }

      if (!followers.length || !following.length) {
        throw new Error('Could not find both followers_1.html and following.html files in the folder');
      }

      // Process the results
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
      <input
        type="file"
        webkitdirectory="true"
        directory="true"
        onChange={handleFolderUpload}
        disabled={isLoading}
      />
      {isLoading && <div className="loading">Processing files...</div>}
      {error && <div className="error">{error}</div>}
      <InstructionsModal 
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
      />
    </div>
  );
}

export default FileUpload; 