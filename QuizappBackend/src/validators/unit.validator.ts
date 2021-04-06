import { Topic, Unit } from "@prisma/client";
import { db } from "../prisma";

const isValidUnitID = async (unitId: Unit["id"]) => {
  const unit = await db.unit.findUnique({ where: { id: Number(unitId) } });
  if (!unit) {
    throw new Error("Unit does not exist");
  }

  return true;
};

const isValidTopicID = async (topicId: Topic["id"]) => {
  const topic = await db.topic.findUnique({
    where: { id: Number(topicId) },
  });

  if (!topic) {
    throw new Error("Topic does not exist");
  }

  return true;
};

export default { isValidUnitID, isValidTopicID };