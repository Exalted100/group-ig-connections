import React from 'react';

function InstructionsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>How to Get Your Instagram Data</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="instructions-section">
            <h3>Step 1: Request Your Data</h3>
            <ol>
              <li>Visit <a href="https://accountscenter.instagram.com/info_and_permissions/" target="_blank" rel="noopener noreferrer">Instagram's Account Center</a></li>
              <li>Click on "Download your information"</li>
              <li>Select "Download only some of your information"</li>
              <li>In the "Connections" section, select: Followers and Following</li>
              <li>Click "Submit request"</li>
            </ol>
          </div>

          <div className="instructions-section">
            <h3>Step 2: Download and Prepare Your Data</h3>
            <ol>
              <li>Wait for Instagram to prepare your data (this may take up to 48 hours)</li>
              <li>Download the zip file when it's ready</li>
              <li>Unzip the downloaded file</li>
            </ol>
          </div>

          <div className="instructions-section">
            <h3>Step 3: Upload Your Data</h3>
            <ol>
              <li>Click the upload button below</li>
              <li>Select the folder containing your unzipped Instagram data</li>
              <li>Wait for the processing to complete</li>
            </ol>
          </div>

          <div className="privacy-notice">
            <h3>Privacy Notice</h3>
            <p>
              <strong>Important:</strong> All processing happens entirely within your browser. 
              Your data is never uploaded to any server or stored anywhere. 
              The application runs locally on your device and your Instagram data never leaves your computer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructionsModal; 