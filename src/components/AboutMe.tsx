import Card from "react-bootstrap/Card";
import React, { useState, useEffect, ChangeEvent } from "react";
import { apiClient } from "../utils/apiClient";
import EditIcon from "@mui/icons-material/Edit";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { string } from "zod";

interface AboutMeProps {
  userId: string; // Explicitly typing userId as string
}

const AboutMe: React.FC<AboutMeProps> = ({ userId }) => {
  const defaultUserProfile = {
    Name: "",
    email: "",
    profilePhoto: "avater1.jpg",
    aboutMe: "I'm a passionate traveler!",
  };

  const [userProfile, setUserProfile] = useState(defaultUserProfile);
  const [showEditModal, setShowEditModal] = useState(false);
  const [tempUserProfile, setTempUserProfile] = useState(defaultUserProfile);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    // Fetch user profile data based on userId when component mounts
    fetchUserProfile(userId);
  }, [userId]);

  const fetchUserProfile = async (userId: string) => {
    try {
      const response = await apiClient.get(`/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.status === 200) {
        const { Name, email, profilePhoto, aboutMe } =
          response.data.userProfile;

        // Check if fetched data is empty, if not, update state
        setUserProfile((prevState) => ({
          ...prevState,
          Name: Name || prevState.Name,
          email: email || prevState.email,
          profilePhoto: profilePhoto || prevState.profilePhoto,
          aboutMe: aboutMe || prevState.aboutMe,
        }));

        // Set tempUserProfile with the updated userProfile
        setTempUserProfile((prevState) => ({
          ...prevState,
          Name: Name || prevState.Name,
          profilePhoto: profilePhoto || prevState.profilePhoto,
          aboutMe: aboutMe || prevState.aboutMe,
        }));
      } else {
        console.error("Failed to fetch user profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleSubmit = async () => {
    try {
      // Upload the selected profile photo
      const formData = new FormData();
      if (selectedFile) {
        console.log(selectedFile);
        formData.append("file", selectedFile);
      }
      //console.log(selectedFile);
      const uploadResponse = await apiClient.post("/file", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      // If upload is successful, update the user profile with the returned URL
      if (uploadResponse.status === 200) {
        const photoUrl = uploadResponse.data.url;

        const response = await apiClient.patch(
          `/user/${userId}`,
          {
            name: tempUserProfile.Name,
            profilePhoto: photoUrl,
            aboutMe: tempUserProfile.aboutMe,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("Profile updated successfully");
          setUserProfile({ ...tempUserProfile, profilePhoto: photoUrl }); // Update user profile with changes from tempUserProfile
          handleCloseEditModal(); // Close the edit modal after successful update
        } else {
          console.error("Failed to update profile:", response.statusText);
        }
      } else {
        console.error(
          "Failed to upload profile photo:",
          uploadResponse.statusText
        );
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTempUserProfile({ ...tempUserProfile, [e.target.id]: e.target.value });
  };

  const imageSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]); // Set only the file name
      console.log(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  return (
    <Card
      style={{
        width: "440px",
        height: "590px",
        fontFamily: "Urbanist, sans-serif",
      }}
    >
      <Card.Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h5 style={{ fontWeight: "bold" }}>About Me</h5>
        <Button onClick={handleEditProfile} variant="light">
          <EditIcon />
        </Button>
      </Card.Header>
      <Card.Body>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={userProfile.profilePhoto}
            alt="Profile"
            style={{ width: "360px", height: "280px", alignItems: "center" }}
          />
        </div>
        <h6 style={{ fontWeight: "bold" }}>{userProfile.Name}</h6>
        <p style={{ fontWeight: 500 }}>{userProfile.email}</p>
        <p>{userProfile.aboutMe}</p>
      </Card.Body>
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="Name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={tempUserProfile.Name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="profilePhoto">
              <Form.Label>Profile Photo</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={imageSelected}
              />
            </Form.Group>
            <Form.Group controlId="aboutMe">
              <Form.Label>About Me</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={tempUserProfile.aboutMe}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default AboutMe;
