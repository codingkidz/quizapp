import React, { useState } from "react";

import { getUser, getRole } from "services/api";
import { Button, Card, Space } from "antd";



export const Welcome: React.FC = () => {
  const [role, setRole] = useState<string>();
  const user = getUser();
  const languages = ['Scratch', 'Python', 'JavaScript', 'Java'];
  const languageList = languages.map((l) =>
    <p style={{ marginLeft: 660 }}>
      <Button size='middle'>{l}</Button>
    </p>
  );

  if (user) {
    getRole().then((r) => {
      setRole(r);
    });
  }

  return user ? (
    <p style={{marginTop: 80}}>
      <p style={{ textAlign: 'center' }}>Welcome {user.email}!</p>
      {role ? <p style={{ textAlign: 'center' }}>Your role is: {role}</p> : <p>Loading role...</p>}
      <p style={{ textAlign: 'center' }}>Please select a language</p>
      {languageList}
    </p>

  ) : (
      <p>Click above to login!</p>
    );
};
