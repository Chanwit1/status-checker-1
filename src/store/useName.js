import { useState } from "react";

export default function useName() {
  const getName = () => {
    const NameString = localStorage.getItem("name");
    const userName = JSON.parse(NameString);
    return userName;
  };

  const [name, setName] = useState(getName());

  const saveName = (userName) => {
    localStorage.getItem(userName);
    localStorage.setItem("name", JSON.stringify(userName));
    setName(userName);
  };

  return {
    setName: saveName,
    name,
  };
}
