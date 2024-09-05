import React from "react";
import Card from './Card';

const Feed = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold text-violet-900 mb-6">Welcome to the Feed!</h1>
      <p className="text-lg mb-6">This is where your feed content will go.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Display multiple cards with different color schemes */}
        <Card scheme="primary" />
        <Card scheme="danger" />
        <Card scheme="success" />
        <Card scheme="info" />
        <Card scheme="warning" />
        <Card scheme="dark" />
      
      </div>
    </div>
  );
};

export default Feed;
