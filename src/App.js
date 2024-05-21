import './App.css';
import {useEffect, useState} from "react";
import {Form, Card, Container, InputGroup} from "react-bootstrap";

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('Toronto');

    useEffect(() => {
        fetchWeatherData();
    }, [city]);

    const fetchWeatherData = async () => {

        const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'c19deb7c3fmshd663226d72587d9p146504jsn3428b82c941d',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };

        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                setWeatherData(data.current);
            })
            .catch(err => {
                console.error(err);
            });
    };

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    return (
        <Container className="mt-5">
            <Container className="m-2 d-flex justify-content-center">
                <InputGroup className="mb-3" style={{maxWidth: '400px'}}>
                    <InputGroup.Text id="basic-addon1">Current Weather In</InputGroup.Text>
                    <Form.Select aria-label="City Select" onChange={handleCityChange}>
                        <option value="Toronto">Toronto</option>
                        <option value="New York">New York</option>
                        <option value="London">London</option>
                        <option value="Tokyo">Tokyo</option>
                        <option value="Manila">Manila</option>
                    </Form.Select>
                </InputGroup>
            </Container>

            {weatherData &&
                <Container className="d-flex flex-column flex-lg-row gap-2 m-2">
                    {[
                        {name: 'Temperature', value: weatherData?.temp_c.toFixed(0), unit: '°C'},
                        {name: 'Feels Like', value: weatherData?.feelslike_c.toFixed(0), unit: '°C'},
                        {name: 'Humidity', value: weatherData?.humidity.toFixed(0), unit: '%'},
                        {name: 'Condition', value: weatherData?.condition.text, unit: ''},
                    ].map((property, index) => (
                        <Card key={index} className="mx-auto bg-dark bg-opacity-75 text-white" style={{width: '20rem'}}>
                            <Card.Body>
                                <Card.Title className="text-center">{property.name}</Card.Title>
                                <Card.Text className="text-center">
                                    <span>{property.value}{property.unit}</span>
                                    {property.name === 'Condition' && <img src={weatherData.condition.icon} alt="Weather condition icon"/>}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </Container>
            }
        </Container>
    );
}

export default App;
