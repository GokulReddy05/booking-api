
const url = "http://localhost:5000/api/bookings";

const booking1 = {
  userId: 1,
  roomId: 4,
  startTime: "2027-01-15T10:00:00.000Z",
  endTime: "2027-01-15T11:00:00.000Z"
};

const booking2 = {
  userId: 2,
  roomId: 4,
  startTime: "2027-01-15T10:30:00.000Z",
  endTime: "2027-01-15T11:30:00.000Z"
};

const sendRequest = async (booking) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(booking)
  });

  const data = await response.json();

  return {
    status: response.status,
    data
  };
};

const results = await Promise.all([
  sendRequest(booking1),
  sendRequest(booking2)
]);

console.log(results);
