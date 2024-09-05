import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from '../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';

const LogoutButton = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        try {
          const userDoc = doc(db, 'users', auth.currentUser.uid);
          const userSnap = await getDoc(userDoc);
          if (userSnap.exists()) {
            setUserData(userSnap.data());
          } else {
            console.error('No such document!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="relative flex items-center">
      {loading ? (
        <span>Loading user data...</span>
      ) : (
        <>
          {userData && (
            <div className="profile-info flex items-center">
              <FaUserCircle className="text-2xl text-gray-600 mr-2" />
              <div className="user-details">
                <p className="text-sm font-medium">{userData.displayName}</p>
                <p className="text-xs text-gray-500">{userData.email}</p>
              </div>
            </div>
          )}
          <button onClick={handleLogout} className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-900">
            <AiOutlineLogout size={24} />
          </button>
        </>
      )}
    </div>
  );
};

export default LogoutButton;
