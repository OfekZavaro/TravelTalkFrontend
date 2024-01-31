// LocationButtons.tsx
import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

interface LocationButtonsProps {
  onLocationSelect: (location: string) => void;
}

const LocationButtons = ({ onLocationSelect }: LocationButtonsProps) => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const handleButtonClick = (location: string) => {
    setSelectedLocation(location);
    onLocationSelect(location);
  };

  const buttonStyle = {
    border: '1px solid black',
    borderRadius: '0', 
    color: 'black',
    backgroundColor: 'white',
    margin: '0', 
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#0336FF', 
    color: 'white',
  };

  return (
    <Container fluid className="my-4">
      <Row className="gx-0 justify-content-center">
        {['South America', 'North America', 'Europe', 'Africa', 'Asia'].map((location) => (
          <Col key={location} xs={2} className="px-0">
            <Button
              style={selectedLocation === location ? activeButtonStyle : buttonStyle}
              onClick={() => handleButtonClick(location)}
              className="w-100"
            >
              {location}
            </Button>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default LocationButtons;
