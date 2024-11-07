
import { useEffect, useState } from "react";
import './Dashboard.css';
import io from 'socket.io-client';
import { getAPIdata } from "../../API/getAPIdata";
import BarChart from "../../components/Charts/BarChart";
import LineChart from "../../components/Charts/LineChart";
import PieChart from "../../components/Charts/PieChart";
import PointStyleChart from "../../components/Charts/PointStyleChart";

const url = process.env.REACT_APP_URL;

const Dashboard = () => {
    const [tripData, setTripData] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        console.log('socket mounting call', new Date());
        const newSocket = io(url);
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Connected to server');
            newSocket.emit('joinRoom', 'dashboard'); // Join a room
        });

        newSocket.on('dashboardUpdate', (newData) => {
            setTripData(newData);
        });

        newSocket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        getAPIdata(`/data/fetch-data`).then(response => setTripData(response.data.records));


        // Clean up the socket connection on component unmount
        return () => {
            newSocket.emit('leaveRoom', 'dashboard'); // Leave the room
            newSocket.disconnect();
        };
    }, []);

    return (
        <div className="p-10">
            <h1>Taxi Trip Dashboard</h1>
            <div className="dash-main">
                <div className="graphs piechart">
                    <PieChart tripData={tripData} />
                </div>
                <div className="graphs bar">
                    <BarChart tripData={tripData} />
                </div>
                <div className="graphs line">
                    <LineChart tripData={tripData} />
                </div>
                <div className="graphs point">
                    <PointStyleChart tripData={tripData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;