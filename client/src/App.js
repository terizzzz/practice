import React, { useState, useEffect } from 'react';

const App = () => {
  const [videos, setVideos] = useState([]);
  const [file, setFile] = useState(null);

  // Fetch the list of videos
  useEffect(() => {
    fetch('/videos')
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);

  // Handle file upload
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('video', file);

    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        alert('Video uploaded successfully');
        setVideos([...videos, { filename: data.filename }]); // Update video list
      });
  };

  return (
    <div>
      <h1>Upload and Play Videos</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      
      <h2>Video List</h2>
      {videos.map((video, index) => (
        <div key={index}>
          <video width="400" controls>
            <source src={`uploads/${video.filename}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </div>
  );
};

export default App;
