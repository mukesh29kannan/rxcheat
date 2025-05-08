"use client"
import { useEffect, useState } from "react";

export default function EPS() {
  const [distance, setDistance] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch("/api/get-eps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      console.log(data);
      setDistance(data.data);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>Distance</div>
      {distance.map((d, index) => (
        <p key={index}>{d}</p>
      ))}
    </>
  );
}
