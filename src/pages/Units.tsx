import React, { useEffect, useState } from "react";
import { Unit } from "models/Unit";
import { Link } from "react-router-dom";

import { fetchUnits, getUser, getRole } from "services/api";

import { FaPencilAlt } from "react-icons/fa";
import { Form, Button, Modal, Collapse, Input } from "antd";
import { Store } from "antd/lib/form/interface";
import { pushCollection } from "../services/api";


export const Units: React.FC = () => {
  const [units, setUnits] = useState<Unit[]>();
  const [role, setRole] = useState<string>();
  const user = getUser();
  const { Panel } = Collapse;

  const text = 'Add Unit';



  if (user) {
    getRole().then((r) => {
      setRole(r);
    });
  }

  useEffect(() => {
    fetchUnits().then((units) => {
      setUnits(units);
    });
  }, []);

  const handlePushCollection = (values: Store) => {
    console.log("push collection hit")

    const newUnit: Unit = {
      id: values.unitid,
      unit_number: values.unitnumber,
      // topic is what is displayed on the list of units not id
      topic: values.topic
      
    }

    pushCollection(newUnit);
    window.location.reload();
  }

  return units ? (
    <ul>
      <Collapse accordion>
        <Panel header="Add new Unit" key="1">
          <Form name="addunit" onFinish={handlePushCollection}>
          <Form.Item name="unitid" label="unitid">
              <Input />
            </Form.Item>
            <Form.Item name="unitnumber" label="unitnumber">
              <Input />
            </Form.Item>
            <Form.Item name="topic" label="topic">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Unit
              </Button>
            </Form.Item>
          </Form>
        </Panel>
      </Collapse >


      {
        units.map((unit) => {
          return (
            <li>
              <Link to={{ pathname: `/quiz/${unit.id}` }}>{unit.topic}</Link>

              {role === "teacher" ? (
                <Link to={{ pathname: `/upload/${unit.id}` }}>
                  <FaPencilAlt />
                </Link>
              ) : null}
            </li>
          );
        })
      }
    </ul >
  ) : (
      <p>Loading Units...</p>
    );
};
