import React from 'react';

const HomePage = (props) => {
  const { mode } = props;

  return (
    <div className={`text-${mode === 'dark' ? 'white' : 'dark'}`} style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Welcome to NewsMonkey</h1>
      <p>This is the homepage of your NewsMonkey application.</p>
      <p>You can read any content you want here.</p>
    </div>
  );
};

export default HomePage;
