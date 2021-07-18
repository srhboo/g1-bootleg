import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "./index";

export const ChooseTest = () => {
  const [tests, setTests] = useState([]);
  useEffect(() => {
    db.collection("tests")
      .get()
      .then((querySnapshot) => {
        const allTests = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          allTests.push({ ...doc.data(), id: doc.id });
        });
        setTests(allTests);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, [tests]);
  return (
    <div className="choose-test-container">
      <h1 className="boo-title">boo's bootleg g1 practice</h1>
      <ul>
        {tests.map((test) => (
          <li id={test.id}>
            <Link to={`/test/${test.id}`}>{test.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
