export const nameJoiner = <T extends { firstName: string; lastName: string }>(
  obj: T,
) => {
  const name = `${obj.firstName || ""} ${obj.lastName || ""}`.trim();
  return name;
};
